import React from "react";
import tw from "tailwind-styled-components";
import MonacoEditor from "@monaco-editor/react";
import CompileFloatBtn from "@/components/LiveCode/CompileBtn";
import SnapshotFloatBtn from "@/components/LiveCode/SnapshotBtn";
import useMonacoEditor from "@/hooks/Components/useMonacoEditor";
import useCodeSnapshot from "@/hooks/Components/useCodeSnapshot";
import SelectBox from "../_styled/Select";
import useCodeMirror from "@/hooks/Components/useCodeMirror";
import useCompile from "@/hooks/Components/useCompile";

const LiveCode = () => {
  const { onCompile } = useCompile();
  const updateHandler = EditorView.updateListener.of((viewUpdate) => {
    if (viewUpdate.docChanged) {
      for (const tr of viewUpdate.transactions) {
        const events = ["select", "input", "delete", "move", "undo", "redo"];
        if (!events.map((event) => tr.isUserEvent(event)).some(Boolean)) {
          continue;
        }
        if (tr.annotation(Transaction.remote)) {
          continue;
        }
        tr.changes.iterChanges((fromA, toA, _, __, inserted) => {
          console.log(fromA, toA, inserted);

          doc.update((root) => {
            root.content?.edit(fromA, toA, inserted.toJSON().join("\n"));
          }, "코드 에디터에 문제가 있습니다.");
        });
      }
    }
  });

  const { view, editorRef } = useCodeMirror({ updateHandler });
  const { onSnapshot } = useCodeSnapshot(view);

  return (
    <>
      <MainDiv>
        <SelectBox
          setSelection={() => {}}
          disabled={true}
          placeholder="python"
          className="select select-xs mb-[4px] h-[30px] w-[120px]"
        />
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
