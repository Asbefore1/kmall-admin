import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import MyLayout from '../../common/layout/layout.js';

class ProductList extends Component{
	render(){
		return(
			<MyLayout>
				<div>
					<Link to='/product/save'>add</Link>
				</div>
			</MyLayout>
		)
	}
}

export default ProductList;