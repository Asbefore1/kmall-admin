const SERVER='http://127.0.0.1:3001/';

export const ADMIN_LOGIN=SERVER+'admin/login';
export const ADMIN_COUNT=SERVER+'admin/count';
export const USER_LOGOUT=SERVER+'user/logout';
//用户列表里面获取用户
export const GET_USERS=SERVER+'admin/users';
//向分类层级里面添加种类,也是向数据库里面插入数据
export const ADD_CATEGORY=SERVER+'category';
//查找分类并添加到根分类下
export const GET_CATEGORIES=SERVER+'category';
