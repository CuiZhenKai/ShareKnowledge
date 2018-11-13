import React from 'react';

import {connect} from 'react-redux';
import { NavBar} from 'antd-mobile';
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom';
import NavLinkBar from '../navlink/navlink'
import Boss from '../../component/boss/boss';
import Genius from '../../component/genius/genius';
import User from '../../component/user/user'
import {getMsgList,sendMsg,recvMsg} from '../../redux/chat.redux'

function Message(){
    return <h2>消息首页</h2>
}
class Dashboard extends React.Component{
    componentDidMount(){
        this.props.getMsgList();
        this.props.recvMsg();
    }
    render(){
        // console.log(this.props);
        //因为我们这是路由组件,所以不用引入withRouter组件
        const {pathname} = this.props.location;
        const user = this.props.user;
        const navList = [
            {
                path:'/genius',
                text:'boss',
                icon:'job',
                title:'Boss列表',
                component:Genius,
                hide:user.type=="boss"
            },
            {
                path:'/boss',
                text:'牛人',
                icon:'boss',
                title:'牛人列表',
                component:Boss,
                hide:user.type=="genius"
            },
            {
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Message
            },
            {
                path:'/me',
                text:'我',
                icon:'user',
                title:'个人中心',
                component:User
            }
        ]
        return (
            <div>
                <NavBar mode="dard" className='fixd-header'>{navList.find(v=>v.path==pathname).title}</NavBar>
                <div style={{marginTop:45}}>
                    <Switch>
                        {navList.map(v=>(
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </div>
                {/* 我们通过属性传值的方式将navlist传递给底部子组件 */}
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}

export default connect(
    state=>state,
    {getMsgList,recvMsg}
)(Dashboard);