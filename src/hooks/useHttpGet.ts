import { Dispatch, SetStateAction, useCallback, useState } from "react";
import axios from "axios";
interface RequestConfigType {
  url: string;
  headers?: HeadersInit;
}

axios.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

const useGet = (requestConfig: RequestConfigType, handleResponse: Function) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const url = "http://163.180.146.59" + requestConfig.url;
    
    try {
      axios
        .get(url, {
          headers: {
            withCredentials: true,
          },
        })
        .then((res) => {
          // console.log(res.data);

          handleResponse(res.data);
        });
    } catch (e) {
      setError(e.message);
    }
    setIsLoading(false);
  }, [isLoading, error]);

  return { isLoading, error, sendRequest };
};

export default useGet;
