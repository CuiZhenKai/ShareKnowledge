//路由的中间件的处理
//  '/user/xxx/
const express = require('express');

//导入插件:用于对用户的密码进行加密
const utils = require('utility');

const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');

Router.get('/list',(req,res)=>{
    //清除所有的测试数据
    // User.remove({},(err,doc)=>{});
    User.find({},(err,doc)=>{
        return res.json(doc);
    })
});
//处理用户的登录业务
Router.post('/login',(req,res)=>{
    const {user,pwd} = req.body;
    User.findOne({user,pwd:Md5Pwd(pwd)},{'pwd':0},(err,doc)=>{
        if(!doc){
            return res.json({code:1,'msg':'用户名或者密码错误'});
        }
        //登录成功之后我们将用户的信息保存到cookie
        res.cookie('userid',doc._id);
        return res.json({code:0,data:doc});
    });
});
Router.post('/register',(req,res)=>{
    // console.log(req.body);
    const {user,pwd,type} = req.body;
    User.findOne({user},(err,doc)=>{
        if(doc){
            return res.json({code:1,'msg':'用户名重复'});
        }
        User.create({user,type,pwd:Md5Pwd(pwd)},(err,doc)=>{
            if(err){
                return res.json({code:1,'msg':'后端出错了'});
            }
            return res.json({code:0});
        })
    });
});
Router.get('/info',(req,res)=>{
    //在这里进行用户校验
    return res.json({code:1});
});


function Md5Pwd(pwd){
    const salt = 'thunder_championship';
    return utils.md5(utils.md5(pwd+salt));
}

module.exports = Router;