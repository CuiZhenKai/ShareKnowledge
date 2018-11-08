//autoroute:组件存在的目的就是为了获取用户的信息并进行跳转
import React from 'react';
//用来处理获取后端数据的逻辑
import axios from 'axios';
//导入路由使用的方式
import {withRouter} from 'react-router-dom';
import {loadData} from '../../redux/user.redux'
import {connect} from 'react-redux'


class AuthRoute extends React.Component{
    //当组件被挂在页面上时候
    componentDidMount(){
        const publicList = ['/login','/register'];
        const pathname = this.props.location.pathname;
        if(publicList.indexOf(pathname)>-1){
            return null;
        }
        //获取用户的信息
        axios.get('/user/info').then(res=>{
            if(res.status==200){
                if(res.data.code==0){
                    //有登录信息
                    // console.log("1");
                    this.props.loadData(res.data.data);
                    // console.log(res.data.data);
                }else{
                    //没有登录,跳转到登录页
                    this.props.history.push('/login');
                    // console.log(this.props);
                }
            }
        });
        //用户的状态:
        //是否登录
        //现在的URL地址

        //用户的身份是boss还是牛人
        //用户是否完善了信息
    }
    render(){
        return null;
    }
}

export default withRouter(connect(
    null,
    {loadData}
)(AuthRoute));
