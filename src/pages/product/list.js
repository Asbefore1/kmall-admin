import React,{ Component } from 'react';
import { Switch,Link } from 'react-router-dom';
import MyLayout from 'common/layout/layout.js';
import { Breadcrumb,Button,Table,Divider,InputNumber,Modal,Input  } from 'antd';
import { connect } from 'react-redux';
import { actionCreator } from './store/center.js';


class ProductList extends Component{
	constructor(props){
		super(props);

	}

	componentDidMount(){
		this.props.handlePage(1)
	}

	render(){
		const columns = [
			{
			  title: 'id',
			  dataIndex: 'id',
			  key:'id'
			}, {
			  title: '商品名称',
			  dataIndex: 'name',
			  key:'name'
			},
			{
			  title: '排序',
			  dataIndex: 'order',
			  key:'order',
			  render:(order,record)=>{
			  	return <InputNumber defaultValue={order} />
			  }
			}, 
			{
		  		title: '操作',
		  		key: 'action',
		  		render: (text, record) => (//record就是拿到id name order pid
		    		<span>
				      	<Link to={'product/save'+record.id}
				      	>
				      	编辑
				      	</Link>
				      	<Link to={'product/save'+record.id}
				      	>
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
			<Switch>
				<MyLayout>
					<div>
						<Breadcrumb>
			    			<Breadcrumb.Item>新增商品</Breadcrumb.Item>
			    			<Breadcrumb.Item>商品列表</Breadcrumb.Item>
						</Breadcrumb>
						<div className='clearfix'>
							<Link to='/product/add'>
								<Button type="primary" style={{ float:'right' }}>添加商品</Button>								
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
									this.props.handlePage(pagination.current)
									// console.log(pagination.current)
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
			</Switch>
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
		handlePage:(pid,currentPage)=>{
			const action=actionCreator.getPageAction(pid,currentPage);
			dispatch(action)
		},
	}
}





export default connect(mapStateToProps,mapDispatchToProps)(ProductList);