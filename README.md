# Overview
Simple Russian Pos-Tagging utility.

# Install
You need download Russain Corpus from [Russian National Corpus](http://www.ruscorpora.ru).
If you have corpus, create folder <b>data</b> and copy the file.

```javascript
    git clone http://github.com/burlakilia/rustem
    npm install
```

# Example
```javascript
    var rustem = require('rustem');
    rustem.recognize('привет текстовый парсер', function(err, stemms) {

        if (err) {
            throw err;
        }

        console.log(stemms);
    });
```

