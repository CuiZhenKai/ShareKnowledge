import React from 'react';
import Logo from '../../component/logo/logo';
import {List,InputItem,WingBlank,Button,Radio, NoticeBar, WhiteSpace, Icon} from 'antd-mobile';
//导入跳转路由所需要的插件
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user:'',
            pwd:''
        }
        this.register = this.register.bind(this);
        this.handelLogin = this.handelLogin.bind(this);
    }
    register(){
        // console.log(this.props);
        this.props.history.push('/register');
    }
    handelChange(key,val){
        this.setState({
            [key]:val
        });
    }
    handelLogin(){
        this.props.login(this.state);
    }
    render(){
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg?<NoticeBar mode="closable" action={<span style={{ color: '#a1a1a1' }}>不再提示</span>}>{this.props.msg}</NoticeBar>:null}
                        <InputItem
                        onChange={v=>this.handelChange('user',v)}
                        >用户名</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem
                        onChange={v=>this.handelChange('pwd',v)}
                        type="password">密码</InputItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button  onClick={this.handelLogin} type="primary">登录</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state=>state.user,
    {login}
)(Login);