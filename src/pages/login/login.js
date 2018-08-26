import React,{ Component } from 'react';
import { Form, Icon, Input, Button,message } from 'antd';
import './login.css';
import { connect } from 'react-redux';
import { actionCreator } from './store/center.js';
const FormItem = Form.Item;
const axios = require('axios');

class NormalLoginForm extends React.Component {
	constructor(props){
		super(props);
		this.handleSubmit=this.handleSubmit.bind(this)
		this.state={
			isFetching:true//isFetching是否是吸引人的,在这里是是否转圈
		}
	}
	handleSubmit(e){
	 	e.preventDefault();//阻止默认行为
	  	this.props.form.validateFields((err, values) => {
		    // console.log(values)//values是用户名和密码
		    if (!err) {	
			    this.props.handleLogin(values)	     
		    }
		})
	}
	render(){
	  const { getFieldDecorator } = this.props.form;
	  return (
	  	<div className='Login'>
		    <Form className="login-form">
		      <FormItem>
		        {getFieldDecorator('username', {
		          rules: [{ required: true, message: '请输入用户名!' },{pattern:/^[a-z|\d]{3,6}$/,message:'用户名为3-6个字符'}],
		        })(
		          <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
		        )}
		      </FormItem>
		      <FormItem>
		        {getFieldDecorator('password', {
		          rules: [{ required: true, message: '请输入密码!' },{pattern:/^[a-z|\d]{3,6}$/,message:'密码为3-6个字符'}],
		        })(
		          <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
		        )}
		      </FormItem>
		      <FormItem>		     
		        <Button 
		        	type="primary" 
		        	onClick={this.handleSubmit} 
		        	className="login-form-button"
		        	loading={this.props.isFetching}//点击让登录转圈,true是转圈,false不转
		        >
		       	登录
		        </Button>     
		      </FormItem>
		    </Form>
		  </div>
	  )
	}
}
const Login =Form.create()(NormalLoginForm);

const mapStateToProps=(state)=>{
	return{
		isFetching:state.get('login').get('isFetching')
	}
}
//映射
const mapDispatchToProps=(dispatch)=>{
	return {
		handleLogin:(values)=>{
			// console.log(values)
			const action=actionCreator.getLoginAction(values);
			dispatch(action)
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);