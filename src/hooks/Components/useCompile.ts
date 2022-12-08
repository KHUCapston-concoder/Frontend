import { useContext, useEffect } from "react";
import { usePost } from "@/hooks/useHttp";
import { testCaseResultState, testCaseState } from "@/store/testCaseState";
import { useRecoilState, useRecoilValue } from "recoil";
import { toastMsgState } from "@/store/toastMsgState";
import { WebSocketContext } from "@/context/WebSocketContext";
import { userInfoState } from "@/store/userInfoState";

interface PropType {
  code: string;
}

const useCompile = () => {
  const [, setToastObj] = useRecoilState(toastMsgState);
  const [testCaseList] = useRecoilState(testCaseState);
  const [, setTestCaseResultList] = useRecoilState(testCaseResultState);
  const handleCompileResult = (res: any) => {
    const data = res;
    const successResults = data.map((result: any, idx: number) =>
      result.output == testCaseList[idx].output
        ? { ...result, success: true }
        : { ...result, success: false }
    );
    setTestCaseResultList(successResults);
  };

  const { isLoading, error, sendRequest } = usePost(
    { url: "/api/compile" },
    handleCompileResult
  );

  const stompClient = useContext(WebSocketContext);
  const userInfo = useRecoilValue(userInfoState);

  const onCompile = ({ code }: PropType) => {
    const inputList = testCaseList.map((e) => e?.input);

    if (!code || code.length == 0) {
      setToastObj({ show: true, msg: "코드를 입력하세요." });
    } else if (!inputList || inputList.length == 0) {
      setToastObj({ show: true, msg: "테스트케이스를 등록하세요." });
    } else {
      // sendRequest({
      //   code,
      //   inputs: inputList,
      // });
      // stompClient.connect({}, () => {
      stompClient.send(
        `api/compile/${userInfo.workspaceId}`,
        JSON.stringify({ code: code })
      );
      // });
    }
  };

  useEffect(() => {
    if (stompClient.connected)
      stompClient.subscribe(
        `api/compile/${userInfo.workspaceId}`,
        async (res: any) => {
          const data = await JSON.parse(res.body);
          handleCompileResult(data);
        }
      );
  }, [stompClient.connected]);

  return { isLoading, error, onCompile };
};

export default useCompile;
