//处理前台的入口
//前台技术:React+Redux+Router+Antd+axios

//导入最基本的react
import React from 'react';
//导入react-dom渲染结构
import ReactDom from 'react-dom';
//按需导入redux中的组件
import {createStore,applyMiddleware,compose} from 'redux';
//处理异步
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom';

//引入登录注册组件
import Login from './container/login/login.js'
import Register from './container/register/register.js'
//导入authroute组件
import AuthRoute from './component/autoroute/autoroute.js'
import reducers from './reducers.js'
import './config'
import './index.css'

const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
));

function Boss(){
    return <h2>boss</h2>
}

ReactDom.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    {/* 这个组件存在的意义在于路由是否存在 */}
                    <AuthRoute></AuthRoute>
                    <Route path='/boss' component={Boss}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                </div>
            </BrowserRouter>
        </Provider>
    ),
    document.getElementById('root')
);