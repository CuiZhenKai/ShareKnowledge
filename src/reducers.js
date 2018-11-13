//reducer.js:用于合并所有的reducer,并返回
//reducer的解释:reducer就是redux中产生的一个概念
//reducer通过返回state,创建并更新state,
//reducer是一个纯函数,接收两个参数,第一个是state,第二个是action,通过action去改变state的值



//合并所有的reducer,并返回
import {combineReducers} from 'redux';

import {user} from './redux/user.redux';

import {chatuser} from './redux/chatuser.redux';

import {chat} from './redux/chat.redux'


export default combineReducers({user,chatuser,chat});