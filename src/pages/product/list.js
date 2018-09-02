import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import MyLayout from 'common/layout/layout.js';
import { Breadcrumb,Button,Table,Divider,InputNumber,Modal,Input,Switch  } from 'antd';
import { connect } from 'react-redux';
import { actionCreator } from './store/center.js';


class ProductList extends Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		this.props.getProduct(1);
	}

	render(){
		const columns = [
			{
			  title: 'id',
			  dataIndex: 'id',
			  key:'id'
			}, 
			{
			  title: '商品名称',
			  dataIndex: 'name',
			  key:'name'
			},
			{
			  title: '状态',
			  dataIndex: 'status',
			  key:'status',
			  render:(order,record)=>{
			  	return <Switch 
			  		checkedChildren="在售" 
			  		unCheckedChildren="下架" 
			  		defaultChecked={record.status=='0' ? true : false }
			  		onChange={(checked)=>{
			  			console.log(checked)
			  			this.props.handleStatus(record.id,checked ? 0 : 1 )
			  		}}
			  	/>
			  }
			},
			{
			  title: '排序',
			  dataIndex: 'order',
			  key:'order',
			  render:(order,record)=>{
			  	return <InputNumber 
			  		defaultValue={order} 
			  		onBlur={(e)=>{
			  			this.props.handleOrder(record.id,e.target.value)
			  		}}
			  	/>
			  }
			}, 
			{
		  		title: '操作',
		  		key: 'action',
		  		render: (text, record) => (//record就是拿到id name order pid
		    		<span>
				      	<Link to={'product/save/'+record.id}>
				      	编辑
				      	</Link>
				      	<Divider type="vertical" />
				      	<Link to={'product/detail/'+record.id}>
				      	查看
				      	</Link>				      	
				    </span>
		  		)
			}
		]
		const data=this.props.list.map((product)=>{//map接受一个函数,参数是指遍历哪个对象
			return {
				key:product.get('_id'),
				id:product.get('_id'),
				name:product.get('name'),
				order:product.get('order'),
				status:product.get('status')
			}
		}).toJS()//加上tojs将List转化成数组,不加的时候是List,也就是immutable对象
		return (
			<MyLayout>
				<div>
					<Breadcrumb>
		    			<Breadcrumb.Item>新增商品</Breadcrumb.Item>
		    			<Breadcrumb.Item>商品列表</Breadcrumb.Item>
					</Breadcrumb>
					<div className='clearfix'>
						<Link to='/product/save'>
							<Button type="primary" style={{ float:'right' }}>新增商品</Button>								
						</Link>
					</div>
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
							// console.log(pagination)
								this.props.getProduct(pagination.current)					
							}
						}
						loading={
							{
								spinning:this.props.isPageFetching,
								tip:'页面正在加载中...'
							}							
						}							
					/>						
				</div>
			</MyLayout>

		)
	}
}

const mapStateToProps=(state)=>{
	return{		
		id:state.get('product').get('_id'),
		current:state.get('product').get('current'),
		pageSize:state.get('product').get('pageSize'),
		total:state.get('product').get('total'),
		list:state.get('product').get('list'),
		isPageFetching:state.get('product').get('isPageFetching')
	}
}

const mapDispatchToProps=(dispatch)=>{
	return {
		getProduct:(currentPage)=>{
			const action=actionCreator.getProductAction(currentPage);
			dispatch(action)
		},
		handleOrder:(id,newOrder)=>{
			const action=actionCreator.handleOrderAction(id,newOrder);
			dispatch(action)
		},
		handleStatus:(id,newStatus)=>{
			const action=actionCreator.handleStatusAction(id,newStatus);
			dispatch(action)
		}
	}
}





export default connect(mapStateToProps,mapDispatchToProps)(ProductList);