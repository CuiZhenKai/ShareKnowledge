//导入用于实现类似ajax请求的插件
import axios from 'axios'
//导入前台发起连接的插件
import io from 'socket.io-client';
//实现前后端的联调
//这里我们需要手动连接一下后台的9090端口
//因为我们这里涉及到了跨域的问题
//解释:
//ws:websocket
const socket =  io('ws://localhost:9090');

//我们在这里创建redux中可能用到的action
//获取聊天的列表
const MSG_LIST = 'MSG_LIST';
//读取信息
const MSG_RECV = 'MSG_RECV';
//标识已读
const MSG_READ = 'MSG_READ';

//设置初始的状态
const initState = {
    chatmsg:[],
    users:{},
    unread:0
}

//设置一个reducer
export function chat(state=initState,action){
    switch(action.type){
        case MSG_LIST:
            return {...state,users:action.payload.users,chatmsg:action.payload.msg,unread:action.payload.msgs.filter(v=>!v.read).length}
        case MSG_RECV:
            return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+1}
        // case MSG_READ:
        default:
            return state;
    }
}

export function msgList(msgs,users){
    return {type:MSG_LIST,payload:{msgs,users}}
}

export function sendMsg({from,to,msg}){
    return dispatch=>{
        //我们在这里将信息发送给后端
        socket.emit('sendmsg',{from,to,msg});
    }
}

export function msgRecv(msg){
    return {type:MSG_RECV,payload:msg}
}
export function recvMsg(){
    return dispatch=>{
        //监听全局事件
        socket.on('recvmsg',(data)=>{
            // console.log(data);
            dispatch(msgRecv(data));
        })
    }
}

//首次进入页面获取列表
export function getMsgList(){
    return dispatch=>{
        axios.get('/user/getmsglist').then(res=>{
            if(res.status==200&&res.data.code==0){
                dispatch(msgList(res.data.msgs,res.data.users));
            }
        })
    }
}
