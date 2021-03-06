import React from 'react';
import {connect} from 'react-redux'
//
import {Card,WhiteSpace,WingBlank} from 'antd-mobile';
import {getUserList,chatuser} from '../../redux/chatuser.redux'


import UserCard from '../../component/usercard/usercard'


class Boss extends React.Component{
    componentDidMount(){
        //当页面上的所有组件被挂载之后,我们发起axios请求,获取牛人的列表
        this.props.getUserList('genius');
    }
    render(){
        // console.log(this.state)
        return <UserCard userlist={this.props.userlist}></UserCard>
    }
}

export default connect(
    state=>state.chatuser,
    {getUserList}
)(Boss);