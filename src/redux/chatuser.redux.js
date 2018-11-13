//导入处理类似ajax请求的axios
import axios from 'axios';


//我们使用redux来管理牛人列表
const USER_LIST = 'USER_LIST';



//初始化state
const initState = {
    userlist:[]
}

//新建一个reducer
export function chatuser(state=initState,action){
    switch(action.type){
        case USER_LIST:
            // console.log(action)
            return {...state,userlist:action.payload}
        default:
            return state;
    }
}


function userlist(data){
    // console.log(data);
    return {type:USER_LIST,payload:data}
}


export function getUserList(type){
    return dispatch=>{
        axios.get('/user/list?type='+type)
            .then(res=>{
                if(res.data.code==0){
                    // console.log(res.data.code);
                    dispatch(userlist(res.data.data));
                }
            });
    }
}