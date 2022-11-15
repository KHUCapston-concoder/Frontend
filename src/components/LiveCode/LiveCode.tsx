import React, { useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components";
import MonacoEditor, { useMonaco, OnMount } from "@monaco-editor/react";
import CompileFloatBtn from "@/components/LiveCode/CompileBtn";
import SnapshotFloatBtn from "@/components/LiveCode/SnapshotBtn";
import { usePost } from "@/hooks/useHttp";
import axios from "axios";

const LiveCode = () => {
  const [editorValue, setEditorValue] = useState("");
  const monaco = useMonaco();
  const monacoRef = useRef(null);
  const { sendRequest: sendSnapshot } = usePost({
    url: "/api/snapshots",
    data: editorValue,
  });

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    monacoRef.current = editor;
  };

  const onCompile = () => {};

  const onSnapshot = () => {
    setEditorValue(monacoRef.current?.getValue());
    console.log(monacoRef.current?.getValue());
    sendSnapshot({ content: monacoRef.current?.getValue() });
  };

  useEffect(() => {
    if (!monaco) return;
  }, [monaco]);

  return (
    <MainDiv>
      <MonacoEditor
        width="100%"
        height="100%"
        language="c"
        theme="vs-dark"
        onMount={handleEditorDidMount}
      />
      <FloatButtonDiv style={{ transform: "translate(-50%, 0)" }}>
        <CompileFloatBtn onClick={onCompile} />
        <SnapshotFloatBtn onClick={onSnapshot} />
      </FloatButtonDiv>
    </MainDiv>
  );
};

export default LiveCode;

const MainDiv = tw.div`
w-full h-full
`;

const FloatButtonDiv = tw.div`
relative
top-[-10%] left-[50%]
w-fit h-[60px]
px-[10px]
rounded-[15px]
dark-1
flex gap-[10px]
justify-around
z-100
`;
