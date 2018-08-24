import axios from 'axios';
import * as types from './actionTypes.js';//*引入所有的,as是一个别名

//actionCreator导出了多个对象

export const changeValueAction=(payload)=>{

	return{
		type:types.CHANGE_VALUE,
		// payload:payload  //参数一样时可以省略
		payload
	} 
}
export const addItemAction=()=>{
	return {
		type:types.ADD_ITEM
	}
}
export const deleteItemAction=(payload)=>{
	return {
		type:types.DELETE_ITEM,
		payload
	}
}
export const loadInitDataAction=(payload)=>{
	return {
		type:types.LOAD_INIT_DATA,
		payload
	}
}
export const getInitDataAction=()=>{
	return (dispatch)=>{
		axios
		.get('http://127.0.0.1:3001/')
		.then((data)=>{
			// console.log(data)
			const action=loadInitDataAction(data.data)
			dispatch(action)
		})
	}
}