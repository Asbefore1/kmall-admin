import React,{ Component } from 'react';
import { Alert } from 'antd';
import { Link } from 'react-router-dom';
import './errpage.css';



class Errpage extends Component{

	render(){
		return(			    
			<div className='Errpage'>
				<Alert message="页面走丢了..." type="error" />
				<Link to='/'>返回首页</Link>
		  	</div>
		)
	}
}


export default Errpage;