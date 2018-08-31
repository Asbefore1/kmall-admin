import React,{ Component } from 'react';
import { Upload, Icon, Modal } from 'antd';

class UpdateImage extends Component {

    constructor(props){
        super(props);
        this.state={
            previewVisible: false,
            previewImage: '',
            fileList: [],
        };
        this.handlePreview=this.handlePreview.bind(this);
        this.handleCancel=this.handleCancel.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    

    handleCancel(){
        this.setState({ 
            previewVisible: false 
        })
    }

    handlePreview(file){
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange({ fileList }){
        // console.log(fileList)//打印出来是一个数组,上面有一个response方法拿到上传到后台的地址
        this.setState({ 
            fileList 
        },()=>{ //写在回调函数里面      //map遍历数组
            this.props.getFileList(fileList.map((file)=>{//file是数组里面的每一个是对象
                return file.response
            }).join(','))//不加join(',')是数组,加join(',')将数组转化为字符串并用逗号隔开
        })

    }

    render() {
        const { previewVisible, previewImage, fileList } = this.state;

        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload//上传图片会自动触发onPreview和onChange函数
                    action={this.props.action}//自己定义上传的地址
                    listType="picture-card"
                    fileList={fileList}//在handleChange函数里面设置过state之后再使用
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}//this.props.max是最多上传多少张
                    // name={file}//file是发到后台的文件参数名,默认不写的话是file
                    //由于是跨域,上传文件不携带cookie,需要携带cookie用withCredentials
                    //在antdesign的upload上找到
                    withCredentials={ true }
                >
                {fileList.length >= this.props.max ? null : uploadButton}
                </Upload>
                <Modal 
                    visible={previewVisible} 
                    footer={null} 
                    onCancel={this.handleCancel}>
                    <img 
                        alt="example" 
                        style={{ width: '100%' }} 
                        src={previewImage} 
                    />
                </Modal>
            </div>
        );
    }
}

export default UpdateImage;