import React,{ Component } from 'react';
import { getUserName } from 'util/ajax.js';
import MyLayout from '../../common/layout/layout.js';
import { Table,Pagination  } from 'antd';
import { connect } from 'react-redux';
import { actionCreator } from './store/center.js';

const columns = [
	{
	  title: '用户名',
	  dataIndex: 'username',
	  key:'username'
	}, {
	  title: '是否是管理员',
	  dataIndex: 'isAdmin',
	  key:'isAdmin',
	  render:isAdmin=>(isAdmin ? '是' :'否')
	},
	{
	  title: '邮箱',
	  dataIndex: 'email',
	  key:'email'
	},
	{
	  title: '手机号码',
	  dataIndex: 'phone',
	  key:'phone',
	},
	{
	  title: '注册时间',
	  dataIndex: 'Time',
	  key:'Time',
	}
]

const dataSource = [{
	key:'1',
  	username: 'admin',
  	isAdmin:true
}, {
	key:'2',
  	username: 'test1',
  	isAdmin:false
}];

/*
const data=[];
for(var i=0;i<500;i++){
	data.push({
		key:i,
  		username: 'test'+i,
  		isAdmin:false
	})
}
*/
class User extends Component{

	componentDidMount(){
		this.props.handlePage(1)
	}


	render(){
		return(
			<div className='User'>
				<MyLayout>
					<Table 
						dataSource={dataSource} 
						columns={columns}
						pagination={
							{
								current:this.props.current,//当前显示第几页
								pageSize:this.props.pageSize,//每页显示多少个
								total:this.props.total,//总共有多少个
							}
						}
						onChange={(pagination)=>{
								// this.props.handleData(pagination)
								// console.log(pagination)
							}
						}
						loading={
							{
								spinning:this.props.isFetching,
								tip:'页面正在加载中...'
							}							
						}			
					/>
				</MyLayout>
			</div>
			
		)
	}
}
//provider通过connect调用函数映射props到子组件中,子组件通过props拿到数据渲染页面
const mapStateToProps=(state)=>{
	// console.log(state)//返回一个map函数,利用map上的get方法获取到user的reducer上的数据
	return {
		isFetching:state.get('user').get('isFetching'),
		current:state.get('user').get('current'),
		pageSize:state.get('user').get('pageSize'),
		total:state.get('user').get('total')
	}
}

const mapDispatchToProps=(dispatch)=>{
	return {
		handlePage:(page)=>{
			const action=actionCreator.getPageAction(page);
			dispatch(action)
		}
	}		
}


export default connect(mapStateToProps,mapDispatchToProps)(User);