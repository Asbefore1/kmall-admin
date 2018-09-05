import React,{ Component } from 'react';
import { Select } from 'antd';
import { request } from 'util/ajax.js';
import { GET_CATEGORIES } from 'api/jiekou.js';


const Option = Select.Option;



class CategorySelector extends Component{
	//初始化
	constructor(props){
		super(props);
		//state用于存储组件内部的数据
		this.state={
			levelOneCategories:[],
			levelOneCategoryId:'',
			levelTwoCategories:[],
			levelTwoCategoryId:'',
			needLoadLevelTwo:false,
			isChanged:false
		}
		this.ChangelevelOneCategories=this.ChangelevelOneCategories.bind(this);
		this.ChangelevelTwoCategories=this.ChangelevelTwoCategories.bind(this);
		// console.log('selector constructor....')
	}
	//在挂载完成后执行这个函数
	componentDidMount(){//组件上的方法,不是this.props.loadlevelOneCategories()
		this.loadlevelOneCategories();
		// console.log('selector componentDidMount....')	
	}

	//用props去更新state,需要返回一个值(return一下),将返回的值和state里面的值做一个合并
	static getDerivedStateFromProps(props, state){
		// console.log('props...',props)
		// console.log('state...',state)
		
		//props里面的父id和state里面的一级分类的id不相等时就改变
		const levelOneCategoryIdChanged=props.EditParentId!=state.levelOneCategoryId;
		const levelTwoCategoryIdChanged=props.EditSonId!=state.levelTwoCategoryId;
		
		//如果分类ID没有改变,就不更新state,不再往下走了
		if(!levelOneCategoryIdChanged && !levelTwoCategoryIdChanged){
			return null;
		}
		
		if(state.isChanged){
			return null
		}

		//只有一级分类
		if(props.EditParentId==0){
			return{
				levelOneCategoryId:props.EditSonId,
				levelTwoCategoryId:'',
				isChanged:true
			}
		}else{//有二级分类
			return{
				levelOneCategoryId:props.EditParentId,
				//这里只是改变state里面的值,还需要把二级分类显示出来
				levelTwoCategoryId:props.EditSonId,
				needLoadLevelTwo:true,
				isChanged:true
			}			
		}
		return null;		
	}
	//把二级分类显示出来
	componentDidUpdate(){
		if(this.state.needLoadLevelTwo){
			//调函数去发送ajax请求
			this.loadlevelTwoCategories();
			this.setState({
				needLoadLevelTwo:false
			})
		}
	}


	//获取一级分类
	loadlevelOneCategories(){
		//发送ajax请求
		request({
			method:'get',
			url:GET_CATEGORIES,
			data:{
				pid:0
			}
		})
		.then(result=>{//获取
			if(result.code==0){
				this.setState({
					levelOneCategories:result.data
				})				
			}
		})
	}

	//选择一级分类处理事件
	ChangelevelOneCategories(value){
		// console.log(value)//获取到一级分类的id
		this.setState({
			levelOneCategoryId:value,
			levelTwoCategories:[],
			levelTwoCategoryId:''
		},()=>{//回调函数
			this.loadlevelTwoCategories();
			this.onValueChange()
		})
	}


	//获取二级分类
	loadlevelTwoCategories(){
		//发送ajax请求
		request({
			method:'get',
			url:GET_CATEGORIES,
			data:{
				pid:this.state.levelOneCategoryId,
			}
		})
		.then(result=>{
			if(result.code==0){
				this.setState({
					levelTwoCategories:result.data
				})				
			}
		})
	}

	//选择二级分类处理事件
	ChangelevelTwoCategories(value){
		this.setState({
			levelTwoCategoryId:value
		},()=>{
			// console.log(this)
			this.onValueChange()
		})
	}

	onValueChange(){
		const { levelOneCategoryId,levelTwoCategoryId }=this.state;

		//如果选择了二级分类
		if(levelTwoCategoryId){
			//改变父组件里面的值就要拿到父组件传过来的函数
			this.props.getCategoryId(levelOneCategoryId,levelTwoCategoryId)
		}else{//只选择一级分类
			//改变父组件里面的值就要拿到父组件传过来的函数
			this.props.getCategoryId(0,levelOneCategoryId)
		}		
	}
	





	render(){

		const {levelOneCategories,levelOneCategoryId,levelTwoCategories,levelTwoCategoryId}=this.state;
		
		const levelOneOptions = levelOneCategories.map(category => <Option key={category._id} value={category._id}>{category.name}</Option>);
		const levelTwoOptions = levelTwoCategories.map(category => <Option key={category._id} value={category._id}>{category.name}</Option>);
		return(
			<div>
				
		        <Select 
			        style={{ width:300 ,marginRight:20 }} 
			        defaultValue={ levelOneCategoryId }
			        value={ levelOneCategoryId }
			        onChange={ this.ChangelevelOneCategories }
		        >
		        {levelOneOptions}
		        </Select>
		        {
		        	levelTwoCategories.length//length是真
		        	?<Select 
			        	defaultValue={ levelTwoCategoryId }
			        	value={ levelTwoCategoryId }
				        style={{ width:300 }} 
				        onChange={ this.ChangelevelTwoCategories }
			        >
			        {levelTwoOptions}
			        </Select>
			        : null
		        }
		        
		        
		    </div>
		)
	}
}

export default CategorySelector;