const SERVER='http://127.0.0.1:3001/';

export const ADMIN_LOGIN=SERVER+'admin/login';
export const ADMIN_COUNT=SERVER+'admin/count';
export const USER_LOGOUT=SERVER+'user/logout';
//用户列表里面获取用户
export const GET_USERS=SERVER+'admin/users';


//向分类层级里面添加种类,也是向数据库里面插入数据
export const ADD_CATEGORY=SERVER+'category';
//获取分类并添加到根分类下
export const GET_CATEGORIES=SERVER+'category';
//更新名称
export const HANDLE_OK=SERVER+'category/changeName';
//更新顺序
export const UPDATE_ORDER=SERVER+'category/updateOrder';


//上传图片
export const UPLOAD_IMAGE=SERVER+'product/uploadImage';
//商品详情
export const GET_IMAGE_URL=SERVER+'product/getImageUrl';
//添加商品
export const ADD_OR_EDIT_PRODUCTS=SERVER+'product';
//获取商品
export const GET_PRODUCTS=SERVER+'product';
//更新排序
export const SET_NEW_ORDER=SERVER+'product/setNewOrder';
//更新状态
export const UPDATE_STATUS=SERVER+'product/updateStatus';
//编辑时获取信息
export const GET_EDIT_PRODUCT=SERVER+'product/getEditProduct';


