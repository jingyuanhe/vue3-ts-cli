import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { HYRequestConfig, HYRequestInterceptors } from './type';
import { ElLoading } from 'element-plus';
import type { LoadingInstance } from 'element-plus/lib/components/loading/src/loading.js';
const DEFAULT_LOADING = true;
export default class HYRequest {
  instance: AxiosInstance;
  interceptors?: HYRequestInterceptors;
  loading?: LoadingInstance;
  showLoading?: boolean;
  constructor(config: HYRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch,
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch,
    );
    this.instance.interceptors.request.use(
      (config) => {
        this.loading = ElLoading.service({
          lock: true,
          text: 'Loading',
          background: 'rgba(0, 0, 0, 0.7)',
        });
        return config;
      },
      (err) => {
        console.log(2);
        return err;
      },
    );
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close();
        return res.data;
      },
      (err) => {
        this.loading?.close();
        return err;
      },
    );
  }
  request<T>(config: HYRequestConfig): Promise<T> {
    return new Promise((resove, reject) => {
      if (config.showLoading === false) {
        this.showLoading = false;
      }
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          this.showLoading = DEFAULT_LOADING;
          resove(res);
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING;
          reject(err);
        });
    });
  }
  get<T>(config: HYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' });
  }
  post<T>(config: HYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' });
  }
  push<T>(config: HYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PUSH' });
  }
}
