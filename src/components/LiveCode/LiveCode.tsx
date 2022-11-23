import React, { useEffect, useRef, useState } from "react";
import tw from "tailwind-styled-components";
import MonacoEditor, { useMonaco, OnMount, Monaco } from "@monaco-editor/react";
import CompileFloatBtn from "@/components/LiveCode/CompileBtn";
import SnapshotFloatBtn from "@/components/LiveCode/SnapshotBtn";
import { useGet, usePost } from "@/hooks/useHttp";
import axios from "axios";
import { useRecoilState } from "recoil";
import { liveCodeContentSetter } from "@/store/liveCode";
import useMonacoEditor from "@/hooks/Components/useMonacoEditor";
import useCodeSnapshot from "@/hooks/Components/useCodeSnapshot";
import { testCaseResultState, testCaseState } from "@/store/testCaseState";

const LiveCode = () => {
  const { monacoRef, handleEditorDidMount } = useMonacoEditor();
  const { sendSnapshot, onSnapshot } = useCodeSnapshot(monacoRef);
  const { isLoading, error, sendRequest } = usePost({ url: "/api/compile" });
  const [testCaseList] = useRecoilState(testCaseState);
  const [testCaseResultList, setTestCaseResultList] =
    useRecoilState(testCaseResultState);

  const onCompile = () => {
    console.log(monacoRef.current?.getValue());
    const code = monacoRef.current?.getValue();

    // console.log(testCaseList);
    // console.log(testCaseList.list.map((e) => e?.input));
    const inputList = testCaseList.list.map((e) => e?.input);

    axios
      .post("http://163.180.146.59/api/compile", {
        code,
        inputs: inputList,
      })
      .then((res) => {
        console.log("res", res);
        const data = res.data;
        const successResults = data.map((e: any, idx: number) =>
          e.output == testCaseList.list[idx].output ? "success" : "fail"
        );
        setTestCaseResultList({ list: successResults });
      });
  };

  return (
    <MainDiv>
      <MonacoEditor
        width="100%"
        height="100%"
        language="python"
        theme="vs-dark"
        ref={monacoRef}
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
