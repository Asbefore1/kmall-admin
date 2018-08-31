import React,{ Component } from 'react';
import Simditor from 'Simditor';
import 'Simditor/styles/simditor.css';
import $ from 'jquery';
import './editor.css';
class Editor extends Component{

	constructor(props){
		super(props);
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

	componentDidMount(){
		this.editor =new Simditor({
	 		textarea:this.textarea,
	 		toolbar:this.toolbar,
	 		upload:{
	 			url:this.props.url,
			    fileKey: 'upload'
	 		}			    	
		})
		this.editor.on('valuechanged',()=>{
			this.props.getEditorValue(this.editor.getValue())
		})
	}

	render(){
		
		return(
			<div>
				<textarea
					ref={(textarea)=>{this.textarea=textarea}}				
				>
				</textarea>
			</div>
		)
	}
}



export default Editor;