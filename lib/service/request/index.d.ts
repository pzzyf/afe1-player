import { AxiosInstance } from "axios";
import { afe1RequestConfig, interceptor } from "./type";
export declare class afe1Request {
    instance: AxiosInstance;
    interceptor?: interceptor;
    constructor(config: afe1RequestConfig);
    request<T = any>(config: afe1RequestConfig): Promise<T>;
    get<T = any>(config: afe1RequestConfig): Promise<T>;
    post<T = any>(config: afe1RequestConfig): Promise<T>;
    delete<T = any>(config: afe1RequestConfig): Promise<T>;
    put<T = any>(config: afe1RequestConfig): Promise<T>;
}
