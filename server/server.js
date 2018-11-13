//处理后台的逻辑
//后台技术:node(express)+mongon(mongoose)

const express = require('express');

//导入插件:用于对用户的密码进行加密
const utils = require('utility');

const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat');
//处理post请求的插件
const bodyParser = require('body-parser');
//解析cookie的插件
const cookieParser = require('cookie-parser');
const userRouter = require('./user');
const app = express();


//如果想要socket和express相互的关联使用,需要下面这样写
const server = require('http').Server(app);
const io = require('socket.io')(server);

//io的代码
//如果用户已经有连接之后
io.on('connection',(socket)=>{
    // console.log('user login');
    //我们在后端监听前台发送过来的数据
    socket.on('sendmsg',(data)=>{
        // console.log(data);
        //我们使用io来发送一个全局的事件,广播到全局,显示到页面上去
        // 
        const {from,to,msg} = data;
        const chatid = [from,to].sort().join('_');
        Chat.create({chatid,from,to,content:msg},(err,doc)=>{
            io.emit('recvmsg',Object.assign({},doc));
        });
    })
});


//使用app.use让程序可以解析cookie
app.use(cookieParser());
//可以解析post请求过来的json数据
app.use(bodyParser.json());

//app.use就是使用中间件,在这里/user就是路由的中间件,后面的路由形式都是/user/xx的
app.use('/user',userRouter);

server.listen(9090,()=>{
    console.log("9090端口正在被监听!");
});