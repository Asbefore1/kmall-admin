import React,{ Component } from 'react';
import { Switch,Link } from 'react-router-dom';
import MyLayout from '../../common/layout/layout.js';
import { Breadcrumb,Button,Table,Divider,InputNumber  } from 'antd';
import { connect } from 'react-redux';
import { actionCreator } from './store/center.js';

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
  		render: (text, record) => (
    		<span>
		      	<a href="javascript:;">更新名称</a>
		      	<Divider type="vertical" />
		      	<Link to={'/category/'+record.id}>查看子分类</Link>
		    </span>
  		)
	}
]

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





class CategoryList extends Component{
	constructor(props){
		super(props);
		this.state={//pid存在state上
			pid:this.props.match.params.pid || 0
		}
	}

	componentDidMount(){
		//第一个参数是父级ID,第二个参数是页码
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
			})
		}
	}
	render(){
		let pid=this.state.pid;

		// console.log('list...',this.props.list)
		// const data=this.props.list.map((category)=>{//map接受一个函数,参数是指遍历哪个对象
		// 	return {
		// 		key:category.get('_id'),
		// 		id:category.get('id'),
		// 		name:category.get('name'),
		// 		order:category.get('order')
		// 	}
		// }).toJS()//加上tojs将List转化成数组,不加的时候是List,也就是immutable对象


		return (
			<Switch>
				<MyLayout>
					<div>
						<Breadcrumb>
			    			<Breadcrumb.Item>新增分类</Breadcrumb.Item>
			    			<Breadcrumb.Item>分类列表</Breadcrumb.Item>
						</Breadcrumb>
						<div>
							<h3 style={{ float:'left' }}>父类Id:{pid}</h3>		
							<Link to='/category/add'>
								<Button type="primary" style={{ float:'right' }}>添加分类</Button>								
							</Link>
						</div>
						<Table 
							dataSource={data} 
							columns={columns}							
						/>
					</div>
				</MyLayout>
			</Switch>
		)
	}
}

const mapStateToProps=(state)=>{
	console.log('a:::')
	return{

		// isFetching:state.get('category').get('isFetching'),
		current:state.get('category').get('current'),
		pageSize:state.get('category').get('pageSize'),
		total:state.get('category').get('total'),
		list:state.get('category').get('list')
	}
}

const mapDispatchToProps=(dispatch)=>{
	return {
		handlePage:(pid,currentPage)=>{
			const action=actionCreator.getPageAction(pid,currentPage);
			dispatch(action)
		}
	}
}


export default connect(null,mapDispatchToProps)(CategoryList);