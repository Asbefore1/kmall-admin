import React,{ Component } from 'react';
import Simditor from 'Simditor';
import 'Simditor/styles/simditor.css';
import $ from 'jquery';
import './editor.css';
class Editor extends Component{

	constructor(props){
		super(props);
		//让工具栏变得更丰富,有标题等
		this.toolbar=[

			'title',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'fontScale',
			'color',
			'ol',            
			'ul' ,            
			'blockquote',
			'code' ,          
			'table',
			'link',
			'image',
			'hr' ,            
			'indent',
			'outdent',
			'alignment'	
		];
		//设置全局的ajax,保存cookies
		$.ajaxSetup({
			xhrFields:{
				withCredentials:true
			}
		})		
	}
	//组件挂载完成之后去执行
	componentDidMount(){
		this.editor =new Simditor({
	 		// textarea:this.textarea,//拿到的是DM节点
	 		textarea:$(this.textarea),//包装成jquery对象
	 		toolbar:this.toolbar,
	 		//上传图片的路径
	 		upload:{
	 			url:this.props.url,
			    fileKey: 'upload'
	 		}			    	
		})
		this.editor.on('valuechanged',()=>{
			//将子组件中的值传递给父组件(父组件先向子组件传递一个函数)
			this.props.getEditorValue(this.editor.getValue())
		})
	}

	render(){
		
		return(
			<div>
				<textarea
					ref={(textarea)=>{this.textarea=textarea}}//ref获取DOM节点				
				>
				</textarea>
			</div>
		)
	}
}



export default Editor;