import React from 'react';

import Logo from '../../component/logo/logo';

import {List,InputItem,WingBlank,Button,Radio, NoticeBar, WhiteSpace, Icon} from 'antd-mobile'
import {connect} from 'react-redux';
//导入跳转路由所需要的插件
import {Redirect} from 'react-router-dom';
import {register} from '../../redux/user.redux';
import imoocForm from '../../component/imoocForm/imooc-form'

class Register extends React.Component{
    constructor(props){
        super(props);
        this.handelRegister = this.handelRegister.bind(this);
    }
    componentDidMount(){
        this.props.handelChange('type','genius');
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
                        onChange={v=>this.props.handelChange('user',v)}>用户名</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem type="password"
                        onChange={v=>this.props.handelChange('pwd',v)}>密码</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <InputItem type="password"
                        onChange={v=>this.props.handelChange('repeatpwd',v)}>确认密码</InputItem>
                        <WhiteSpace></WhiteSpace>
                        <RadioItem 
                        checked={this.props.state.type=='genius'}
                        onChange={v=>this.props.handelChange('type','genius')}
                        >牛人</RadioItem>
                        <RadioItem checked={this.props.state.type=='boss'}
                        onChange={v=>this.props.handelChange('type','boss')}
                        >Boss</RadioItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={this.register} type="primary" onClick={this.handelRegister}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default imoocForm(connect(
    state=>state.user,
    {register}
)(Register));