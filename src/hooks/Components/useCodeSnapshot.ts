import { EditorView } from "codemirror";
import { usePost } from "@/hooks/useHttp";
import { snapshotLengthState } from "@/store/snapshotState";
import { toastMsgState } from "@/store/toastMsgState";
import { useRecoilState } from "recoil";

const useCodeSnapshot = (editorRef: EditorView) => {
  const { error, sendRequest: sendSnapshot } = usePost(
    { url: "/api/snapshots" },
    () => {
      setSnapshotLength(snapshotLength + 1);
      setToastObj({ msg: "스냅샷 저장 완료", show: true });
    }
  );
  const [toastObj, setToastObj] = useRecoilState(toastMsgState);

  const [snapshotLength, setSnapshotLength] =
    useRecoilState(snapshotLengthState);

  const onSnapshot = async () => {
    const curContent = editorRef.state.doc.toString();

    sendSnapshot({ content: curContent });
  };

  return { sendSnapshot, onSnapshot };
};

export default useCodeSnapshot;
