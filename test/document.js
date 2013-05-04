var fs = require('fs'),
	main = require('../main');

exports['pos tagging should find all taggs'] = function(test){
	
	fs.readFile('./test/data/document', function (err, buf) {
		
		if (err) { 
			throw err;
		}

		main.recognize(buf.toString('utf8', 0, buf.length), function(err, res){

            if (err) {
                throw err;
            }

            console.log(res[res.length-1]);
            test.done();
        });
	});
	
};