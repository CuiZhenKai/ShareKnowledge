//config.js:用来处理和实现数据加载的loading效果
//导入axios,axios主要是用来处理ajax的请求的
import axios from 'axios'

//导入loading原处:antD：按需加载
import {Toast} from 'antd-mobile'

//拦截请求
//注意:config这个参数必须要有,并在拦截函数的最后设法将其返回
axios.interceptors.request.use(config=>{
    Toast.loading("加载中");
    return config;
});

//拦截相应
axios.interceptors.response.use(config=>{
    Toast.hide();
    return config;
});