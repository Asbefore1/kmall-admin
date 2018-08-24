//入口文件

//引入reducer和store,中间件
import reducer from './reducer.js' ;

import { createStore,applyMiddleware  } from 'redux';

import { createLogger } from 'redux-logger';//中间件来处理调试信息

import thunk from 'redux-thunk';//中间件来处理派送函数

const middleware=[thunk];

if(process.env.NODE_ENV != 'production'){
	const logger = createLogger({});//调用
	middleware.push(logger);
}

//只能有一个store
const store=createStore(reducer,applyMiddleware(...middleware));


export default store;