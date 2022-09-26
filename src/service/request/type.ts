import { AxiosRequestConfig, AxiosResponse } from "axios";

interface interceptor {
  requestOnFulfilled?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestOnRejected?: (err: any) => any;
  responseOnFulfilled?: (config: AxiosResponse) => AxiosResponse;
  responseOnRejected?: (err: any) => any;
}

interface afe1RequestConfig extends AxiosRequestConfig {
  interceptor?: interceptor;
  showLoading?: boolean;
}

export type { afe1RequestConfig, interceptor };
