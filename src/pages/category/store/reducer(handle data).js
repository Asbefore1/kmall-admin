//reducer相当于一个手册,查找商品对应的货架

//reduce是一个函数,注意点：
//1.并且reducer是一个纯函数(给固定的输入,就会有固定的输出,并且不能改变参数)
//2.reducer负责处理逻辑但不改变数据,数据的改变由store负责
//3.action中的type在整个应用中必须唯一

//immutable是一个数据类型,用于react更新组件
//1.一旦创建就不能再被更改,任何修改或添加删除都会返回一个新的immutable对象
//(理解:做了修改并不会改变原来的,而是把原来的和修改的又重新生成了一个新的immutable)
//2.对象树中一个节点发生改变,只修改这个节点和受它影响的父节点,其他节点则进行共享

//解决效率问题
import { fromJS }  from 'immutable';
import * as types from './actionTypes.js';
const defaultState=fromJS({//相当于返回了一个map,map也就是immutable的对象
	isAddFetching:false,
	levelOneCategories:[]
})




//整个export default导出来了一个函数
export default (state=defaultState,action)=>{
	if(action.type==types.ADD_REQUEST){
		return state.set('isAddFetching',true)
	}
	if(action.type==types.ADD_DONE){
		return state.set('isAddFetching',false)
	}
	if(action.type==types.SET_LEVEL_ONE_CATEGORIES){
		return state.set('levelOneCategories',fromJS(action.payload))
	}
	return state
}