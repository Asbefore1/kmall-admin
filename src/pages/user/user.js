import React,{ Component } from 'react';
import { getUserName } from 'util/ajax.js';
import MyLayout from '../../common/layout/layout.js';
import { Table,Breadcrumb  } from 'antd';
import { connect } from 'react-redux';
import { actionCreator } from './store/center.js';
import moment from 'moment';//将时间格式化

import './user.css';

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
	  dataIndex: 'createdAt',
	  key:'createdAt',
	}
]

class User extends Component{

	componentDidMount(){
		this.props.handlePage(1)
	}


	render(){
		// console.log(this.props.list)
		const data=this.props.list.map((user)=>{//map接受一个函数,参数是指遍历哪个对象
			return {
				key:user.get('_id'),
				username:user.get('username'),
				email:user.get('email'),
				isAdmin:user.get('isAdmin'),
				phone:user.get('phone'),
				createdAt:moment(user.get('createdAt')).format('YYYY-MM-DD HH:mm:ss')
			}
		}).toJS()//加上tojs将List转化成数组,不加的时候是List,也就是immutable对象
		

		return(
			<div className='User'>
				<MyLayout>
				 	<Breadcrumb>
					    <Breadcrumb.Item>用户管理</Breadcrumb.Item>
					    <Breadcrumb.Item>用户列表</Breadcrumb.Item>
					</Breadcrumb>
					<Table 
						dataSource={data} 
						columns={columns}
						pagination={
							{
								current:this.props.current,//当前显示第几页
								pageSize:this.props.pageSize,//每页显示多少个
								total:this.props.total,//总共有多少个
							}
						}
						//改变页数
						onChange={(pagination)=>{
								this.props.handlePage(pagination.current)
								// console.log(pagination.current)
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
	// console.log(state.get('user'))//返回一个map函数,利用map上的get方法获取到user的reducer上的数据
	return {
		isFetching:state.get('user').get('isFetching'),
		current:state.get('user').get('current'),
		pageSize:state.get('user').get('pageSize'),
		total:state.get('user').get('total'),
		list:state.get('user').get('list')
	}
}

const mapDispatchToProps=(dispatch)=>{
	return {
		handlePage:(currentPage)=>{
			const action=actionCreator.getPageAction(currentPage);
			dispatch(action)
		}
	}		
}


export default connect(mapStateToProps,mapDispatchToProps)(User);