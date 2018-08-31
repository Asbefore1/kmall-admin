import React,{ Component } from 'react';
import { Route } from 'react-router-dom';
import MyLayout from 'common/layout/layout.js';
import { actionCreator } from './store/center.js';

import { Breadcrumb,Button,Form, Input,Row, Col,Select } from 'antd';
import { connect } from 'react-redux';





const FormItem = Form.Item;
const Option = Select.Option;

//组件
class NormalCategoryAdd extends Component{
	//constructor是自动执行的
	constructor(props){
		super(props);
		this.handleSubmit=this.handleSubmit.bind(this)
	}
	//也是自动执行的
	componentDidMount(){
		this.props.handleLevelOneCategories()
	}

	handleSubmit(e){
	  	this.props.form.validateFields((err, values) => {//获取到前台输入的内容
		    // console.log(values)//values是分类名称和分类层级
		    if (!err) {	
			   this.props.handleAddCategory(values)
		    }
		})
	}

	render(){
		const { getFieldDecorator } = this.props.form;

		//分类名称
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
	    //分类层级
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
					<Form>
				        <FormItem
				          {...formItemLayout}				          
				          label="分类名称"
				        >
				          {getFieldDecorator('name', {
				            rules: [{
				              required: true, message: '请输入分类的名称',
				            }],
				          })(
				            <Input />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="父级分类"
				        >
				          {getFieldDecorator('pid', {
				            rules: [{
				              required: true, message: '请选择父级分类',
				            }],
				          })(
				            <Select initialValue="0" style={{ width: 300 }}>
						      	<Option value="0">根分类</Option>
						      	{
						      		this.props.levelOneCategories.map((category)=>{
						      			// console.log(category)
						      			return <Option key={ category.get('_id')} value={ category.get('_id')} >根分类/{ category.get('name') }</Option>
						      		})
						      	}
						    </Select>
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

const CategoryAdd=Form.create()(NormalCategoryAdd);

const mapStateToProps=(state)=>{
	return{
		isAddFetching:state.get('category').get('isAddFetching'),
		levelOneCategories:state.get('category').get('levelOneCategories')
	}
}

//映射
const mapDispatchToProps=(dispatch)=>{
	return {
		//向后台添加数据派发action
		handleAddCategory:(values)=>{
			// console.log(values)
			const action=actionCreator.getAddCategoryAction(values);
			dispatch(action)
		},
		handleLevelOneCategories:()=>{
			const action=actionCreator.handleLevelOneCategoriesAction();
			dispatch(action)
		}
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(CategoryAdd);