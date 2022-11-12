import { Dispatch, SetStateAction, useCallback, useState } from "react";
import axios from "axios";
interface RequestConfigType {
  requestConfig: {
    url: string;
    headers?: HeadersInit;
  };
  handleResponse: Function;
}

const useGet = ({ requestConfig, handleResponse }: RequestConfigType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    // const url = process.env.REACT_API_HOST + requestConfig.url;
    const url = "http://43.200.230.132" + requestConfig.url;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: requestConfig.headers || {},
        mode: "no-cors",
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = response.json();
      console.log(JSON.stringify(data));

      handleResponse(data);
    } catch (e) {
      setError(e.message);
    }
    setIsLoading(false);
  }, [isLoading, error]);

  return { isLoading, error, sendRequest };
};

export default useGet;
