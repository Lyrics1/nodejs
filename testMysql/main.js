var express = require('express');

var app = express();

var path = require('path');

app.use(express.static(path.join(__dirname,'view')));


app.listen(3000)