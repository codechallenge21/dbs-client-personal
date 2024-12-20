import axios, { AxiosRequestConfig, AxiosError, AxiosInstance } from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  __retryCount?: number;
}

const fetcherConfig: ExtendedAxiosRequestConfig = {
  baseURL: "/api/v1",
  timeout: 1000 * 60 * 20,
};

const uploadFetcherConfig: ExtendedAxiosRequestConfig = {
  baseURL: "/api/v1",
  timeout: 0,
  headers: {
    "Content-Type": 'multipart/form-data; charset="utf-8";',
    "X-XSRF-TOKEN": cookies.get("XSRF-TOKEN"),
  },
};

const downloadFetcherConfig: ExtendedAxiosRequestConfig = {
  baseURL: "/api/v1",
  timeout: 0,
  responseType: "blob",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "X-XSRF-TOKEN": cookies.get("XSRF-TOKEN"),
  },
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const applyRetryInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const config = error.config as ExtendedAxiosRequestConfig;
      const { response } = error;
      const maxRetries = 3;
      const retryDelay = 5000;

      // Ensure retryDelay is a static value or comes from a safe, validated source
      if (response?.status === 502) {
        config.__retryCount = config.__retryCount || 0;

        if (config.__retryCount < maxRetries) {
          config.__retryCount += 1;
          // Use a safe method to delay the retry
          await delay(retryDelay);
          return axiosInstance(config);
        }
      }

      return Promise.reject(error);
    }
  );
};

// Create axios instances
const fetcher = axios.create(fetcherConfig);
const uploadFetcher = axios.create(uploadFetcherConfig);
const downloadFetcher = axios.create(downloadFetcherConfig);

// Apply retry interceptor
applyRetryInterceptor(fetcher);
applyRetryInterceptor(uploadFetcher);
applyRetryInterceptor(downloadFetcher);

// Export axios instances
export { fetcher, uploadFetcher, downloadFetcher };
