import React from 'react';
import {connect} from 'react-redux';
//导入组件antd
import {Result,List, WhiteSpace,Button,WingBlank,Modal} from 'antd-mobile';
import { Brief } from 'antd-mobile/lib/list/ListItem';
//导入处理cookie的插件
import browserCookie from 'browser-cookies';
//导入redux中的函数
import {logoutSubmit} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom'

class User extends React.Component{
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }
    //实现退出登录
    logout(){
        const alert = Modal.alert;
        alert('注销','确定退出登录吗?',[
            {text:'我要留下',onPress:()=>console.log('留下')},
            {text:'执意退出',onPress:()=>{
                //清除cookie
                browserCookie.erase('userid');
                //自刷新页面,回到登录页面
                // window.location.href = window.location.href;
                //上面的window...的方法涉及到了回到页面需要刷新的问题,为了避免刷新的效果,我们应该使用redux
                this.props.logoutSubmit();
            }}
        ])
        // console.log('你已经退出登录');
    }
    render(){
        const props = this.props;
        const Item = List.Item;
        // console.log(this.props);
        return props.user?(
            <div>
                <Result img={<img src={require(`../img/${this.props.avatar}.png`)} style={{width:50}} alt="" />}
                    title={this.props.user}
                    message={this.props.type=='boss'?this.props.company:null}
                 />
                 <List renderHeader={()=>'我的动态'}>
                    <Item
                    multipleLine
                    >招聘职位||{props.title}
                    {this.props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
                    {props.money?<Brief>薪资情况:{props.money}</Brief>:null}
                    </Item>
                 </List>
                 <WhiteSpace></WhiteSpace>
                 <WhiteSpace></WhiteSpace>
                 <WhiteSpace></WhiteSpace>
                 <WingBlank>
                    <Button onClick={this.logout} type="warning" >退出登录</Button>
                 </WingBlank>
                 {/* <List>
                     <Item onClick={this.logout}>tui</Item>
                 </List> */}
            </div>
        ):<Redirect to={this.props.redirectTo}></Redirect>
    }
}


export default connect(
    state=>state.user,
    {logoutSubmit}
)(User);