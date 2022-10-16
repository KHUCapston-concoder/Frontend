import React from "react";
import tw from "tailwind-styled-components";
import TestCase from "@/components/TestCase/TestCase";
import { IconButton } from "@/components/_styled/Buttons";
import LabelTab from "@/components/_styled/LabelTab";

const TestCaseList = () => {
  const length = 5;

  return (
    <>
      <LabelTab label="테스트 케이스" />
      <MainDiv>
        <AddTestCase>
          <IconButton name="circle-plus" />
        </AddTestCase>
        <TestCase />
        <TestCase />
        <TestCase />
        <TestCase />
        <TestCase />
        <TestCase />
      </MainDiv>
    </>
  );
};

export default TestCaseList;

const MainDiv = tw.div`
w-full h-[calc(100%-32px)]
dark-2
rounded-[0_10px_10px_10px]
overflow-x-hidden overflow-y-scroll
`;

const AddTestCase = tw.div`
dark-1 rounded-[10px]
w-[100%-20px] h-[50px]
mx-[10px] my-[10px]
`;
