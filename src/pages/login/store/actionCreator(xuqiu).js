
import { message } from 'antd';
import { request,storageUserName } from 'util/ajax.js';
import { ADMIN_LOGIN } from 'api/jiekou.js';
import * as types from './actionTypes.js';

const getLoginRequestAction=()=>{
	return{
		type:types.LOGIN_REQUEST
	}
}
const getLoginDoneAction=()=>{
	return{
		type:types.LOGIN_DONE
	}
}

//由于引进了redux-thunk,所以action可以接收对象
export const getLoginAction=(values)=>{
	return (dispatch)=>{//派送时又返回了一个dispatch
		//发送了请求之后就不再转圈	  
	    dispatch(getLoginRequestAction())  	
	    request({//点击提交发送ajax请求到服务器,去数据库里找对应的数据并返回
	      	method: 'post',
			url: ADMIN_LOGIN,
			data: values
	    })
	    .then((result)=>{//发送成功从后端接收到数据data
	      	// console.log(result)//{code: 0, errmessage: "", data: {…}}
	      	if(result.code==0){//等于0时发送ajax成功,并且成功找到数据
	      		//在浏览器中存储用户信息
	      		storageUserName(result.data.username)
	      		window.location.href='/'
	      	}else if(result.code==1){//等于1时发送ajax成功,但没找到数据
	      		message.error(result.errmessage)
	      	}
	      	//请求完成后就不再转圈(不一定成功但不再转圈了)       
		    dispatch(getLoginDoneAction())
	    })
	    .catch((err)=>{
	      	message.error('网络开小差了,请稍后再试..');
		   	//请求完成后就不再转圈(不一定成功但不再转圈了)	  
		   	dispatch(getLoginDoneAction())
	    })
	}
}