//引入所有的reducer(合并reducer)然后返回一个reducer
import { combineReducers } from 'redux-immutable';

//由于store中的index中导出了多个,引入过来时也要加上{},
//表示从多个中引入的,同时又起了一个别名
//指代这个reducer是todolist里面的reducer
import { reducer as loginReducer } from 'pages/login/store/center.js';
import { reducer as homeReducer } from 'pages/home/store/center.js';

export default combineReducers({//导出reducer
	//又把todolistReducer名字换成todolist,将其导出
	login:loginReducer,
	home:homeReducer
})