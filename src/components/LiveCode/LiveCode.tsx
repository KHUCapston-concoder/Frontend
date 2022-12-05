import React, { useState } from "react";
import tw from "tailwind-styled-components";
import MonacoEditor from "@monaco-editor/react";
import CompileFloatBtn from "@/components/LiveCode/CompileBtn";
import SnapshotFloatBtn from "@/components/LiveCode/SnapshotBtn";
import useMonacoEditor from "@/hooks/Components/useMonacoEditor";
import useCodeSnapshot from "@/hooks/Components/useCodeSnapshot";
import SelectBox from "../_styled/Select";
import useCodeMirror from "@/hooks/Components/useCodeMirror";
import useCompile from "@/hooks/Components/useCompile";
import { EditorView } from "codemirror";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/store/userInfoState";

const LiveCode = () => {
  const { onCompile } = useCompile();
  const [isEditable, setIsEditable] = useState(false);
  const userInfo = useRecoilValue(userInfoState);
  const updateHandler = EditorView.updateListener.of((viewUpdate) => {
    // if (viewUpdate.docChanged) {
    //   for (const tr of viewUpdate.transactions) {
    //     const events = ["select", "input", "delete", "move", "undo", "redo"];
    //     if (!events.map((event) => tr.isUserEvent(event)).some(Boolean)) {
    //       continue;
    //     }
    //     if (tr.annotation(Transaction.remote)) {
    //       continue;
    //     }
    //     tr.changes.iterChanges((fromA, toA, _, __, inserted) => {
    //       console.log(fromA, toA, inserted);
    //       doc.update((root) => {
    //         root.content?.edit(fromA, toA, inserted.toJSON().join("\n"));
    //       }, "코드 에디터에 문제가 있습니다.");
    //     });
    //   }
    // }
  });

  const { view, editorRef } = useCodeMirror({ updateHandler });
  const { onSnapshot } = useCodeSnapshot(view);

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
        <div
          style={{
            width: "100%",
            height: "calc(100%-40px)",
            maxWidth: "640px",
          }}
          className="cm-s-abbott"
          ref={editorRef}
          id="code-editor"
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
