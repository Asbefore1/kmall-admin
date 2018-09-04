import React,{ Component } from 'react';
import { Switch,Route } from 'react-router-dom';

import MyLayout from '../../common/layout/layout.js';
import ProductSave from './save.js';
import ProductList from './list.js';

class Product extends Component{

	render(){
		return (
			<Route forceRefresh={true}> 	
				<Switch>
					<Route path='/product/save/:productId?' component={ ProductSave } ></Route>
					<Route path='/product/' component={ ProductList } ></Route>
					<MyLayout></MyLayout>				
				</Switch>
			</Route>
		)
	}
}


export default Product;
