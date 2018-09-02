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

	parentId:'',
	sonId:'',
	Image:'',
	detail:'',
	isProductSubmitFetching:false,
	categoryValidateStatus:'',
	categoryHelp:'',
	current:0,
	pageSize:0,
	total:0,
	list:[],//list是一个数组,也是immutable对象,
	isPageFetching:false,	
})




//整个export default导出来了一个函数
export default (state=defaultState,action)=>{

	if(action.type==types.GET_PRODUCT_CATEGORY){
		// console.log(action.payload.parentId,action.payload.sonId)
		return state.merge({//merge可以设置许多参数,可以设置成对象,set只能设置一个
			parentId:action.payload.parentId,
			sonId:action.payload.sonId,
			categoryValidateStatus:'',
			categoryHelp:''
		})
	}
	if(action.type==types.GET_PRODUCT_IMAGE){
		return state.set('Image',action.payload.Image)
	}
	if(action.type==types.GET_PRODUCT_DETAIL){
		return state.set('detail',action.payload.detail)
	}
	if(action.type==types.PRODUCT_SUBMIT_REQUEST){
		return state.set('isProductSubmitFetching',true)
	}
	if(action.type==types.PRODUCT_SUBMIT_DONE){
		return state.set('isProductSubmitFetching',false)
	}
	if(action.type==types.GET_ERROR_CATEGORY){
		return state.merge({//merge可以设置许多参数,可以设置成对象,set只能设置一个
			categoryValidateStatus:'error',
			categoryHelp:'请选择所属分类'
		})	
	}
	if(action.type==types.GET_ALL_PRODUCT_DATA){
		console.log('1:::',action.payload.list)
		return state.merge({//merge可以设置许多参数,可以设置成对象,set只能设置一个
			current:action.payload.current,
			pageSize:action.payload.pageSize,
			total:action.payload.total,
			list:action.payload.list
		})	
	}







	if(action.type==types.ADD_REQUEST){
		return state.set('isAddFetching',true)
	}
	if(action.type==types.ADD_DONE){
		return state.set('isAddFetching',false)
	}
	if(action.type==types.SET_LEVEL_ONE_CATEGORIES){
		return state.set('levelOneCategories',fromJS(action.payload))
	}

	if(action.type==types.GET_PAGE_REQUEST){
		return state.set('isPageFetching',true)
	}
	if(action.type==types.GET_PAGE_DONE){
		return state.set('isPageFetching',false)
	}

	if(action.type==types.HANDLE_CANCEL_MODAL){
		return state.set('UpdateVisible',false)
	}

	if(action.type==types.SET_PAGE){
		return state.merge({//merge可以设置许多参数,可以设置成对象,set只能设置一个
			current:action.payload.current,
			pageSize:action.payload.pageSize,
			total:action.payload.total,
			list:fromJS(action.payload.list)//返回去的时候尽量跟前面定义的一样,返回immutable对象
		})
	}

	if(action.type==types.SHOW_UPDATE_MODAL){
		return state.merge({//merge可以设置许多参数,可以设置成对象,set只能设置一个
			UpdateVisible:true,
			updateId:action.payload.updateId,
			updateName:action.payload.updateName
		})		
	}

	if(action.type==types.HANDLE_NEW_NAME){
		return state.set('updateName',action.payload)
	}

	return state
}