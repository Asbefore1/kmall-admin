//index.js是出口文件


import React,{ Component } from 'react';
import { Input,Button,Row,Col,List } from 'antd';
import { connect } from 'react-redux';
//由于store中的index中导出了多个,引入过来时也要加上{},表示从多个中引入的
import { actionCreator } from './store';//如果不写index.js就默认去找store里面的index.js
//引入css
import './Todolist.css';


//定义组件
//必须继承React.Component,Component是react上的一个方法
//如果一个组件只有一个render方法的话,这个组件也叫做无状态组件
//无状态组件可以只写一个方法

//处理业务逻辑的组件-UI组件
class Todolist extends Component{

	componentDidMount(){
		// this.props.handleInit();
	}


	render(){
		return(
			<div className='Todolist'>
				<Row>
			      	<Col span={6}>
			      		<Input 
			      			value={this.props.value}
			      			onChange={this.props.handleChange}
			      		/>
			      	</Col>
			      	<Col span={6}>
			      		<Button 
			      			type="primary"
			      			onClick={this.props.handleAdd}
			      		>提交
			      		</Button>
			      	</Col>			     		       
			    </Row>
			   	<Col span={6}>
		      		<List
		    			style={{ marginTop: 20 }}
		      			bordered
		      			dataSource={this.props.list}
		      			renderItem={(item,index) => (<List.Item onClick={()=>this.props.handleDelete(index)}>{item}</List.Item>)}
		    		/>
			    </Col>	
			</div>
		)
	}
}

const mapStateToProps=(state)=>{
	// console.log(state)	//state.todolist就相当于map
	return{
		value:state.todolist.get('value'),
		list:state.todolist.get('list')
	}
}

const mapDispatchToProps=(dispatch)=>{
	// console.log(dispatch)
	return{
		handleChange:(e)=>{
			const action=actionCreator.changeValueAction(e.target.value);
			dispatch(action)
		},
		handleAdd:()=>{
			const action=actionCreator.addItemAction();
			dispatch(action)
		},
		handleDelete:(index)=>{
			const action=actionCreator.deleteItemAction(index);
			dispatch(action)
		},
		handleInit:(data)=>{
			const action=actionCreator.getInitDataAction();
			dispatch(action)
		}
	}
}

//connect是让指定的组件和store连接
export default connect(mapStateToProps,mapDispatchToProps)(Todolist);