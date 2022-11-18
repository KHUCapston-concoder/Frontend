import { usePost } from "@/hooks/useHttp";
import { Monaco } from "@monaco-editor/react";
import { MutableRefObject } from "react";

const useCodeSnapshot = (monacoRef: MutableRefObject<Monaco>) => {
  const { sendRequest: sendSnapshot } = usePost({
    url: "/api/snapshots",
  });

  const onSnapshot = () => {
    const curContent = monacoRef.current?.getValue();
    sendSnapshot({ content: curContent });
  };

  return { sendSnapshot, onSnapshot };
};

export default useCodeSnapshot