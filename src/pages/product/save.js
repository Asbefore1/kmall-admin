import React,{ Component } from 'react';
import MyLayout from '../../common/layout/layout.js';
import { Breadcrumb,Form,Input,Button,Select  } from 'antd';
import { connect } from 'react-redux';




const FormItem = Form.Item;
const Option = Select.Option;




class NormalProductSave extends Component{

	constructor(props){
    	super(props);
    }


	render(){

		const { getFieldDecorator } = this.props.form;

		//分类名称
	    const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 2 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 22 },
	      },
	    };
	    //分类层级
	    const tailFormItemLayout = {
	      wrapperCol: {
	        xs: {
	          span: 24,
	          offset: 0,
	        },
	        sm: {
	          span: 16,
	          offset:2,
	        },
	      },
	    };

		return(
			<MyLayout>
				<div>
					<Breadcrumb>
		    			<Breadcrumb.Item>商品管理</Breadcrumb.Item>
		    			<Breadcrumb.Item>添加商品</Breadcrumb.Item>
					</Breadcrumb>
					<Form>
				        <FormItem
				          {...formItemLayout}				          
				          label="商品名称"
				        >
				          {getFieldDecorator('name', {
				            rules: [{
				              required: true, message: '商品名称',
				            }],
				          })(
				            <Input />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品描述"
				        >
				          {getFieldDecorator('pid', {
				            rules: [{
				              required: true, message: '商品描述',
				            }],
				          })(
				           	<Input />
				          )}
				        </FormItem>
				        <div>
					        <Select 
					        	style={{ width: 90 }} 
					        	onChange={this.handleOneLevelCategories}
					        >
					        </Select>
					        <Select 
					        	style={{ width: 90 }} 
					        	onChange={this.handleTwoLevelCategories}>
					        </Select>
					    </div>
				        <FormItem
				          {...formItemLayout}
				          label="商品价格"
				        >
				          {getFieldDecorator('price', {
				            rules: [{
				              required: true, message: '商品价格',
				            }],
				          })(
				           	<Input  />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品库存"
				        >
				          {getFieldDecorator('pid', {
				            rules: [{
				              required: true, message: '商品库存',
				            }],
				          })(
				           	<Input />
				          )}
				        </FormItem>
				        <FormItem {...tailFormItemLayout}>
				          	<Button 
				          		type="primary" 
				          		onClick={ this.handleSubmit }
				          		loading={this.props.isAddFetching}
				          	>
				          		提交
				          	</Button>
				        </FormItem>

				    </Form>
				</div>
			</MyLayout>
		)
	}
}
const CategoryAdd=Form.create()(NormalProductSave);

export default connect(null,null)(CategoryAdd);