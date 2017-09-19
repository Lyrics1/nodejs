var express = require('express');
var router = express.Router();
// express.Router类，则可以帮助我们更好的组织代码结构。在app.js文件中，
// 定义了app.use(‘/’, routes); routes是指向了routes目录下的index.js文件
// ，./routes/index.js文件中，express.Router被定义使用，路径/*处理都会由
// routes/index.js文件里的Router来处理。如果我们要管理不同的路径，
// 那么可以直接配置为多个不同的Router。


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;