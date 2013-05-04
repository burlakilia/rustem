var async = require('async'),
	domain = require('domain').create(),
	jsonquery = require('./query'),
    corpus = require('../data/corpus').corpus,
	symbols = require('../data/symbols'),
    natural = require('natural');

function tagging(stem) {
	
	var tests = [
	
		function (s){
			return /^[0-9]*$/.test(s) ? { ana: { lex:s, gr:'NUM' }, text: s} : null;
		},
				
		function (s) {
			
			for(var key in symbols) {
				if(key === s) {
					return symbols[key];
				}
				
			}
			
		},
		
		function (s) {
			return jsonquery('$.se..[?text="'+ s.toLowerCase() +'"]', corpus)[0];
		}
		
	];

	return function(done) {
		var ret; 
		
		for(var i = 0; i < tests.length; i++) {
			ret = tests[i](stem);
			
			if(ret) {
				done(null, ret);
				return;
			}
				
		}
		
		done(null, { ana: { lex:stem, gr:'?' }, text: stem});
	};

}


module.exports = function(stemms, done) {
	return async.parallel(stemms.map(tagging), done);
}

function createPattern(template) {
	return template;
}
