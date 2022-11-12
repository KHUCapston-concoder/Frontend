import React, { useState } from "react";
import tw from "tailwind-styled-components";
import TestCase from "@/components/TestCase/TestCase";
import { IconButton } from "@/components/_styled/Buttons";
import LabelTab from "@/components/_styled/LabelTab";
import { useRecoilState } from "recoil";
import { testCaseState, testCaseType } from "@/store/testCaseState";

const TestCaseList = () => {
  const [testCases, setTestCases] = useRecoilState(testCaseState);
  const [isAdding, setIsAdding] = useState(false);

  const showAddBtn = () => {
    return (testCases.list.length == 0 && !isAdding) || !isAdding;
  };

  const sortedTestCases = [...testCases.list].reverse();

  const onAddTestCase = () => {
    setIsAdding(true);
  };

  return (
    <>
      <LabelTab label="테스트 케이스" />
      <MainDiv>
        {showAddBtn() && (
          <AddTestCase onClick={onAddTestCase}>
            <IconButton name="circle-plus" />
          </AddTestCase>
        )}
        {isAdding && (
          <TestCase
            testCaseNo={sortedTestCases.length}
            setIsAdding={setIsAdding}
          />
        )}
        {sortedTestCases.map((e, idx) => (
          <TestCase
            key={sortedTestCases.length - idx}
            testCaseNo={sortedTestCases.length - 1 - idx}
            disabled={true}
            inputVal={e.input}
            outputVal={e.output}
          />
        ))}
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
