import React from 'react';
import {connect} from 'react-redux';
import {getMsgList,sendMsg,recvMsg} from '../../redux/chat.redux'
//导入前台发起连接的插件
// import io from 'socket.io-client';
//导入antd中的部分
import {List,InputItem,Button,NavBar} from 'antd-mobile';
// import { red } from 'ansi-colors';
//实现前后端的联调
//这里我们需要手动连接一下后台的9090端口
//因为我们这里涉及到了跨域的问题
//解释:
//ws:websocket
// const socket =  io('ws://localhost:9090');


class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text:''
            // msg:[]
        }
    }
    // componentDidMount(){
        
    //     //我们在这里监听socket播放出来的全局事件
    // //    socket.on('recvmsg',(data)=>{
    // //         // console.log(data);
    // //         this.setState({
    // //             msg:[...this.state.msg,data.text]
    // //         })
    // //    });
       
    // }
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }
    handelSubmit(){
        // console.log(this.state.text);
        //使用emit函数将我们的某些特定的数据发送给后端
        // socket.emit('sendmsg',{text:this.state.text});
        //发送完成之后将输入框中的数据清空
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({from,to,msg});
        // this.props.getMsgList();
        this.setState({
            text:''
        })
    }
    render(){
        const user = this.props.match.params.user;
        const vv = this.props.chat.chatmsg;
        // console.log(vv);
        const Item = List.Item;
        return (
            <div id='chat-page'>
                <NavBar mode='dark'>
                    {this.props.match.params.user}
                </NavBar>
                {this.props.chat.chatmsg.map(v=>{
                    // console.log(v.content);
                    return v.from==user?(
                        <List>
                            <Item
                            // thumb={}
                            >
                               【对方说】{v.content}
                            </Item>
                        </List>
                    ):(
                        <List key={v._id}>
                            <Item 
                            // extra={'avatar'}
                             className="chat-me">
                                {v.content}【我说】
                            </Item>
                        </List>
                    )
                })}
                <div className="stick-footer">
                    <List>
                        <InputItem
                        placeholder='你有什么想说的'
                        value={this.state.text}
                        onChange={v=>{
                            this.setState({
                                text:v
                            })
                        }}
                        extra={<span onClick={()=>this.handelSubmit()}>发送</span>}
                        >
                        </InputItem>
                    </List>
                </div>
            </div>
        )
    }
}


export default connect(
    state=>state,
    {getMsgList,sendMsg,recvMsg}
)(Chat);