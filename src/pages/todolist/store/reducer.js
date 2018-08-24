//reducer相当于一个手册,查找商品对应的货架

//reduce是一个函数,注意点：
//1.并且reducer是一个纯函数(给固定的输入,就会有固定的输出,并且不能改变参数)
//2.reducer负责处理逻辑但不改变数据,数据的改变由store负责
//3.action中的type在整个应用中必须唯一
import * as types from './actionTypes.js';
//immutable是一个数据类型,用于react更新组件
//1.一旦创建就不能再被更改,任何修改或添加删除都会返回一个新的immutable对象
//(理解:做了修改并不会改变原来的,而是把原来的和修改的又重新生成了一个新的immutable)
//2.对象树中一个节点发生改变,只修改这个节点和受它影响的父节点,其他节点则进行共享

//解决效率问题
const { fromJS } = require('immutable');

const defaultState=fromJS({//相当于返回了一个map,map也就是immutable的对象
	value:'',
	list:[]
})

//整个export default导出来了一个函数
export default (state=defaultState,action)=>{
	if(action.type==types.CHANGE_VALUE){
		//深拷贝(效率不高,并且参数不能改)
		/*
		const NewState=JSON.parse(JSON.stringify(state));
		NewState.value=action.payload;

		return NewState
		*/
		//相当于调了map上的set方法,该方法返回了一个新的immutable对象,把它return出去
		return state.set('value',action.payload)
	}

	if(action.type==types.ADD_ITEM){

		/*
		const NewState=JSON.parse(JSON.stringify(state));

		NewState.list.push(state.value);
		NewState.value=''
		return NewState//return之后就结束了本次执行,不会再往下走了
		*/
		const NewList=[...state.get('list'),state.get('value')];
		return state .merge({
			list:NewList,
			value:''
		})
	}

	if(action.type==types.DELETE_ITEM){
		/*
		const NewState=JSON.parse(JSON.stringify(state));

		NewState.list.splice(action.payload,1);

		return NewState//return之后就结束了本次执行,不会再往下走了
		*/
		const NewList=[...state.get('list')];
		NewList.splice(action.payload,1);
		return state.set('list',NewList)
	}

	if(action.type==types.LOAD_INIT_DATA){
		/*
		const NewState=JSON.parse(JSON.stringify(state));

		NewState.list=action.payload;

		return NewState//return之后就结束了本次执行,不会再往下走了
		*/
		return state.set('value',action.payload)
	}


	return state
}