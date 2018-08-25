import React,{ Component } from 'react';
import { USER_LOGOUT } from 'api/jiekou.js';
import { request,getUserName,removeUserName } from 'util/ajax.js';
import {  Layout, Menu, Breadcrumb, Icon, Dropdown,Button,message  } from 'antd';
import './header.css';
const { Header } = Layout;



class MyHeader extends Component{
	constructor(props){
		super(props);
		this.handleLogout=this.handleLogout.bind(this)
	}

	handleLogout(){
		request({
			url:USER_LOGOUT
		})
		.then(result=>{
			// console.log(result)
			removeUserName();//退出并删除保存的localStorage
			window.location.href='/login'
		})
	}

	render(){
		const menu = (
		  <Menu>
		    <Menu.Item onClick={this.handleLogout}>
		      <Icon type="logout" />退出
		    </Menu.Item>  
		  </Menu> 
		)
		return(			    
			<div className='Header'>
				<Header className="header">
					<div className="logo">KMALL</div>	
					<div className='menu' >
				  	<Dropdown className='dropdown' overlay={menu} trigger={['click']}>
				   	 	<a href="#" ><Icon type="smile" />欢迎{ getUserName() }用户<Icon type="down" /></a>
				  	</Dropdown>	
				  </div>	
			  </Header>
		  </div>
		)
	}
}


export default MyHeader;