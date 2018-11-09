import React from 'react';
import {connect} from 'react-redux'
//
import {Card,WhiteSpace,WingBlank} from 'antd-mobile';
import {getUserList} from '../../redux/chatuser.redux'

class Boss extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[]
        }
    }
    componentDidMount(){
        //当页面上的所有组件被挂载之后,我们发起axios请求,获取牛人的列表
        this.props.getUserList('genius');
        console.log(this.props);
    }
    render(){
        // console.log(this.state)
        return (
            <WingBlank>
                <WhiteSpace size="lg" />
                {this.state.data.map(v=>(
                    v.avatar?
                    (<Card key={v._id} style={{marginBottom:10}}>
                        <Card.Header
                        title={v.user}
                        thumb={require(`../img/${v.avatar}.png`)}
                        extra={<span>{v.title}</span>}
                        ></Card.Header>
                        <Card.Body>
                            {v.desc.split('\n').map(v=>(
                                <div key={v}>{v}</div>
                            ))}
                        </Card.Body>
                    </Card>):null
                ))}
            </WingBlank>
        )
    }
}

export default connect(
    state=>state.chatuser,
    {getUserList}
)(Boss);