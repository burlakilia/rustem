var async = require('async'),
    domain = require('domain').create(),
    jsonquery = require('./libs/query'),
    corpus = require('./dist/corpus.json'),
    symbols = require('./src/symbols.json'),
    natural = require('natural');

function tagging(stem) {

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
            return jsonquery('$..[?text="'+ s.toLowerCase() +'"]', corpus)[0];
        }

    ];

    return function(done) {
        var ret;

        for(var i = 0; i < tests.length; i++) {
            ret = tests[i](stem);

            if(ret) {
                done(null, ret);
                console.log(ret);
                return;
            }

        }

        done(null, { ana: { lex:stem, gr:'?' }, text: stem});
    };

}

function parse(text) {
    return natural.PorterStemmerRu.tokenizeAndStem(text.toLowerCase());

}

exports.recognize = function(words, done) {
    return async.parallel(parse(words).map(tagging), done);
};
