
import { message } from 'antd';//自动跳出来一个提示
import { request,storageUserName } from 'util/ajax.js';
import { ADD_OR_EDIT_PRODUCTS,GET_PRODUCTS,SET_NEW_ORDER,UPDATE_STATUS,GET_EDIT_PRODUCT} from 'api/jiekou.js';
import * as types from './actionTypes.js';

//所属分类
export const getProductCategoryAction=(parentId,sonId)=>{
	
	return {
		type:types.GET_PRODUCT_CATEGORY,
		payload:{
			parentId:parentId,
			sonId:sonId
		}		
	}
}
//获取商品图片
export const getProductImageAction=(Image)=>{
	
	return {
		type:types.GET_PRODUCT_IMAGE,
		payload:{
			Image
		}				
	}
}
//获取商品详情
export const getProductDetailAction=(detail)=>{
	
	return {
		type:types.GET_PRODUCT_DETAIL,
		payload:{
			detail
		}		
	}
}
//提交去请求
const getSubmitRequestAction=()=>{
	return{
		type:types.PRODUCT_SUBMIT_REQUEST
	}
}
//提交完成
const getSubmitDoneAction=()=>{
	return{
		type:types.PRODUCT_SUBMIT_DONE
	}
}
//分页请求
const getPageRequestAction=()=>{
	return{
		type:types.GET_PAGE_REQUEST
	}
}
//分页完成
const getPageDoneAction=()=>{
	return{
		type:types.GET_PAGE_DONE
	}
}
//错误的分类
const getErrorCategory=()=>{
	return{
		type:types.GET_ERROR_CATEGORY
	}
}
//将获取的数据显示在商品列表页面上
const setPageAction=(payload)=>{
	return{
		type:types.SET_PAGE,
		payload
	}
}
//编辑时将数据显示在编辑页面上
const setEditProductsAction=(payload)=>{
	return{
		type:types.SET_EDIT_PRODUCTS,
		payload
	}
}



//提交数据
//由于引进了redux-thunk,所以action可以接收对象
export const handleSubmitDataAction=(err,values)=>{//向后台添加数据
	return (dispatch,getState)=>{//派送时又返回了一个dispatch
		const state=getState().get('product');
		const sonId=state.get('sonId');

		if(!sonId){//没有选择分类就直接返回
			dispatch(getErrorCategory());
			return;
		}
		if(err){
			return
		}
		//发送了请求之前转圈	  
	    dispatch(getSubmitRequestAction());
	    //新增商品
	    let method='post';
	    //编辑商品
	    if(values.id){
	    	method='put';
	    }
	    request({//点击提交发送ajax请求到服务器,去数据库里找对应的数据并返回
	      	method: method,
			url: ADD_OR_EDIT_PRODUCTS,
			data: {
				...values,
				sonId:state.get('sonId'),
				Image:state.get('Image'),
				detail:state.get('detail')
			}
	    })
	    .then((result)=>{//发送成功从后端接收到数据data
	      	// console.log('result....',result)
	    	if(result.code==0){
	    		message.success(result.message);
	    		window.location.href='/product';
	    	}
		    dispatch(getSubmitDoneAction())
	    })
	    .catch((err)=>{
	      	message.error('网络开小差了,请稍后再试..');
		   	//请求完成后就不再转圈(不一定成功但不再转圈了)	  
		   	dispatch(getSubmitDoneAction())
	    })
	}
}


//获取商品列表
//由于引进了redux-thunk,所以action可以接收对象
export const getProductAction=(currentPage)=>{
	return (dispatch)=>{//派送时又返回了一个dispatch
		dispatch(getPageRequestAction())  
	    request({//点击提交发送ajax请求到服务器,去数据库里找对应的数据并返回
	      	method: 'get',
			url: GET_PRODUCTS,
			data: {
				currentPage:currentPage
			}
	    })
	    .then((result)=>{//发送成功从后端接收到数据data
	      	// console.log('result....',result)
	      	if(result.code==0){
	      		dispatch(setPageAction(result.data))
	      	}else{
	      		message.error(result.errmessage)
	      	}
	      	dispatch(getPageDoneAction()) 
	    })
	    .catch((err)=>{
	      	message.error('网络开小差了,请稍后再试..');
	      	dispatch(getPageDoneAction()) 
	    })
	}
}

//更新排序
export const handleOrderAction=(id,newOrder)=>{
	return (dispatch,getState)=>{//派送时又返回了一个dispatch 
		const state=getState().get('product');
	    request({//点击提交发送ajax请求到服务器,去数据库里找对应的数据并返回
	      	method: 'put',
			url: SET_NEW_ORDER,
			data: {
				id:id,
				newOrder:newOrder,
				page:state.get('current')
			}
	    })
	    .then((result)=>{//发送成功从后端接收到数据data
	      	// console.log('result....',result)
	      	if(result.code==0){
	      		dispatch(setPageAction(result.data))
	      	}else{
	      		message.error(result.errmessage)
	      	}
	    })
	    .catch((err)=>{
	      	message.error('网络开小差了,请稍后再试..');
	    })
	}
}

//更新状态
export const handleStatusAction=(id,newStatus)=>{
	return (dispatch,getState)=>{//派送时又返回了一个dispatch 
		const state=getState().get('product');
	    request({//点击提交发送ajax请求到服务器,去数据库里找对应的数据并返回
	      	method: 'put',
			url: UPDATE_STATUS,
			data: {
				id:id,
				newStatus:newStatus,
				page:state.get('current')
			}
	    })
	    .then((result)=>{//发送成功从后端接收到数据data
			//成功后不再刷新页面	      	
	      	if(result.code==0){
	      		message.success(result.message);
	      	}else{
	      		message.error(result.errmessage);
	      		dispatch(setPageAction(result.data))
	      	}
	    })
	    .catch((err)=>{
	      	message.error('网络开小差了,请稍后再试..');
	    })
	}
}

//获取编辑信息并填到框里
export const getEditProductAction=(productId)=>{
	return (dispatch)=>{//派送时又返回了一个dispatch
	    request({//点击提交发送ajax请求到服务器,去数据库里找对应的数据并返回
	      	method: 'get',
			url: GET_EDIT_PRODUCT,
			data:{
				id:productId
			}
	    })
	    .then((result)=>{//发送成功从后端接收到数据data
	      	if(result.code==0){
	      		dispatch(setEditProductsAction(result.data))
	      	}else{
	      		message.error(result.errmessage)
	      	}
	    })
	    .catch((err)=>{
	      	message.error('网络开小差了,请稍后再试..');
	    })
	}
}


















