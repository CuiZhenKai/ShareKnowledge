
import React from 'react';
//这是一个简单的高阶组件
export default function imoocForm(Comp){
    return class WrapperComp extends React.Component{
        constructor(props){
            super(props);
            this.state = {

            }
            this.handelChange = this.handelChange.bind(this);
        }

        handelChange(key,val){
            this.setState({
                [key]:val
            });
        }

        render(){
            return <Comp handelChange={this.handelChange} state={this.state}  {...this.props}></Comp>
        }
    }
}