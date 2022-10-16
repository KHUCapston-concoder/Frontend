import React from "react";
import tw from "tailwind-styled-components";
import LabelTab from "@/components/_styled/LabelTab";

const CompileInfo = () => {
  return (
    <>
      <LabelTab label="컴파일 정보" />
      <MainDiv></MainDiv>
    </>
  );
};

export default CompileInfo;

const MainDiv = tw.div`
w-full h-[calc(100%-32px)]
dark-2
rounded-[0_10px_10px_10px]
overflow-x-hidden overflow-y-scroll
`;
