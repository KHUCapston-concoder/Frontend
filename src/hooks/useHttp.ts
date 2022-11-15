import { Dispatch, SetStateAction, useCallback, useState } from "react";
import axios, {AxiosResponse} from "axios";
import { Http2ServerResponse } from "http2";
interface RequestConfigType {
  url: string;
  data?: Object;
  params?: Object;
  headers?: HeadersInit;
}

axios.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

const requestGet = (url:string) => {
  return axios
    .get(url, {
      headers: {
        withCredentials: true,
      },
    }
  )
}

const requestPost = (url:string, data: any) => {
  return axios.post(url, data);
}

const useHttp = (
  requestConfig: RequestConfigType,
  handleResponse: Function,
  requestFunc: Function
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (data) => {
    setIsLoading(true);
    setError(null);
    const url = "http://163.180.146.59" + requestConfig.url;

    try {
      requestFunc(url, data).then((res:any) => {
        handleResponse(res.data);
      });
    } catch (e) {
      setError(e.message);
    }
    setIsLoading(false);
  }, [isLoading, error, requestConfig]);

  return [isLoading, error, sendRequest];
};

export const useGet = (requestConfig: RequestConfigType, handleResponse: Function) => {
  const [isLoading, error, sendRequest] = useHttp(requestConfig, handleResponse, requestGet);

  return { isLoading, error, sendRequest }
};

export const usePost = (requestConfig: RequestConfigType) => {
  const [isLoading, error, sendRequest] = useHttp(requestConfig, () => {}, requestPost);

  return { isLoading, error, sendRequest }
};
