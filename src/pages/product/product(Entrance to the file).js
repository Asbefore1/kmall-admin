import React,{ Component } from 'react';
import { Switch,Route } from 'react-router-dom';

import MyLayout from '../../common/layout/layout.js';
import ProductSave from './save.js';
import ProductList from './list.js';

class Product extends Component{

	render(){
		return (

			<Switch>
				<Route path='/product/save' component={ ProductSave } ></Route>
				<Route path='/product/' component={ ProductList } ></Route>
				<MyLayout></MyLayout>				
			</Switch>
		)
	}
}


export default Product;
