//处理后台的逻辑
//后台技术:node(express)+mongon(mongoose)

const express = require('express');

//导入插件:用于对用户的密码进行加密
const utils = require('utility');

//处理post请求的插件
const bodyParser = require('body-parser');
//解析cookie的插件
const cookieParser = require('cookie-parser');
const userRouter = require('./user');

const app = express();
//使用app.use让程序可以解析cookie
app.use(cookieParser());
//可以解析post请求过来的json数据
app.use(bodyParser.json());

//app.use就是使用中间件,在这里/user就是路由的中间件,后面的路由形式都是/user/xx的
app.use('/user',userRouter);

app.listen(9090,()=>{
    console.log("9090端口正在被监听!");
});