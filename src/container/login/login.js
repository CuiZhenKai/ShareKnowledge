import React from 'react';
import Logo from '../../component/logo/logo';
import {List,InputItem,WingBlank,Button,Radio, NoticeBar, WhiteSpace, Icon} from 'antd-mobile';
//导入跳转路由所需要的插件
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux';
import imoocForm from '../../component/imoocForm/imooc-form'

//高阶组件的小demo
//我们早就已经意识到,组件其实就是一个函数
class Hello extends React.Component{
    render(){
        return <h2>Hello</h2>
    }
}

//我们这里写一个函数,专门用来装饰上面的Hello组件
// function WrapperHello(Comp){
//     class Wrap extends React.Component{
//         render(){
//             return (
//                 <div>
//                     <p>这是高阶组件</p>
//                     <Comp {...this.props}></Comp>
//                 </div>
//             )
            
//         }
//     }
//     return Wrap;
// }

// Hello = WrapperHello(Hello);
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
        this.register = this.register.bind(this);
        this.handelLogin = this.handelLogin.bind(this);
    }
    register(){
        // console.log(this.props);
        this.props.history.push('/register');
    }
    handelLogin(){
        this.props.login(this.props.state);
    }
    render(){
        return (
            <div>
                {/* Hello */}
                {this.props.redirectTo&&this.props.redirectTo!='/login'?<Redirect to={this.props.redirectTo} />:null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg?<NoticeBar mode="closable" action={<span style={{ color: '#a1a1a1' }}>不再提示</span>}>{this.props.msg}</NoticeBar>:null}
                        <InputItem
                        onChange={v=>this.props.handelChange('user',v)}
                        >用户名</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem
                        onChange={v=>this.props.handelChange('pwd',v)}
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

export default imoocForm(connect(
    state=>state.user,
    {login}
)(Login));