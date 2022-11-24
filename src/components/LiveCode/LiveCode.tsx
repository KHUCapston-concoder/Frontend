import React from "react";
import tw from "tailwind-styled-components";
import MonacoEditor from "@monaco-editor/react";
import CompileFloatBtn from "@/components/LiveCode/CompileBtn";
import SnapshotFloatBtn from "@/components/LiveCode/SnapshotBtn";
import useMonacoEditor from "@/hooks/Components/useMonacoEditor";
import useCodeSnapshot from "@/hooks/Components/useCodeSnapshot";
import SelectBox from "../_styled/Select";
import useCompile from "@/hooks/Components/useCompile";

const LiveCode = () => {
  const { monacoRef, handleEditorDidMount } = useMonacoEditor();
  const { sendSnapshot, onSnapshot } = useCodeSnapshot(monacoRef);
  const { onCompile } = useCompile();

  return (
    <MainDiv>
      <SelectBox
        setSelection={() => {}}
        disabled={true}
        placeholder="python"
        className="select select-xs mb-[4px] h-[30px] w-[120px]"
      />
      <MonacoEditor
        width="100%"
        height="calc(100% - 60px)"
        language="python"
        theme="vs-dark"
        ref={monacoRef}
        onMount={handleEditorDidMount}
      />
      <FloatButtonDiv style={{ transform: "translate(-50%, 30px)" }}>
        <CompileFloatBtn
          onClick={() => onCompile(monacoRef?.current.getValue())}
        />
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
dark-2
flex gap-[10px]
justify-around
z-100
`;
