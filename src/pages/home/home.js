import React,{ Component } from 'react';
import { getUserName } from 'util/ajax.js';
import MyLayout from '../../common/layout/layout.js';
//映射
import { connect } from 'react-redux';
import { actionCreator } from './store/center.js';


import { Card } from 'antd';
import './home.css';
class Home extends Component{
	constructor(props){
		super(props);
	}

	//用生命周期函数通过ajax去获取数据
	componentDidMount(){
		this.props.handleCount()
	}


	render(){
		return(
			<div className='Home'>
				{ 
					//getUserName() 
				}
				<MyLayout>			
					<Card title="用户数"  hoverable={true}>
					    <p>{this.props.usernum}</p>
					</Card>
					<Card title="订单数"  hoverable={true}>
					    <p>{this.props.ordernum}</p>
					</Card>
					<Card title="商品数"  hoverable={true}>
					    <p>{this.props.pronum}</p>
					</Card>
				</MyLayout>
			</div>
			
		)
	}
}


const mapStateToProps=(state)=>{
	// console.log(state)//state是一个map,map上有get方法
	return{
		usernum:state.get('home').get('usernum'),
		ordernum:state.get('home').get('ordernum'),
		pronum:state.get('home').get('pronum')
	}
}
//映射
const mapDispatchToProps=(dispatch)=>{
	return {
		handleCount:()=>{//通过发送ajax请求去获取数据
			const action=actionCreator.getCountAction();
			dispatch(action)
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);