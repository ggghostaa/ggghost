
/*
 * @Autor: ggghost
 * @Date: 2023/12/25 12:46:16
 * @Description: axios工具类
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosRequestConfig,
    AxiosResponse } from "axios";
import {LStorage} from "../utils/storage";
import {message} from "../components/message/message";


type Result<T> = {
    code: number,
    message: string,
    data: T
}


const baseConfig = {
    //默认url
    baseURL: '',
    //超时时间
    timeout: 6000,
    //跨域允许
    withCredentials: true
}
interface IRequestHttp {
    instance: AxiosInstance,
    get<T = any>(url: string, config?: AxiosRequestConfig) : Promise<Result<T>>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) : Promise<Result<T>>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) : Promise<Result<T>>;
    delete<T = any>(url: string, config?: AxiosRequestConfig) : Promise<Result<T>>;
}

enum RequestStatusCode {
    SUCCESS = 200,
    VOERDUE = 600,
    FAIL = 999
}
class RequestHttp implements IRequestHttp{
    //axios实例
    instance: AxiosInstance;

    constructor(config: AxiosRequestConfig) {
        //实例化axios
        this.instance = axios.create(config);

        /**
         * request请求拦截器
         */
        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                const token = LStorage.get("token") || '';
                config.headers!.Authorization = 'Bearer ' + token;
                return config;
            },
            (err: AxiosError) => {
                return Promise.reject(err);
            }
        );

        /**
         * response 响应拦截器
         */
        this.instance.interceptors.response.use(
            (res: AxiosResponse) => {
                const { data } = res;
                if (data.code && data.code !== RequestStatusCode.SUCCESS) {
                    message.error('非法数据!');
                    return Promise.reject(data);
                }
                return data;
            },
            (err: AxiosError) => {
                const { response } = err;
                if (response) {
                    this.handleCode(response.status);
                }
                if (!window.navigator.onLine) {
                    message.error('系统处于脱机状态!');
                }
                return Promise.reject(response);
            }
        );

    }

    /**
     * 常见http异常状态码处理
     * @param code
     * @private
     */
    private handleCode(code: number) {
        let _message = '';
        switch (code) {
            case 400:
                _message = "请求错误(400)";
                break;
            case 401:
                _message = "未授权，请重新登录(401)";
                break;
            case 403:
                _message = "拒绝访问(403)";
                break;
            case 404:
                _message = "请求出错(404)";
                break;
            case 408:
                _message = "请求超时(408)";
                break;
            case 500:
                _message = "服务器错误(500)";
                break;
            case 501:
                _message = "服务未实现(501)";
                break;
            case 502:
                _message = "网络错误(502)";
                break;
            case 503:
                _message = "服务不可用(503)";
                break;
            case 504:
                _message = "网络超时(504)";
                break;
            case 505:
                _message = "HTTP版本不受支持(505)";
                break;
            default:
                _message = `连接出错(${code})!`;
        }
        message.error(_message);
    }



    get<T = any>(url: string,  config?: AxiosRequestConfig<any> | undefined): Promise<Result<T>> {
        return this.instance.get(url, config);
    }
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any> | undefined): Promise<Result<T>> {
        return this.instance.post(url, data, config);
    }
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig<any> | undefined): Promise<Result<T>> {
        return this.instance.put(url, data, config);
    }
    delete<T = any>(url: string, config?: AxiosRequestConfig<any> | undefined): Promise<Result<T>> {
        return this.instance.delete(url, config);
    }

}
const index = new RequestHttp(baseConfig);
export default index;