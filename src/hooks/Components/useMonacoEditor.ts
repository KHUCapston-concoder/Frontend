import { liveCodeContentSetter } from "@/store/liveCode";
import MonacoEditor, { useMonaco, OnMount, Monaco } from "@monaco-editor/react";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

const useMonacoEditor = () => {
  const monaco = useMonaco();
  const monacoRef = useRef<Monaco>(null);
  const [, setliveCodeSetter] = useRecoilState(liveCodeContentSetter);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    monacoRef.current = editor;
  };

  useEffect(() => {
    if (!monaco) return;
    // console.log(monacoRef.current.setValue("hi"));

    setliveCodeSetter({
      func: (code: string) => {
        monacoRef.current?.setValue(code);
      },
    });
  }, [monaco]);

  return {monaco, monacoRef, setliveCodeSetter, handleEditorDidMount}
};

export default useMonacoEditor;
