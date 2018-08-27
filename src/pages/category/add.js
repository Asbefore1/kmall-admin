import React,{ Component } from 'react';
import { Route } from 'react-router-dom';
import { Breadcrumb } from 'antd';

import MyLayout from '../../common/layout/layout.js';

import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends Component{

	render(){
		const { getFieldDecorator } = this.props.form;
    	const { autoCompleteResult } = this.state;

    	const prefixSelector = getFieldDecorator('prefix', {
		      initialValue: '86',
		    })(
		      <Select style={{ width: 70 }}>
		        <Option value="86">+86</Option>
		        <Option value="87">+87</Option>
		      </Select>
	    );


	    const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 8 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 16 },
	      },
	    };
	    const tailFormItemLayout = {
	      wrapperCol: {
	        xs: {
	          span: 24,
	          offset: 0,
	        },
	        sm: {
	          span: 16,
	          offset: 8,
	        },
	      },
	    };
	     
		return (
			<MyLayout>
				<div>
					<Breadcrumb>
			    		<Breadcrumb.Item>分类列表</Breadcrumb.Item>
			    		<Breadcrumb.Item>新增分类</Breadcrumb.Item>
					</Breadcrumb>
					<Form onSubmit={this.handleSubmit}>
				        <FormItem
				          {...formItemLayout}
				          label="E-mail"
				        >
				          {getFieldDecorator('email', {
				            rules: [{
				              type: 'email', message: 'The input is not valid E-mail!',
				            }, {
				              required: true, message: 'Please input your E-mail!',
				            }],
				          })(
				            <Input />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="Password"
				        >
				          {getFieldDecorator('password', {
				            rules: [{
				              required: true, message: 'Please input your password!',
				            }, {
				              validator: this.validateToNextPassword,
				            }],
				          })(
				            <Input type="password" />
				          )}
				        </FormItem>
				    </Form>
				</div>
			</MyLayout>
		)
	}
}

const CategoryAdd = Form.create()(RegistrationForm);





export default CategoryAdd;