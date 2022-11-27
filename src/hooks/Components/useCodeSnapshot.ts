import { usePost } from "@/hooks/useHttp";
import { toastMsgState } from "@/store/toastMsgState";
import { Monaco } from "@monaco-editor/react";
import { MutableRefObject } from "react";
import { useRecoilState } from "recoil";

const useCodeSnapshot = (monacoRef: MutableRefObject<Monaco>) => {
  const { sendRequest: sendSnapshot } = usePost({
    url: "/api/snapshots",
  });
  const [toastObj, setToastObj] = useRecoilState(toastMsgState);

  const onSnapshot = () => {
    const curContent = monacoRef.current?.getValue();
    setToastObj({ msg: "스냅샷 저장 완료", show: true });

    sendSnapshot({ content: curContent });
  };

  return { sendSnapshot, onSnapshot };
};

export default useCodeSnapshot;
