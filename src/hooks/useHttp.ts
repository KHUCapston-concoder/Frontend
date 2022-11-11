import { Dispatch, SetStateAction, useState } from "react";

interface RequestConfigType {
  requestConfig: {
    url: string;
    method: string;
    headers?: HeadersInit;
    body?: string;
  };
  handleResponse?: Function;
}

const useHttp = ({ requestConfig, handleResponse }: RequestConfigType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async () => {
    setIsLoading(true);
    setError(null);
    // const url = process.env.REACT_API_HOST + requestConfig.url;
    const url = "http://43.200.230.132" + requestConfig.url;

    try {
      const response = await fetch(url, {
        method: requestConfig.method,
        headers: requestConfig.headers || {},
        body: JSON.stringify(requestConfig.body),
        mode: "no-cors",
      });

      if (!response.ok) {
        throw new Error("Request Failed");
      }
    } catch (e) {
      setError(e.message);
    }
    setIsLoading(false);
  };
  return { isLoading, error, sendRequest };
};

export default useHttp;
