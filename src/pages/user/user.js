import React,{ Component } from 'react';
import { getUserName } from 'util/ajax.js';
import MyLayout from '../../common/layout/layout.js';
import { Table,Pagination  } from 'antd';
 
const columns = [{
  title: '用户名',
  dataIndex: 'username',
  key:'username'
}, {
  title: '是否是管理员',
  dataIndex: 'isAdmin',
  key:'isAdmin',
  render:isAdmin=>(isAdmin ? '是' :'否')
}]

const dataSource = [{
	key:'1',
  username: 'admin',
  isAdmin:true
}, {
	key:'2',
  username: 'test1',
  isAdmin:false
}];

const data=[];
for(var i=0;i<500;i++){
	data.push({
		key:i,
  	username: 'test'+i,
  	isAdmin:false
	})
}

class User extends Component{
	render(){
		return(

			<div className='User'>
				{ 
					//getUserName() 
				}
				<MyLayout>
					<Table 
						dataSource={data} 
						columns={columns}
						pagination={
							{
								defaultCurrent:1,//默认显示第几页
								pageSize:10,//每页显示多少个
								total:500//总共有多少个
							}
						}			
					/>
				</MyLayout>
			</div>
			
		)
	}
}


export default User;