/**
 * ajax请求的配置
 */
import axios from 'axios';
import { Message } from 'element-ui';

import { BASE_URL } from '@/ts/config';

axios.defaults.baseURL = BASE_URL;

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 60000;
// axios.defaults.transformRequest = [data => qs.stringify(data)];
// axios.defaults.transformRequest = [(data) => {
//   qs.stringify(data);
//   console.log(data);
// }];
// http request拦截器
// axios.interceptors.request.use(
//   (config) => {
//     console.log(config);
//     // if (config.method === 'post')   {
//     //   config.data = qs.stringify(config.data)
//     // }
//     if (config.url !== '/loginValidate') {
//       // 除了登陆以外的所有请求均需验证token
//       if (store.state.authenticationToken) {
//         console.log(store.state.authenticationToken);

//         config.headers.common.Token = store.state.authenticationToken;
//       } else {
//         // token不存在,跳转到登录页面
//         // router.push({
//         //   name: 'login'
//         // })
//       }
//     }
//     return config;
//   },
//   err => Promise.reject(err),
// );
// // http response 拦截器
axios.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response.status === 500) {
      Message.error('系统繁忙请稍后再试!');
      return Promise.reject();
    }
    if (err.response.data.message) {
      Message.error(err.response.data.message);
      return Promise.reject(err.response);
    }
    // Message.error(err.response.statusText);
    return Promise.reject(err.response);
    /* console.log(err);
    if (err.response) {
      switch (err.response.status) {
        case 401: // 验证失败的状态码
          // 用户验证失败,清除当前authentication
          store.commit({
            type: 'chengeAuthenticationToken',
            ...{
              authenticationToken: '',
            },
          });
          break;

        default:
          break;
      }
    } */
  },
);
export default axios;
