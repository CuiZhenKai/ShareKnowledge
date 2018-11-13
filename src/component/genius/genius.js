import React from 'react';
import {connect} from 'react-redux'
//
import {getUserList,chatuser} from '../../redux/chatuser.redux'
// 我们这里值得注意的地方是,错了好几次了
// 如果我们在子组件中用export default导出的
// 在外部引用的时候不需要加{}
import UserCard from '../../component/usercard/usercard'

class Genius extends React.Component{
    componentDidMount(){
        //当页面上的所有组件被挂载之后,我们发起axios请求,获取boss的列表
        this.props.getUserList('boss');
    }
    render(){
        // console.log(this.state)
        return <UserCard userlist={this.props.userlist}></UserCard>
    }
}

export default connect(
    state=>state.chatuser,
    {getUserList}
)(Genius);