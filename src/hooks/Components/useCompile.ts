import { usePost } from "@/hooks/useHttp";
import { testCaseResultState, testCaseState } from "@/store/testCaseState";
import { useRecoilState } from "recoil";

interface PropType {
  code: string;
}

const useCompile = () => {
  const [testCaseList] = useRecoilState(testCaseState);
  const [, setTestCaseResultList] = useRecoilState(testCaseResultState);
  const handleCompileResult = (res: any) => {
    const data = res;
    const successResults = data.map((e: any, idx: number) =>
      e.output == testCaseList.list[idx].output ? "success" : "fail"
    );
    setTestCaseResultList({ list: successResults });
    console.log(successResults);
  };

  const { isLoading, error, sendRequest } = usePost(
    { url: "/api/compile" },
    handleCompileResult
  );

  const onCompile = ({code}:PropType) => {
    const inputList = testCaseList.list.map((e) => e?.input);

    sendRequest({
      code,
      inputs: inputList,
    });
  };

  return { onCompile };
};

export default useCompile;
