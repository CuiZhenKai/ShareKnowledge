import React from 'react'

import {Card,WhiteSpace,WingBlank} from 'antd-mobile';
//进行属性类型的检测
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom'


class UserCard extends React.Component{
    //要求用我们这个组件的,传递进来的必须是一个数组
    static propTypes = {
        userlist:PropTypes.array.isRequired
    }
    handelClick(v){
        this.props.history.push(`/chat/${v._id}`);
    }
    render(){
        return (
            <WingBlank>
                <WhiteSpace size="lg" />
                {this.props.userlist.map(v=>(
                    v.avatar?
                    (<Card onClick={()=>this.handelClick(v)} key={v._id} style={{marginBottom:10}}>
                        <Card.Header
                        title={v.user}
                        thumb={require(`../img/${v.avatar}.png`)}
                        extra={<span>{v.title}</span>}
                        ></Card.Header>
                        <Card.Body>
                            {v.type=="boss"?<div>公司名:{v.company}</div>:null}
                            要求:{v.desc.split('\n').map(d=>(
                                <div key={d}>{d}</div>
                            ))}
                            {v.type=="boss"?<div>薪资:{v.money}</div>:null}
                        </Card.Body>
                    </Card>):null
                ))}
        </WingBlank>
        )
        
    }
}

export default withRouter(UserCard);