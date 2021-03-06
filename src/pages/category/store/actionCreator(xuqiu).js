
import { message } from 'antd';//自动跳出来一个提示
import { request,storageUserName } from 'util/ajax.js';
import { ADD_CATEGORY,GET_CATEGORIES,GET_PAGE_REQUEST,GET_PAGE_DONE,HANDLE_OK,UPDATE_ORDER} from 'api/jiekou.js';
import * as types from './actionTypes.js';

const getAddRequestAction=()=>{
	return{
		type:types.ADD_REQUEST
	}
}
const getAddDoneAction=()=>{
	return{
		type:types.ADD_DONE
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

const setLevelOneCategories=(payload)=>{
	return{
		type:types.SET_LEVEL_ONE_CATEGORIES,
		payload
	}	
}
const setPageAction=(payload)=>{
	return{
		type:types.SET_PAGE,
		payload
	}
}
export const handleCancelModalAction=()=>{
	return{
		type:types.HANDLE_CANCEL_MODAL
	}
}
export const showUpdateModalAction=(updateId,updateName)=>{
	
	return {
		type:types.SHOW_UPDATE_MODAL,
		payload:{
			updateId:updateId,
			updateName:updateName
		}		
	}
}
export const handleNewNameAction=(payload)=>{
	return{
		type:types.HANDLE_NEW_NAME,
		payload
	}
}



//由于引进了redux-thunk,所以action可以接收对象
export const getAddCategoryAction=(values)=>{//向后台添加数据
	return (dispatch)=>{//派送时又返回了一个dispatch
		//发送了请求之后就不再转圈	  
	    dispatch(getAddRequestAction())  	
	    request({//点击提交发送ajax请求到服务器,去数据库里找对应的数据并返回
	      	method: 'post',
			url: ADD_CATEGORY,
			data: values
	    })
	    .then((result)=>{//发送成功从后端接收到数据data
	      	// console.log('result....',result)
	      	if(result.code==0){
	      		// console.log(result.data)
	      		if(result.data){//如果有data的话就走这步,重新更新一级分类,分类层级就会自动更新数据,不用刷新
	      			//如果添加的是一级分类,重新更新一级分类
	      			dispatch(setLevelOneCategories(result.data))
	      		} 
	      		//没有data的话就直接显示添加数据成功
	      		message.success('添加数据成功');     		
	      	}else{
	      		message.error(result.errmessage);
	      	}
	      	//请求完成后就不再转圈(不一定成功但不再转圈了)       
		    dispatch(getAddDoneAction())
	    })
	    .catch((err)=>{
	      	message.error('网络开小差了,请稍后再试..');
		   	//请求完成后就不再转圈(不一定成功但不再转圈了)	  
		   	dispatch(getAddDoneAction())
	    })
	}
}



//由于引进了redux-thunk,所以action可以接收对象
export const handleLevelOneCategoriesAction=()=>{
	return (dispatch)=>{//派送时又返回了一个dispatch	
	    request({//点击提交发送ajax请求到服务器,去数据库里找对应的数据并返回
	      	method: 'get',
			url: GET_CATEGORIES,
			data: {
				pid:0
			}
	    })
	    .then((result)=>{//发送成功从后端接收到数据data
	      	// console.log(result)
	      	if(result.code==0){
	      		// console.log(result)
	      		dispatch(setLevelOneCategories(result.data))
	      	}else{
	      		message.error(result.errmessage);
	      	}
	    })
	    .catch((err)=>{
	      	message.error('网络开小差了,请稍后再试..');
	    })
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

//更新排序
export const handleCategoryOrderAction=(pid,id,newOrder)=>{
	return (dispatch,getState)=>{//派送时又返回了一个dispatch 
		const state=getState().get('category');
	    request({//点击提交发送ajax请求到服务器,去数据库里找对应的数据并返回
	      	method: 'put',
			url: UPDATE_ORDER,
			data: {
				id:id,
				newOrder:newOrder,
				pid:pid,
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