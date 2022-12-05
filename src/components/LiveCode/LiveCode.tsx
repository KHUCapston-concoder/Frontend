import React, { useState } from "react";
import tw from "tailwind-styled-components";
import MonacoEditor from "@monaco-editor/react";
import CompileFloatBtn from "@/components/LiveCode/CompileBtn";
import SnapshotFloatBtn from "@/components/LiveCode/SnapshotBtn";
import useMonacoEditor from "@/hooks/Components/useMonacoEditor";
import useCodeSnapshot from "@/hooks/Components/useCodeSnapshot";
import SelectBox from "../_styled/Select";
import useCompile from "@/hooks/Components/useCompile";
import { EditorView } from "codemirror";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/store/userInfoState";
import Tooltip from "../_styled/Tooltip";

const LiveCode = () => {
  const { onCompile } = useCompile();
  const [isEditable, setIsEditable] = useState(false);
  const userInfo = useRecoilValue(userInfoState);
  const { monaco, monacoRef, setliveCodeSetter, handleEditorDidMount } =
    useMonacoEditor();
  const { onSnapshot } = useCodeSnapshot(monacoRef);

  return (
    <>
      <MainDiv>
        <FlexDiv>
          <div
            className="tooltip tooltip-bottom"
            data-tip="다른 언어는 준비중입니다."
          >
            <SelectBox
              setSelection={() => {}}
              disabled={true}
              placeholder="python"
              className="select select-xs mb-[4px] h-[30px] w-fit"
            />
          </div>
          <div
            className="tooltip tooltip-bottom"
            data-tip="호스트만 사용할 수 있는 기능입니다."
          >
            <input
              type="checkbox"
              className="toggle"
              disabled={!userInfo.host}
              checked={isEditable}
              onClick={() => {
                setIsEditable(!isEditable);
              }}
            />
          </div>
        </FlexDiv>
        <MonacoEditor
          width="100%"
          height="calc(100% - 60px)"
          language="python"
          theme="vs-dark"
          // disabled={}
          ref={monacoRef}
          onMount={handleEditorDidMount}
        />
      </MainDiv>
      <FloatButtonDiv style={{ transform: "translate(-50%, 0)" }}>
        <CompileFloatBtn
          onClick={() => onCompile({ code: view.state.doc.toString() })}
        />
        <SnapshotFloatBtn onClick={onSnapshot} />
      </FloatButtonDiv>
    </>
  );
};

export default LiveCode;

const MainDiv = tw.div`
w-full h-full
`;

const FloatButtonDiv = tw.div`
relative
bottom-[60px] left-[50%]
w-fit h-[60px]
px-[10px]
rounded-[15px]
dark-1
flex gap-[10px]
justify-around
z-100
`;

const FlexDiv = tw.div`
w-full h-fit
flex items-center justify-between
pr-[10px]
`;
