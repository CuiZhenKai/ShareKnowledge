import React from 'react';
import {List,InputItem,WingBlank,Button,Radio, NoticeBar, WhiteSpace, NavBar, Icon,TextareaItem} from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
//导入connect,目的为了传入redux的数据
import {connect} from 'react-redux'
//导入跳转路由所需要的插件
import {Redirect} from 'react-router-dom';
//导入redux中我们自定义的方法
import {update} from '../../redux/user.redux'

class BossInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title:'',
            company:'',
            money:'',
            desc:''
        }
    }
    onChange(key,val){
        this.setState({
            [key]:val
        });
    }
    render(){
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return (
            <div>
                {redirect&&redirect!=path?<Redirect to={this.props.redirectTo} />:null}
                <NavBar
                        mode="dark">Boss完善信息页面</NavBar>
                
                <WingBlank>
                    <AvatarSelector selectAvatar={(imagename)=>{
                        this.setState({
                            avatar:imagename
                        });
                    }}></AvatarSelector>
                    <WhiteSpace></WhiteSpace>
                    <List>
                        <InputItem onChange={(v)=>this.onChange('title',v)} placeholder="请输入职位">
                            招聘职位
                        </InputItem>
                        <InputItem onChange={(v)=>this.onChange('company',v)} placeholder="请输入公司名称">
                            公司名称
                        </InputItem>
                        <InputItem onChange={(v)=>this.onChange('money',v)} placeholder="请输入职位薪资">
                            职位薪资
                        </InputItem>
                        <TextareaItem onChange={(v)=>this.onChange('desc',v)} placeholder="请输入职位要求" autoHeight rows="3" title="职位要求">
                            
                        </TextareaItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <Button 
                    onClick={()=>{
                        this.props.update(this.state)
                    }}
                    type="primary">保存提交</Button>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state=>state.user,
    {update}
)(BossInfo);