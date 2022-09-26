import { BASE_URL, timeout } from "./config";
import { afe1Request } from "./request";

const request_util = new afe1Request({
  baseURL: BASE_URL,
  interceptor: {
    requestOnFulfilled(config) {
      return config;
    },
    responseOnFulfilled(res) {
      return res.data;
    },
  },
  timeout,
});

export { request_util };
