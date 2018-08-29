import React,{ Component } from 'react';
import { Switch,Route } from 'react-router-dom';

import MyLayout from '../../common/layout/layout.js';
import CategoryAdd from './add.js';
import CategoryList from './list.js';

class Category extends Component{

	render(){
		

		return (

			<Switch>
				<Route path='/category/add' component={ CategoryAdd } ></Route>
				<Route path='/category/:pid?' component={ CategoryList } ></Route>
				{/*支持正则,如果有pid就是/category/pid,如果没有就是/category*/}
				<MyLayout></MyLayout>				
			</Switch>
		)
	}
}


export default Category;
