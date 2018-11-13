import React from 'react';
import { NavBar, TabBar} from 'antd-mobile';
//这是进行组件之间传递值的属性类型检测的
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
class NavLinkBar extends React.Component{
    //我们通过propTypes插件限定我们传递的data属性必须是一个数组类型的
    static propTypes = {
        data:PropTypes.array.isRequired
    }
    render(){
        const navList = this.props.data.filter(v=>!v.hide);
        //获取pathname
        const {pathname} = this.props.location;
        // console.log(this.props);
        return (
            <div>
                <TabBar>
                    {navList.map(v=>(
                        <TabBar.Item
                        badge={v.path=='/msg'?this.props.unread:0}
                        key={v.path}
                        title={v.text}
                        icon={{uri:require(`./img/${v.icon}.png`)}}
                        selectedIcon={{uri:require(`./img/${v.icon}-active.png`)}}
                        selected={pathname===v.path}
                        onPress={()=>{
                            this.props.history.push(v.path)
                        }}
                        >
                        </TabBar.Item>
                    ))}
                </TabBar>
            </div>
        )
    }
}


export default withRouter(connect(
    state=>state.chat
)(NavLinkBar));