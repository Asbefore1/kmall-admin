import React,{ Component } from 'react';
import { Switch,Link } from 'react-router-dom';
import MyLayout from '../../common/layout/layout.js';
import { Breadcrumb,Button,Table,Divider,InputNumber,Modal,Input  } from 'antd';
import { connect } from 'react-redux';
import { actionCreator } from './store/center.js';


/*
const data = [{
  key: '1',
  order: 32,
  id:111,
  name:'aaa'
}, {
  key: '2',
  order: 42,
  id:232,
  name:'aaa'
}, {
  key: '3',
  order: 32,
  id:333,
  name:'aaa'
}];
*/




class CategoryList extends Component{
	constructor(props){
		super(props);
		this.state={//pid存在state上
			pid:this.props.match.params.pid || 0
		}
	}

	componentDidMount(){
		//第一个参数是父级ID,第二个参数是默认显示第几页的页码
		this.props.handlePage(this.state.pid,1)
	}


	//更新完成后
	componentDidUpdate(preProps,preState){
		// console.log('CategoryList constructor..')
		// console.log(preProps)
		// console.log(this.props)
		let oldPath=preProps.location.pathname;
		let newPath=this.props.location.pathname;
		if(oldPath!=newPath){
			// console.log('upload.....')
			let newPid=this.props.match.params.pid || 0;
			this.setState({
				pid:newPid
			},()=>{
				this.props.handlePage(newPid,1)
			})
		}
	}


	render(){
		const columns = [
			{
			  title: 'id',
			  dataIndex: 'id',
			  key:'id'
			}, {
			  title: '分类名称',
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
				      	<a href="javascript:;"
				      		onClick={()=>{
				      			this.props.showUpdateModal(record.id,record.name)
				      		}}
				      	>
				      	更新名称
				      	</a>
				      	{
				      		record.pid==0
				      		? 
					      		(
					      			<span>
					      				<Divider type="vertical" />
					      				<Link to={'/category/'+record.id}>查看子分类</Link>
					      			</span>
					      		)
					      	:
					      		null
				      	}				      	
				    </span>
		  		)
			}
		]
		let pid=this.state.pid;
		const data=this.props.list.map((category)=>{//map接受一个函数,参数是指遍历哪个对象
			return {
				key:category.get('_id'),
				id:category.get('_id'),
				name:category.get('name'),
				order:category.get('order'),
				pid:category.get('pid')
			}
		}).toJS()//加上tojs将List转化成数组,不加的时候是List,也就是immutable对象
		return (
			<Switch>
				<MyLayout>
					<div>
						<Breadcrumb>
			    			<Breadcrumb.Item>新增分类</Breadcrumb.Item>
			    			<Breadcrumb.Item>分类列表</Breadcrumb.Item>
						</Breadcrumb>
						<div className='clearfix'>
							<h3 style={{ float:'left' }}>父类Id:{ pid }</h3>		
							<Link to='/category/add'>
								<Button type="primary" style={{ float:'right' }}>添加分类</Button>								
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
									this.props.handlePage(pid,pagination.current)
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
						<Modal
				          	title="修改分类名称"
				          	visible={this.props.UpdateVisible}
				          	onOk={()=>{this.props.handleOk(pid)}}
				          	onCancel={this.props.handleCancel}
				          	cancelText='取消'
				          	okText='确定'
				        >
				        	<Input 
				        		style={{width:150}} 
				        		value={this.props.updateName}	
				        		onChange={(e)=>{
				        			// console.log(e.target.value)
				        			this.props.handleNewName(e.target.value)
				        		}}	        		
				        	/>
				        </Modal>
					</div>
				</MyLayout>
			</Switch>
		)
	}
}

const mapStateToProps=(state)=>{
	return{
		isPageFetching:state.get('category').get('isPageFetching'),
		id:state.get('category').get('_id'),
		current:state.get('category').get('current'),
		pageSize:state.get('category').get('pageSize'),
		total:state.get('category').get('total'),
		list:state.get('category').get('list'),
		UpdateVisible:state.get('category').get('UpdateVisible'),
		updateName:state.get('category').get('updateName'),
	}
}

const mapDispatchToProps=(dispatch)=>{
	return {
		handlePage:(pid,currentPage)=>{
			const action=actionCreator.getPageAction(pid,currentPage);
			dispatch(action)
		},
		showUpdateModal:(updateId,updateName)=>{
			const action=actionCreator.showUpdateModalAction(updateId,updateName);
			dispatch(action)
		},
		handleCancel:()=>{
			const action=actionCreator.handleCancelModalAction();
			dispatch(action)
		},
		handleNewName:(newName)=>{
			const action=actionCreator.handleNewNameAction(newName);
			dispatch(action)
		},
		handleOk:(pid)=>{
			const action=actionCreator.handleOkAction(pid);
			dispatch(action)
		}
	}
}





export default connect(mapStateToProps,mapDispatchToProps)(CategoryList);