import axios from 'axios';//发送ajax请求



export const request=(options)=>{
	return new Promise((resolve,reject)=>{
		axios({
			method:options.method || 'get',
			url:options.url || '',
			data:options.data || null,
			//客户端向服务器端发送请求携带cookies
			withCredentials: true
		})
		.then(result=>{
			// console.log('1::',result)//{data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, …}整个结果是result
			let data=result.data;
			// console.log(data)//{code: 0, errmessage: "", data: {…}}
			if(data.code==10){//等于10代表未登录(既不等于0也不等于1时走到这里面)
				removeUserName();
				window.loaction.href='/login';
				reject(data.errmessage)
			}else{//等于0或等于1时走到这里面
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