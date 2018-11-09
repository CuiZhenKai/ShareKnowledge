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
import BossInfo from './container/bossinfo/bossinfo.js'
import GeniusInfo from './container/geniusinfo/geniusinfo.js'
import Dashboard from './component/dashboard/dashboard.js'
import reducers from './reducers.js'
import './config'
import './index.css'

const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
));


ReactDom.render(
    (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    {/* 这个组件存在的意义在于路由是否存在 */}
                    <AuthRoute></AuthRoute>
                    {/* 值得注意的一个地方是:只要是Switch组件包起来的地方,只要命中了第一个,后面的就不在继续捕获了 */}
                    <Switch>
                        {/* 牛人完善信息页面 */}
                        <Route path='/geniusinfo' component={GeniusInfo}></Route>
                        {/* boss完善信息页面 */}
                        <Route path='/bossinfo' component={BossInfo}></Route>
                        <Route path='/login' component={Login}></Route>
                        <Route path='/register' component={Register}></Route>
                        {/* 如果用户选择完头像之后,会跳转到boss或者genius详情的页面,但是我们并没有为这两个页面设置路由,所以如果没有跳转的路由被选中之后,就会跳转到dashboard组件,有时候dashboard组件也会用来做404页面*/}
                        <Route component={Dashboard}></Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    ),
    document.getElementById('root')
);