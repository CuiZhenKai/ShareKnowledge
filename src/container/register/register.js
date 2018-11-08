import React from 'react';

import Logo from '../../component/logo/logo';

import {List,InputItem,WingBlank,Button,Radio, NoticeBar, WhiteSpace, Icon} from 'antd-mobile'
import {connect} from 'react-redux';
//导入跳转路由所需要的插件
import {Redirect} from 'react-router-dom';
import {register} from '../../redux/user.redux';

class Register extends React.Component{
    constructor(props){
        super(props);
        // this.register = this.register.bind(this);
        this.state = {
            user:'',
            pwd:'',
            repeatpwd:'',
            type:'genius'
        }
        this.handelRegister = this.handelRegister.bind(this);
    }
    handelChange(key,val){
        this.setState({
            [key]:val
        });
    }
    handelRegister(){
        this.props.register(this.state);
    }
    render(){
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg?<NoticeBar mode="closable" action={<span style={{ color: '#a1a1a1' }}>不再提示</span>}>{this.props.msg}</NoticeBar>:null}
                        <InputItem 
                        onChange={v=>this.handelChange('user',v)}>用户名</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem type="password"
                        onChange={v=>this.handelChange('pwd',v)}>密码</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem type="password"
                        onChange={v=>this.handelChange('repeatpwd',v)}>确认密码</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <RadioItem 
                        checked={this.state.type=='genius'}
                        onChange={v=>this.handelChange('type','genius')}
                        >牛人</RadioItem>
                        <RadioItem checked={this.state.type=='boss'}
                        onChange={v=>this.handelChange('type','boss')}
                        >Boss</RadioItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={this.register} type="primary" onClick={this.handelRegister}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state=>state.user,
    {register}
)(Register);