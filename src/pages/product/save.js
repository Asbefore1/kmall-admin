import React,{ Component } from 'react';
import MyLayout from 'common/layout/layout.js';
import { Breadcrumb,Form,Input,Button,Select ,InputNumber } from 'antd';
import UpdateImage from 'common/update-image/image.js';
import { connect } from 'react-redux';
//Editor是商品详情(使用Simditor富文本编辑器)
import Editor from 'common/editor/editor.js';
//所属分类联动选择分类(单独作为一个组件进入进来)
import CategorySelector from './category-selector.js';

import { GET_IMAGE_URL,UPLOAD_IMAGE } from 'api/jiekou.js';
const FormItem = Form.Item;
const Option = Select.Option;

//组件
class NormalProductSave extends Component{

	constructor(props){
    	super(props);
    }


	render(){

		const { getFieldDecorator } = this.props.form;

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
					{
			         	//商品名称
			        }
				        <FormItem
				          {...formItemLayout}				          
				          label="商品名称"
				        >
				          {getFieldDecorator('name', {
				            rules: [{
				              required: true, message: '请输入商品名称',
				            }],
				          })(
				            <Input 
				            	style={{width:300}}
				            	placeholder='商品名称'
				            />
				          )}
				        </FormItem>
			        {
			         	//商品描述
			        }
				        <FormItem
				          {...formItemLayout}
				          label="商品描述"
				        >
				          {getFieldDecorator('pid', {
				            rules: [{
				              required: true, message: '请输入商品描述',
				            }],
				          })(
				           	<Input 
				            	placeholder='商品描述'
				           	/>
				          )}
				        </FormItem>
			        {
			         	//所属分类,getCategoryId是子组件要改变父组件的值,需要父组件向子组件传一个函数
			        }
				        <FormItem
				          {...formItemLayout}
				          label="所属分类"
				        >
				        <CategorySelector 
				        	//getCategoryId是从子组件里面拿出来的数据
				         	//由于子组件更改了父组件的数据,父组件需要向子组件传递一个函数
				        	getCategoryId={(parentId,sonId)=>{
				        		// console.log(parentId,sonId)
				        	}}
				        />
				        </FormItem>
			        {
			         	//商品价格
			        }
				        <FormItem
				          {...formItemLayout}
				          label="商品价格"
				        >
				          {getFieldDecorator('price', {
				            rules: [{
				              required: true, message: '请输入商品价格',
				            }],
				          })(
				           	<InputNumber 
				           		initialValue={0}
							    min={0}
							    formatter={value => `${value}元`}
							    parser={value => value.replace('元', '')}
				           	/>
				          )}
				        </FormItem>
			        {
			         	//商品库存
			        }
				        <FormItem
				          {...formItemLayout}
				          label="商品库存"
				        >
				          {getFieldDecorator('pid', {
				            rules: [{
				              required: true, message: '商品库存',
				            }],
				          })(
				           	<InputNumber 
				           		initialValue={0}
							    min={0}
							    formatter={value => `${value}件`}
							    parser={value => value.replace('件', '')}
				           	/>
				          )}
				        </FormItem>
				        {
				         	//商品图片中的action用来指定路径
				        }
				        <FormItem
					        {...formItemLayout}
					        label="商品图片"
				        >
				         	<UpdateImage 
				         		action={ UPLOAD_IMAGE }
				         		max={3}
				         		//getFileList是从子组件里面拿出来的数据
				         		//由于子组件更改了父组件的数据,父组件需要向子组件传递一个函数
				         		getFileList={(fileList)=>{
				         			// console.log('save::::',fileList)
				         		}}
				          	/>
				        </FormItem>
			        {
			         	//商品详情
			        }
				        <FormItem
				          {...formItemLayout}
				          label="商品详情"
				        >		
					       	<Editor  
					       		url={ GET_IMAGE_URL }
					       		getEditorValue={(value)=>{
					       			console.log(value)
					       		}}
					       	/>		   
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
const ProductSave=Form.create()(NormalProductSave);

export default connect(null,null)(ProductSave);