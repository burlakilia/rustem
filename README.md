# Overview
Simple Russian Pos-Tagging utility.

# Install
You need download Russain Corpus from [Russian National Corpus](http://www.ruscorpora.ru).
If you have corpus, create folder <b>data</b> and copy the file.

<code>
    <p>git clone http://github.com/burlakilia/rustem</p>
    <p>npm install</p>
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

