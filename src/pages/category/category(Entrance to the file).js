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
				<Route path='/category' component={ CategoryList } ></Route>

				<MyLayout>
					
				</MyLayout>				
			</Switch>
		)
	}
}


export default Category;
