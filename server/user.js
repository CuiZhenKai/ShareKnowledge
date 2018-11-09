//路由的中间件的处理
//  '/user/xxx/
const express = require('express');

//导入插件:用于对用户的密码进行加密
const utils = require('utility');

const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');

//公共的过滤器,让查询的时候过滤掉密码
const _filter = {'pwd':0,'__v':0};

Router.get('/list',(req,res)=>{
    //获取地址栏中后面?带的参数
    const {type} = req.query;
    //清除所有的测试数据
    // User.remove({},(err,doc)=>{});
    User.find({type},(err,doc)=>{
        return res.json({code:0,data:doc});
    })
});
//处理boss提交的招聘职位的信息
Router.post('/update',(req,res)=>{
    //获取用户的cookie
    const userid = req.cookies.userid;
    //如果没有查找到cookie,直接返回错误信息
    if(!userid){
        return res.json({code:1});
    }
    const body = req.body;
    User.findByIdAndUpdate(userid,body,(err,doc)=>{
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body);
        return res.json({code:0,data});
    });
});
//处理用户的登录业务
Router.post('/login',(req,res)=>{
    const {user,pwd} = req.body;
    User.findOne({user,pwd:Md5Pwd(pwd)},_filter,(err,doc)=>{
        if(!doc){
            return res.json({code:1,'msg':'用户名或者密码错误'});
        }
        //登录成功之后我们将用户的信息保存到cookie
        //测试
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
        const userModel = new User({user,type,pwd:Md5Pwd(pwd)});
        userModel.save((err,doc)=>{
            if(err){
                return res.json({code:1,'msg':'后端出错了'});
            }
            const {user,type,_id} = doc;
            res.cookie('userid',_id);
            return res.json({code:0,data:{user,type,_id}});
        })
    });
});
Router.get('/info',(req,res)=>{
    //获取用户的cookie
    const {userid} = req.cookies;
    //如果本机用户此前并没有登录过
    //我们让其自动跳转到登录页面
    if(!userid){
        //在这里进行用户校验
        return res.json({code:1});
    }
    //我们根据cookie中存入的用户id,在数据库中找到然后自动登录
    User.findOne({_id:userid},_filter,(err,doc)=>{
        if(err){
            return res.json({code:1,'msg':'后端出错了'});
        }
        if(doc){
            return res.json({code:0,data:doc});
        }
    });
});


function Md5Pwd(pwd){
    const salt = 'thunder_championship';
    return utils.md5(utils.md5(pwd+salt));
}

module.exports = Router;