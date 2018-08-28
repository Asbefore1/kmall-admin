import axios from 'axios';//发送ajax请求



export const request=(options)=>{
	// console.log('options....',options)
	return new Promise((resolve,reject)=>{
		const params={
			method:options.method || 'get',
			url:options.url || '',
			//客户端向服务器端发送请求携带cookies
			withCredentials: true
		}
		//用params拿到参数page=2
		//switch语句,判断如果是get或delete请求就向params里面添加params:options.data
		//如果是post请求就向params里面添加data:options.data
		switch(params.method.toUpperCase()){
			case 'GET':
			case 'DELETE':
				params.params=options.data	
				break;
			default:
				params.data=options.data
		}
		axios(params)
		.then(result=>{
			// console.log('1::',result)//{data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, …}整个结果是result
			let data=result.data;
			// console.log(data)//{code: 0, errmessage: "", data: {…}}
			if(data.code==10){//等于10代表未登录(既不等于0也不等于1时走到这里面)
				removeUserName();
				window.loaction.href='/login';
				reject(data.errmessage)
			}else{//等于0或等于1时走到这里面
				// console.log('1::',data)
				resolve(data)				
			}			
		})
		.catch(err=>{
			reject(err)
		})
	})
}

export const storageUserName=(username)=>{
	window.localStorage.setItem('username',username)//键和值
}
export const getUserName=(username)=>{
	return window.localStorage.getItem('username')
}
export const removeUserName=(username)=>{
	window.localStorage.removeItem('username')
}