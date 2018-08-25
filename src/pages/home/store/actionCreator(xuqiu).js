
import { message } from 'antd';
import { request,storageUserName } from 'util/ajax.js';
import { ADMIN_COUNT } from 'api/jiekou.js';
import * as types from './actionTypes.js';

const setCountAction=()=>{
	return{
		type:types.SET_COUNT
	}
}


//由于引进了redux-thunk,所以action可以接收对象
export const getCountAction=()=>{
	return (dispatch)=>{//派送时又返回了一个dispatch  	
	    request({//点击提交发送ajax请求到服务器,去数据库里找对应的数据并返回
			url: ADMIN_COUNT,
	    })
	    .then((result)=>{//发送成功从后端接收到数据data
	      	// console.log(result)//{code: 0, errmessage: "", data: {…}}
	      	if(result.code==0){//等于0时发送ajax成功,并且成功找到数据
	      		dispatch(setCountAction())
	      	}else if(result.code==1){//等于1时发送ajax成功,但没找到数据
	      		message.error(result.errmessage)
	      	}
	    })
	    .catch((err)=>{
	      	message.error('网络开小差了,请稍后再试..'); 
	    })
	}
}