import React,{ Component } from 'react';
import { Layout } from 'antd';
import Header from '../header/header.js';
import Sider from '../sider/sider.js';


const { Content } = Layout;

class MyLayout extends Component{
	render(){
		return(
			<div>
				<Layout>				    
				    <Header />				    
				    <Layout>				      
				       	<Sider />				      
				      	<Layout style={{ padding: '0 24px 24px' }}>
				        	<Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
				          		{this.props.children}
				       	 	</Content>
				      	</Layout>
				    </Layout>
				</Layout>
			</div>
		)
	}
}


export default MyLayout;