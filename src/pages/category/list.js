import React,{ Component } from 'react';
import { Switch,Link } from 'react-router-dom';
import MyLayout from '../../common/layout/layout.js';

class CategoryList extends Component{

	render(){
		return (
			<Switch>
				<MyLayout>
					<Link to='/category/add'>category list....</Link>
				</MyLayout>
			</Switch>
		)
	}
}


export default CategoryList;