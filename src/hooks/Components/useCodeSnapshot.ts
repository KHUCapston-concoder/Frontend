import { EditorView } from "codemirror";
import { usePost } from "@/hooks/useHttp";
import { snapshotLengthState } from "@/store/snapshotState";
import { toastMsgState } from "@/store/toastMsgState";
import { useRecoilState } from "recoil";

const useCodeSnapshot = (editorRef: EditorView) => {
  const { sendRequest: sendSnapshot } = usePost({
    url: "/api/snapshots",
  });
  const [toastObj, setToastObj] = useRecoilState(toastMsgState);

  const [snapshotLength, setSnapshotLength] =
    useRecoilState(snapshotLengthState);

  const onSnapshot = () => {
    const curContent = editorRef.state.doc.toString();

    setToastObj({ msg: "스냅샷 저장 완료", show: true });
    sendSnapshot({ content: curContent }).then(() => {
      setSnapshotLength(snapshotLength + 1);
    });
  };

  return { sendSnapshot, onSnapshot };
};

export default useCodeSnapshot;
