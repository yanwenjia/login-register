var express = require('express');
var router = express.Router();
var db=require('../libs/db.js');
var flash = require('connect-flash');

var ss=express();
ss.use(flash())

/* GET home page. */
// 调用 ejs 模板引擎，来渲染 index.ejs 模版文件（即将 title 变量全部替换为字符串Express），生成静态页面并显示在浏览器中。
router.get('/', function(req, res, next) {
  res.render('index', { title: '主页' });
});
router.get('/reg', function(req, res, next) {
  res.render('reg', { title: '注册' });
});
router.post('/reg', function(req, res, next) {
   var connection=db.con();
   var name=req.body.name;
   var psd=req.body.password;
   var repsd=req.body["password-repeat"];
   var email=req.body.email;
   if(name!=""&&psd!=""&&email!=""){
       if(psd!=repsd){
       	  // res.send("俩次密码不一样");
       	  res.render('reg-result', { title: '注册反馈',msg:"俩次密码不一样！",flag:false});
       }else{
       	  db.add(connection,name,psd,email);
       	  res.render('reg-result', { title: '注册反馈',msg:"恭喜您注册成功！",flag:true});
       }
   }else{
      res.render('reg-result', { title: '注册反馈',msg:"输入不能为空",flag:false});
   }
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: '登录' });
});
router.post('/login', function(req, res, next) {
   var connection=db.con();
   var name=req.body.name;
   var psd=req.body.password;
    connection.query('select * from reg where name=?',[name] ,function(err,result){
        // console.log(result)
        for(var i=0;i<result.length;i++){
            if(result[i].psd==psd){
                //密码 正确
                res.render('login-result',{title:"登录反馈",msg:"恭喜您登录成功！",flag:true})
            }
        }
    //    密码错误
        res.render('login-result',{title:"登录反馈",msg:"帐号或密码错误！",flag:false})
    });
});
router.get('/post', function(req, res, next) {
  res.render('post', { title: '发表' });
});

module.exports = router;





// module.exports = function(app) {
//   app.get('/', function (req, res) {
//     res.render('index', { title: '主页' });
//   });
//   app.get('/reg', function (req, res) {
//     res.render('reg', { title: '注册' });
//   });
//   // app.post('/reg', function (req, res) {
//   // });
//   app.get('/login', function (req, res) {
//     res.render('login', { title: '登录' });
//   });
//   // app.post('/login', function (req, res) {
//   // });
//   app.get('/post', function (req, res) {
//     res.render('post', { title: '发表' });
//   });
//   // app.post('/post', function (req, res) {
//   // });
//   app.get('/logout', function (req, res) {
//   });
// };