import axios from 'axios';//发送ajax请求
import { message } from 'antd';
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
	    axios({//点击提交发送ajax请求到服务器,去数据库里找对应的数据并返回
	      	method: 'post',
			url: 'http://127.0.0.1:3001/admin/login',
			data: values
	    })
	    .then((result)=>{//发送成功从后端接收到数据result(code:0,errmessage:'',data: { username: 'admin' })
	      	// console.log(result)//{data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, …}整个结果是result
	      	let data=result.data;
	      	if(data.code==0){
	      		window.location.href='/'
	      	}else if(data.code==10){
	      		message.error(data.errmessage)
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