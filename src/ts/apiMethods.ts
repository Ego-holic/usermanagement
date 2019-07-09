import { AxiosResponse } from 'axios';
import http from '@/ts/http';
import qs from 'qs';

export function get<ReqT, ResT>(url: string, reqData?: ReqT, config?: any) {
  let params: any = reqData;
  if (reqData !== undefined) {
    Object.assign(params, reqData, { _t: new Date().getTime() });
  } else {
    params = { _t: new Date().getTime() };
  }
  return new Promise(((resolve: (resData: ResT) => any, reject) => {
    http.get(`${url}?${qs.stringify(params)}`, config).then((resData: AxiosResponse<ResT>) => {
      resolve(resData.data);
    }).catch((resData) => {
      reject(resData);
    });
  }));
}
export function post<ReqT, ResT>(url: string, reqData: ReqT, config?: any) {
  return new Promise(((resolve: (resData: ResT) => any, reject) => {
    http.post(url, reqData, config).then((resData: AxiosResponse<ResT>) => {
      resolve(resData.data);
    }).catch((resData) => {
      reject(resData);
    });
  }));
}
export function put<ReqT, ResT>(url: string, reqData?: ReqT, config?: any) {
  return new Promise(((resolve: (resData: ResT) => any, reject) => {
    http.put(url, reqData).then((resData: AxiosResponse<ResT>) => {
      resolve(resData.data);
    }).catch((resData) => {
      reject(resData);
    });
  }));
}
export function del<ReqT, ResT>(url: string, reqData?: ReqT, config?: any) {
  return new Promise(((resolve: (resData: ResT) => any, reject) => {
    http.delete(url, { params: reqData }).then((resData: AxiosResponse<ResT>) => {
      resolve(resData.data);
    }).catch((resData) => {
      reject(resData);
    });
  }));
}
