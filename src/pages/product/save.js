import React,{ Component } from 'react';
import MyLayout from 'common/layout/layout.js';
import { actionCreator } from './store/center.js';
import { GET_IMAGE_URL,UPLOAD_IMAGE } from 'api/jiekou.js';
import UpdateImage from 'common/update-image/image.js';
import { Breadcrumb,Form,Input,Button,Select ,InputNumber } from 'antd';
//所属分类联动选择分类(单独作为一个组件进入进来)
import CategorySelector from './category-selector.js';
//Editor是商品详情(使用Simditor富文本编辑器)
import Editor from 'common/editor/editor.js';
import { connect } from 'react-redux';




const FormItem = Form.Item;
const Option = Select.Option;


//组件
class NormalProductSave extends Component{

	constructor(props){
    	super(props);
    	this.handleSubmit=this.handleSubmit.bind(this);
    	//编辑时拿到id
		// console.log(this.props.match.params.productId)
		this.state={
			productId:this.props.match.params.productId
		}
		console.log('save constructor....')
    }


    componentDidMount(){
    	if(this.state.productId){
    		this.props.getEditProduct(this.state.productId)
    	}
    	console.log('save didMount....')
    }

    handleSubmit(e){
	  	this.props.form.validateFields((err, values) => {//获取到前台输入的内容
		    // console.log('values:::',values)
		   	values.id=this.state.productId;
			this.props.handleSubmitData(err,values)
		})
	}

	render(){//渲染组件
		const {
			EditImage,
			EditDescription,
			EditDetail,
			EditName,
			EditPrice,
			EditParentId,
			EditSonId,
			EditStock
		}=this.props;
		// console.log('g::::',EditImage)
		let fileList=[];
		if(EditImage){
			fileList=EditImage.split(',')
		}
		console.log(fileList)
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
				        <FormItem
				          {...formItemLayout}				          
				          label="商品名称"
				        >
				          {getFieldDecorator('name', {
				            rules: [{
				              required: true, message: '请输入商品名称',
				            }],
				            initialValue: EditName 
				          })(
				            <Input 
				            	style={{width:300}}
				            	placeholder='商品名称'
				            />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品描述"
				        >
				          {getFieldDecorator('description', {
				            rules: [{
				              required: true, message: '请输入商品描述',
				            }],
				            initialValue: EditDescription
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
				          	required={true}
				          	validateStatus={ this.props.categoryValidateStatus }
				          	help={ this.props.categoryHelp }
				        >
				    	{/*将组件引入*/}
				        <CategorySelector 
				        	//getCategoryId是从子组件里面拿出来的数据
				         	//由于子组件更改了父组件的数据,父组件需要向子组件传递一个函数				        	
				        	EditParentId={ EditParentId }
							EditSonId={ EditSonId }
				        	getCategoryId={(parentId,sonId)=>{
				        		// console.log(parentId,sonId)
				        		this.props.getProductCategory(parentId,sonId)
				        	}}
				        />
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品价格"
				        >
				          {getFieldDecorator('price', {
				            rules: [{
				              required: true, message: '请输入商品价格',
				            }],
				            initialValue:EditPrice
				          })(
				           	<InputNumber 
				           		initialValue={0}
							    min={0}
							    formatter={value => `${value}元`}
							    parser={value => value.replace('元', '')}
				           	/>
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品库存"
				        >
				          {getFieldDecorator('stock', {
				            rules: [{
				              required: true, message: '请输入商品库存',
				            }],
				            initialValue: EditStock
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
				         		getFileList={(Image)=>{
				         			// console.log('save::::',Image)
				         			this.props.getProductImage(Image);
				         		}}
				         		EditParentId={EditParentId}
								EditSonId={EditSonId}
				          	/>
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品详情"
				        >		
					       	<Editor  
					       		url={ GET_IMAGE_URL }
				         		//由于子组件更改了父组件的数据,父组件需要向子组件传递一个函数
					       		getEditorValue={(detail)=>{
					       			// console.log(detail)
					       			this.props.getProductDetail(detail);
					       		}}
					       	/>		   
				        </FormItem>				        
				        <FormItem {...tailFormItemLayout}>
				          	<Button 
				          		type="primary" 
				          		onClick={ this.handleSubmit }
				          		loading={this.props.isProductSubmitFetching}
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

const mapStateToProps=(state)=>{
	return{
		isProductSubmitFetching:state.get('product').get('isProductSubmitFetching'),
		categoryValidateStatus:state.get('product').get('categoryValidateStatus'),
		categoryHelp:state.get('product').get('categoryHelp'),
		EditImage:state.get('product').get('EditImage'),
		EditDescription:state.get('product').get('EditDescription'),
		EditDetail:state.get('product').get('EditDetail'),
		EditName:state.get('product').get('EditName'),
		EditPrice:state.get('product').get('EditPrice'),
		EditParentId:state.get('product').get('EditParentId'),
		EditSonId:state.get('product').get('EditSonId'),
		EditStock:state.get('product').get('EditStock')
	}
}

const mapDispatchToProps=(dispatch)=>{
	return{
		getProductCategory:(parentId,sonId)=>{
			const action=actionCreator.getProductCategoryAction(parentId,sonId);
			dispatch(action)
		},
		getProductImage:(Image)=>{
			const action=actionCreator.getProductImageAction(Image);
			dispatch(action)
		},
		getProductDetail:(detail)=>{
			const action=actionCreator.getProductDetailAction(detail);
			dispatch(action)
		},
		handleSubmitData:(err,values)=>{
			const action=actionCreator.handleSubmitDataAction(err,values);
			dispatch(action)
		},
		getEditProduct:(productId)=>{
			const action=actionCreator.getEditProductAction(productId);
			dispatch(action)
		}	
	}
}







export default connect(mapStateToProps,mapDispatchToProps)(ProductSave);