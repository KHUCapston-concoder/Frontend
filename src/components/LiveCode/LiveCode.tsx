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
import SelectBox from "../_styled/Select";

const LiveCode = () => {
  const handleCompileResult = (res: any) => {
    const data = res;
    const successResults = data.map((e: any, idx: number) =>
      e.output == testCaseList.list[idx].output ? "success" : "fail"
    );
    setTestCaseResultList({ list: successResults });
    console.log(successResults);
  };

  const { monacoRef, handleEditorDidMount } = useMonacoEditor();
  const { sendSnapshot, onSnapshot } = useCodeSnapshot(monacoRef);
  const { isLoading, error, sendRequest } = usePost(
    { url: "/api/compile" },
    handleCompileResult
  );
  const [testCaseList] = useRecoilState(testCaseState);
  const [, setTestCaseResultList] = useRecoilState(testCaseResultState);

  const onCompile = () => {
    const code = monacoRef.current?.getValue();
    const inputList = testCaseList.list.map((e) => e?.input);

    sendRequest({
      code,
      inputs: inputList,
    });
  };

  return (
    <MainDiv>
      <SelectBox
        setSelection={() => {}}
        disabled={true}
        placeholder="python"
        className="select select-ghost select-xs h-[30px] w-[120px]"
      />
      <MonacoEditor
        width="100%"
        height="calc(100% - 35px)"
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
