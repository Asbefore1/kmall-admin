import React,{ Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './index.css';
const FormItem = Form.Item;
const axios = require('axios');

class NormalLoginForm extends React.Component {
	constructor(props){
		super(props);
		this.handleSubmit=this.handleSubmit.bind(this)
	}
	handleSubmit (e){
	  e.preventDefault();//阻止默认行为就会往下走
	  this.props.form.validateFields((err, values) => {
	    if (!err) {
	      axios({
	      	method: 'get',
				  url: 'http://127.0.0.1:3001/admin/login',
				  data: {
				    firstName: 'Fred',
				    lastName: 'Flintstone'
				  }
	      })
	      .then((data)=>{
	      	console.log(data)
	      })
	      .catch((err)=>{
	      	console.log(err)
	      })
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
		        	loading='false'
		        >
		       	登录
		        </Button>     
		      </FormItem>
		   