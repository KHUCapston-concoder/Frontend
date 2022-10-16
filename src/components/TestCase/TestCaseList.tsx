import React from "react";
import tw from "tailwind-styled-components";
import TestCase from "@/components/TestCase/TestCase";
import { IconButton } from "@/components/_styled/Buttons";

const TestCaseList = () => {
    const length = 5;

  return (
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
  );
};

export default TestCaseList;

const MainDiv = tw.div`
w-full h-full
overflow-x-hidden overflow-y-scroll
`;

const AddTestCase = tw.div`
dark-1
w-full h-[80px]
my-[10px]
`;
