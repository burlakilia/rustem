# Overview
Simple Russian Pos-Tagging utility.

# Install
You need download Russain Corpus from site [1]: www.ruscorpora.ru   "Russian National Corpus".
If you have corpus, create folder <b>data</b> and copy the file.

<code>
    git clone http://github.com/burlakilia/rustem
    npm install
<code>

# Example
<code>
    var rustem = require('rustem');

    rustem.recognize('привет текстовый парсер', function(err, stemms) {

        if (err) {
            throw err;
        }

        console.log(stemms);
    });

</code>

