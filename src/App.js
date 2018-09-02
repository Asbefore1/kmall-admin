import React,{ Component } from 'react';
import { getUserName } from 'util/ajax.js';
//引入css
import './App.css';

import Login from 'pages/login/login.js';
import Home from 'pages/home/home.js';
import User from 'pages/user/user.js';
import Category from 'pages/category/category(Entrance to the file).js';
import Product from 'pages/product/product.js';
import Errpage from './common/errpage/errpage.js';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect//自动跳转
} from 'react-router-dom'

//App相当于是一个根组件(容器组件)
class App extends Component{

	render(){

		//自定义组件返回的是一个路由
		const ProtectedRoute = ({component:Component,...rest})=>(
			<Route 
				{...rest}
				render = {props=>(
					getUserName()
					? <Component {...props} />//{/*如果有用户信息则调用Component组件（Home组件）,并将props参数传到组件中*/}
					: <Redirect to="/login" />//{/*如果没有用户信息直接跳转到/login路由下*/}
				)}
			/>
		)
		//自定义路由的另一种写法

		const LoginRoute =({component:Component,...rest})=>{
			if(getUserName()){//有用户信息了就让它直接跳转到首页,也就是根目录下
				return <Redirect to="/" />
			}else{//没有用户信息就让它去登陆的页面
				return <Route {...rest} component={Component} />
			}
		}


		return(
			<Router>{/*只包含一个*/}	
				<div className='App'>
					<Switch>{/*找到一个就不再往下找了*/}												
						<ProtectedRoute exact path="/" component={ Home } />	
						<ProtectedRoute path="/user" component={ User } />	
						<ProtectedRoute path="/category" component={ Category } />	
						<ProtectedRoute path="/product" component={ Product } />	
						<LoginRoute path="/login" component={ Login } />
						{/*没有路由的时候会走到errpage里面*/}	
						<Route  component={ Errpage } />	
					</Switch>
				</div>						
			</Router>
		)
	}
}

export default App;