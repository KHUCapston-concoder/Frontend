import { useEffect } from "react";
import { usePost } from "@/hooks/useHttp";
import { testCaseResultState, testCaseState } from "@/store/testCaseState";
import { useRecoilState } from "recoil";
import { toastMsgState } from "@/store/toastMsgState";

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

  const onCompile = ({ code }: PropType) => {
    const inputList = testCaseList.map((e) => e?.input);

    if (!code || code.length == 0) {
      setToastObj({ show: true, msg: "코드를 입력하세요." });
    } else if (!inputList || inputList.length == 0) {
      setToastObj({ show: true, msg: "테스트케이스를 등록하세요." });
    } else {
      sendRequest({
        code,
        inputs: inputList,
      });
    }
  };

  useEffect(() => {}, [isLoading]);

  return { isLoading, error, onCompile };
};

export default useCompile;
