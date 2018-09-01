
import { message } from 'antd';//自动跳出来一个提示
import { request,storageUserName } from 'util/ajax.js';
import { ADD_PRODUCT,GET_CATEGORIES,GET_PAGE_REQUEST,GET_PAGE_DONE,HANDLE_OK} from 'api/jiekou.js';
import * as types from './actionTypes.js';


export const getProductCategoryAction=(parentId,sonId)=>{
	
	return {
		type:types.GET_PRODUCT_CATEGORY,
		payload:{
			parentId:parentId,
			sonId:sonId
		}		
	}
}

export const getProductImageAction=(Image)=>{
	
	return {
		type:types.GET_PRODUCT_IMAGE,
		payload:{
			Image
		}				
	}
}
export const getProductDetailAction=(detail)=>{
	
	return {
		type:types.GET_PRODUCT_DETAIL,
		payload:{
			detail
		}		
	}
}
const getSubmitRequestAction=()=>{
	return{
		type:types.PRODUCT_SUBMIT_REQUEST
	}
}
const getSubmitDoneAction=()=>{
	return{
		type:types.PRODUCT_SUBMIT_DONE
	}
}
const getPageRequestAction=()=>{
	return{
		type:types.GET_PAGE_REQUEST
	}
}
const getPageDoneAction=()=>{
	return{
		type:types.GET_PAGE_DONE
	}
}
const getErrorCategory=()=>{
	return{
		type:types.GET_ERROR_CATEGORY
	}
}
const getAllProductData=(payload)=>{
	return{
		type:types.GET_ALL_PRODUCT_DATA,
		payload
	}
}

//由于引进了redux-thunk,所以action可以接收对象
export const handleSubmitAllAction=(err,values)=>{//向后台添加数据
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
	    request({//点击提交发送ajax请求到服务器,去数据库里找对应的数据并返回
	      	method: 'post',
			url: ADD_PRODUCT,
			data: {
				...values,
				sonId:state.get('sonId'),
				Image:state.get('Image'),
				detail:state.get('detail')
			}
	    })
	    .then((result)=>{//发送成功从后端接收到数据data
	      	// console.log('result....',result)
	      	dispatch(getAllProductData(result.data))
	      	//请求完成后就不再转圈(不一定成功但不再转圈了)       
		    dispatch(getSubmitDoneAction())
	    })
	    .catch((err)=>{
	      	message.error('网络开小差了,请稍后再试..');
		   	//请求完成后就不再转圈(不一定成功但不再转圈了)	  
		   	dispatch(getSubmitDoneAction())
	    })
	}
}

















const setPageAction=(payload)=>{
	return{
		type:types.SET_PAGE,
		payload
	}
}



//由于引进了redux-thunk,所以action可以接收对象
export const getPageAction=(pid,currentPage)=>{
	return (dispatch)=>{//派送时又返回了一个dispatch
		dispatch(getPageRequestAction())  
	    request({//点击提交发送ajax请求到服务器,去数据库里找对应的数据并返回
	      	method: 'get',
			url: GET_CATEGORIES,
			data: {
				pid:pid,
				currentPage:currentPage
			}
	    })
	    .then((result)=>{//发送成功从后端接收到数据data
	      	// console.log('result....',result)
	      	if(result.code==0){
	      		dispatch(setPageAction(result.data))
	      	}else{
	      		message.error(result.errmessage);
	      	}
	      	dispatch(getPageDoneAction()) 
	    })
	    .catch((err)=>{
	      	message.error('网络开小差了,请稍后再试..');
	      	dispatch(getPageDoneAction()) 
	    })
	}
}

export const handleOkAction=(pid)=>{
	return (dispatch,getState)=>{//getState用来获取到store上的state
		const state=getState().get('category');
		
	    request({//点击提交发送ajax请求到服务器,去数据库里找对应的数据并返回
	      	method: 'put',
			url: HANDLE_OK,
			data: {
				updateId:state.get('updateId'),
				updateName:state.get('updateName'),
				pid:pid,
				currentPage:state.get('current')
			}
	    })
	    .then((result)=>{//发送成功从后端接收到数据data
	      	console.log('result....',result.data)  	
	      	if(result.code==0){
	      		dispatch(setPageAction(result.data)) 
	      		message.success('更新成功');	 
	      		dispatch(handleCancelModalAction())  
	      	}else{
	      		message.error(result.errmessage);
	      	}
	      	
	    })
	    .catch((err)=>{
	      	message.error('网络开小差了,请稍后再试..');
	    })
	}
}