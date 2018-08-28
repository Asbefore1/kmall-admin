import React,{ Component } from 'react';
import {  Layout, Menu, Breadcrumb, Icon} from 'antd';
import { NavLink } from 'react-router-dom';
import './sider.css';
const { Sider} = Layout;

class MySider extends Component{
	render(){
		return(
			<div className='Sider'>
				<Sider width={200} style={{ background: '#fff' }}>
					<Menu
			          	mode="inline"
			          	defaultOpenKeys={['sub1']}
			          	style={{ minheight: '680', borderRight: 0 }}
			        >		          	
		            	<Menu.Item key="1">
		            		<NavLink exact to="/"><Icon type="to-top" />首页</NavLink>
		            	</Menu.Item>
		            	<Menu.Item key="2">
		            		<NavLink to="/user"><Icon type="user" />用户列表</NavLink>
		            	</Menu.Item>
		            	<Menu.Item key="3">
		            		<NavLink to="/category"><Icon type="database" />分类列表</NavLink>	            		
		            	</Menu.Item>
		            	<Menu.Item key="4">
		            		<NavLink to="/product"><Icon type="shop" />商品列表</NavLink>	            		
		            	</Menu.Item>
		            	
			        </Menu>
		        </Sider>
	        </div>
		)
	}
}


export default MySider;