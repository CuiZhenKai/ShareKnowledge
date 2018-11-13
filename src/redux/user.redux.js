import axios from "axios";
import {getRedirectPath} from '../utils'
//定义一些判断注册的常量
// const REGISTER_SUCCSESS = 'REGISTER_SUCCSESS';
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
//AUTH_SUCCESS是合并登录和成功行为的
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const LOAD_DATA = 'LOAD_DATA';
const ERROR_MSG = 'ERROR_MSG';
const LOGOUT = 'LOGOUT';

const initState = {
    redirectTo:'',
    msg:'',
    user:'',
    type:''
}

//新建一个reducer
export function user(state=initState,action){
    switch(action.type){
        case AUTH_SUCCESS:
            return {...state,msg:'',redirectTo:getRedirectPath(action.payload,action.payload.avatar),...action.payload}
        case LOAD_DATA:
            return {...state,...action.payload};
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg}
        case LOGOUT:
            return {...initState,redirectTo:'/login'}
        default:
            return state;
    }
}
function authSuccess(data){
    return {type:AUTH_SUCCESS,payload:data};
}
function errorMsg(msg){
    return {msg,type:ERROR_MSG};
}

export function loadData(userinfo){
    return {type:LOAD_DATA,payload:userinfo}
}


export function logoutSubmit(){
    return {type:LOGOUT}
}

export function login({user,pwd}){
    if(!user || !pwd){
        return errorMsg('用户名密码必须输入');
    }
    //校验完成
    return dispatch=>{
        axios.post('/user/login',{user,pwd}).then(res=>{
            if(res.status==200&&res.data.code===0){
                dispatch(authSuccess(res.data.data));
            }else{
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
}

export function update(data){
    return dispatch=>{
        axios.post('/user/update',data).then(res=>{
            if(res.status==200&&res.data.code===0){
                dispatch(authSuccess(res.data.data));
            }else{
                dispatch(errorMsg(res.data.msg));
            }
        });
    }
}

export function register({user,pwd,repeatpwd,type}){
    if(!user||!pwd||!type){
        return errorMsg('用户名密码必须输入');
    }
    if(pwd!==repeatpwd){
        return errorMsg('两次密码必须一致');
    }
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type}).then(res=>{
            if(res.status==200&&res.data.code===0){
                dispatch(authSuccess({user,pwd,type}));
            }else{
                dispatch(errorMsg(res.data.msg));
            }
        });
    }
    
}