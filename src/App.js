import React,{ Component } from 'react';
//引入css
import './App.css';

import Login from './pages/login/zujian.js';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect//自动跳转
} from 'react-router-dom'

//App相当于是一个根组件
class App extends Component{
	render(){
		return(
			<Router>{/*只包含一个*/}	
				<div className='App'>													
					<Route path="/login" component={ Login } />	
				</div>						
			</Router>
		)
	}
}

export default App;