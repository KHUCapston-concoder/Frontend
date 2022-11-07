import React from "react";
import tw from "tailwind-styled-components";
import MonacoEditor from "@monaco-editor/react";

const LiveCode = () => {
  return (
    <MainDiv>
      <MonacoEditor width="100%" height="100%" language="c" theme="vs-dark" />
    </MainDiv>
  );
};

export default LiveCode;

const MainDiv = tw.div`
w-full h-full
`;
