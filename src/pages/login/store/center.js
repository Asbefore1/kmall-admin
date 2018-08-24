//将文件做了导入导出,相当于一个中转站,避免了文件的多次引入

//使用*是由于actionCreator导出了多个
import * as actionCreator from './actionCreator(xuqiu).js';
//引入reducer是由于reducer只导出了一个,就不使用*了
import reducer from './reducer(handle data).js';

//导出,由于导出多个,就需要写{}
export { reducer,actionCreator }