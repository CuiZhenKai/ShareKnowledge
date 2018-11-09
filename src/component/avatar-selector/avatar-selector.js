import React from 'react';
import { NavBar, Icon,Grid,List,Button } from 'antd-mobile';
//导入进行属性类型检测的组件
import PropTypes from 'prop-types';

class AvatarSelector extends React.Component{
    static PropTypes = {
        //下面的代码其实是进行属性的类型检测
        //意思是:selectAvatar的类型必须是一个函数,而且是必传的
        selectAvatar:PropTypes.func.isRequired
    }
    constructor(props){
        super(props);
        this.state={

        }
    }
    render(){
        const avatarList = 'boy,bull,chick,girl,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,woman,whale,zebra'.split(',').map(v=>({
            icon:require(`../img/${v}.png`),
            text:v
        }));
        const gridHeader = this.state.text?(<div><span>已选择:</span><img style={{width:20}} src={this.state.icon}/></div>):<div>请选择头像:</div>;
        return (
            <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid
                    data={avatarList} columnNum={3}
                    isCarousel
                    onClick={elm=>{
                        this.setState(elm);
                        this.props.selectAvatar(elm.text)
                    }}
                     
                    />
                </List>
            </div>
        )
    }
}

export default AvatarSelector;