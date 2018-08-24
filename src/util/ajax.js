import axios from 'axios';//发送ajax请求

export const request=(options)=>{
	return new Promise((resolve,reject)=>{
		axios({
			method:options.method || 'get',
			url:options.url || '',
			data:options.data || null
		})
		.then(result=>{
			resolve(result)
		})
		.catch(err=>{
			reject(err)
		})
	})
}