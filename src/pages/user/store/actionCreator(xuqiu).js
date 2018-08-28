
import { message } from 'antd';
import { request,storageUserName } from 'util/ajax.js';
import { GET_USERS } from 'api/jiekou.js';
import * as types from './actionTypes.js';

const getPageRequestAction=()=>{
	return{
		type:types.PAGE_REQUEST
	}
}
const getPageDoneAction=()=>{
	return{
		type:types.PAGE_DONE
	}
}
const setPageAction=(payload)=>{
	return{
		type:types.SET_PAGE,
		payload
	}
}
//由于引进了redux-thunk,所以action可以接收对象
export const getPageAction=(currentPage)=>{
	return (dispatch)=>{//派送时又返回了一个dispatch
		//发送了请求之后就不再转圈	  
	    dispatch(getPageRequestAction())  	
	    request({//点击提交发送ajax请求到服务器,去数据库里找对应的数据并返回
	      	method: 'get',
			url: GET_USERS,
			data:{
				page:currentPage
			}
	    })
	    .then((result)=>{//发送成功从后端接收到数据data
	      	console.log('result...',result)//{code: 0, data: {…}}
	      	//data:{current: 1, pageSize: 6, total: 2, list: Array(2)}
	      	//list:Array(2)
	      		//0:{isAdmin: true, _id: "5b7f7d450b068915f41d4f30", username: "admin", password: "df273ac1b80e76bbfe6673f53f129b2b8c00ada10722c5864ea77ddf566f9e38", __v: 0}
				//1:{isAdmin: true, _id: "5b7f7c430b068915f41d4f2f", username: "admin", password: "df273ac1b80e76bbfe6673f53f129b2b8c00ada10722c5864ea77ddf566f9e38", __v: 0
	      	//请求完成后就不再转圈(不一定成功但不再转圈了) 
	      	if(result.code==0){
	      		dispatch(setPageAction(result.data))
	      	}
		    dispatch(getPageDoneAction())
	    })
	    .catch((err)=>{
	      	message.error('网络开小差了,请稍后再试..');
		   	//请求完成后就不再转圈(不一定成功但不再转圈了)	  
		   	dispatch(getPageDoneAction())
	    })
	}
}