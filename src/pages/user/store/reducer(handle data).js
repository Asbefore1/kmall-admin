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

//初始化对象
//用fromJS包装一个immutable对象
const defaultState=fromJS({
	isFetching:false,
	current:1,
	pageSize:10,
	total:100,
	list:[]//list是一个数组,也是immutable对象
})

//整个export default导出来了一个函数
export default (state=defaultState,action)=>{
	if(action.type==types.PAGE_REQUEST){
		return state.set('isFetching',true)
	}
	if(action.type==types.PAGE_DONE){
		return state.set('isFetching',false)
	}
	if(action.type==types.SET_PAGE){
		// console.log('before state...',state.get('list'))//List也是一个immutable对象
		return state.merge({//merge可以设置许多参数,可以设置成对象,set只能设置一个
			current:action.payload.current,
			pageSize:action.payload.pageSize,
			total:action.payload.total,
			list:fromJS(action.payload.list)//返回去的时候尽量跟前面定义的一样,返回immutable对象
		})
	}

	return state
}