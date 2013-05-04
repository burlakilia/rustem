var async = require('async'),
    domain = require('domain').create(),
    jsonquery = require('./libs/query'),
    corpus = require('./dist/corpus.json'),
    symbols = require('./src/symbols.json'),
    natural = require('natural'),
    length,
    unrecognized;

function tagging(stem, done) {
     var evaluator = jsonquery('$..[?text=$1][0:1]');

    var tests = [

        function (s){
            return isNaN(parseInt(s)) ? null : { ana: { lex: s, gr:'NUM' }, text: s};
        },

        function (s) {

            for(var key in symbols) {
                if(key === s) {
                    return symbols[key];
                }

            }

        },

        function (s) {
            return evaluator(corpus, s.toLowerCase())[0];
        }

    ];

    return function(done) {
        var ret;

        console.log('Left: ', length--);

        for(var i = 0; i < tests.length; i++) {
            ret = tests[i](stem);

            if(ret) {
                done(null, ret);
                return;
            }

        }

        unrecognized++;
        done(null, { ana: { lex:stem, gr:'?' }, text: stem});
    };

}

function parse(text) {
    return natural.PorterStemmerRu.tokenizeAndStem(text.toLowerCase());

}

exports.recognize = function(words, done) {
    var stemms = parse(words),
        start = new Date();

    length = stemms.length;
    unrecognized = 0;

    console.log('Recognize start: ', length);

    async.parallel(stemms.map(tagging), function(err, res) {

        console.log('Runtime: ', new Date() - start);
        console.log('Unrecognized count: ', unrecognized);

        done(err, res);
    });
};
