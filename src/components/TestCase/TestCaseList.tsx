import React from "react";
import tw from "tailwind-styled-components";
import TestCase from "@/components/TestCase/TestCase";

const TestCaseList = () => {
  return (
    <MainDiv>
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
