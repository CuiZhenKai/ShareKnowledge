//我们将关于数据,关于数据库的操作全部放到model.js中,因为我们认为这是一个模型
const mongoose = require('mongoose');

//链接mongo数据库,并且使用immoc这个集合
const DB_URL = 'mongodb://localhost:27017/imooc-chat';
mongoose.connect(DB_URL);

//我们定义一个模型组
const models = {
    //用户表
    user:{
        'user':{type:String,require:true},
        'pwd':{type:String,require:true},
        'type':{type:String,require:true},
        //头像
        'avatar':{type:String},
        //个人或者职位的简介
        'desc':{type:String},
        //想找的工作
        'title':{type:String},
        //如果是boss,还有两个字段
        //公司名
        'company':{type:String},
        //薪资
        'money':{type:String}
    },
    //聊天表
    chat:{
    }
}

//批量生成
for(let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]));
}

module.exports = {
    getModel:function (name){
        return mongoose.model(name);
    }
}