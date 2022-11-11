import React from "react";
import tw from "tailwind-styled-components";
import SnapshotBtn from "@/components/Snapshot/PopupBtn";
import TimerBtn from "@/components/Timer/PopupBtn";
import { useTheme } from "@/context/ThemeContext";
import ChatPopupBtn from "@/components/Chat/PopupBtn";
import AlgoFilterContainer from "@/components/AlgoProblem/AlgoFilter";
import AlgoInfo from "@/components/AlgoProblem/AlgoInfo";
import TestCaseList from "@/components/TestCase/TestCaseList";
import CompileInfo from "@/components/Compile/CompileInfo";
import SnapshotFloatBtn from "@/components/LiveCode/SnapshotBtn";
import CompileFloatBtn from "@/components/LiveCode/CompileBtn";
import LiveCode from "@/components/LiveCode/LiveCode";

const Workspace = () => {
  const { themeColorset } = useTheme();

  return (
    <MainDiv>
      {/* Section 1 */}
      <CamDiv></CamDiv>
      {/* Section 2 */}
      <AlgoDiv>
        <AlgoFilterDiv>
          <AlgoFilterContainer />
        </AlgoFilterDiv>
        <AlgoInfoDiv>
          <AlgoInfo />
        </AlgoInfoDiv>
      </AlgoDiv>
      {/* Section 3 */}
      <CodeDiv>
        <LiveCode />
        <FloatButtonDiv style={{ transform: "translate(-50%, 0)" }}>
          {/* Floating Buttons Container */}
          <CompileFloatBtn />
          <SnapshotFloatBtn />
        </FloatButtonDiv>
      </CodeDiv>
      {/* Section 4 */}
      <FlexDiv>
        {/* 컴파일 정보 */}
        <CompileInfoDiv>
          <CompileInfo />
        </CompileInfoDiv>
        {/* 테스트 케이스 */}
        <TestCasaeDiv>
          <TestCaseList />
        </TestCasaeDiv>
        {/* 아래 버튼 3개 */}
        <UtilButtonsDiv>
          <UtilButtonDiv>
            <SnapshotBtn />
          </UtilButtonDiv>
          <UtilButtonDiv>
            <TimerBtn />
          </UtilButtonDiv>
          <UtilButtonDiv>
            <ChatPopupBtn />
          </UtilButtonDiv>
        </UtilButtonsDiv>
      </FlexDiv>
    </MainDiv>
  );
};

export default Workspace;

/* 기본 */
const CommonDiv = tw.div`
ml-[15px] my-[15px]
rounded-[20px] basis-[100px]
bg-[#222831]
`;

const MainDiv = tw.div`
w-full min-w-[1000px] h-full
flex
overflow-hidden
dark-1
`;

const FlexDiv = tw(CommonDiv)`
grow-[2] flex flex-col
mr-[15px]
bg-inherit
`;

/* 3.4.1 실시간 화상 회의 */
const CamDiv = tw(CommonDiv)`
grow h-[calc(100%-30px)]
`;

/* 3.4.4 알고리즘 문제 추천 */
const AlgoDiv = tw(CommonDiv)`
grow-[2] bg-inherit
`;

const AlgoFilterDiv = tw(CommonDiv)`
m-0
h-[20%]
bg-inherit
`;

const AlgoInfoDiv = tw(CommonDiv)`
m-0 mt-[15px]
h-[calc(80%-15px)]
`;

/* 3.4.2 실시간 동시 코딩 */
const CodeDiv = tw(CommonDiv)`
grow-[6]
`;

const FloatButtonDiv = tw.div`
relative
top-[-10%] left-[50%]
w-fit h-[60px]
px-[10px]
rounded-[15px]
dark-1
flex gap-[10px]
justify-around
z-100
`;

/* 3.4.5 컴파일 정보 */
const CompileInfoDiv = tw(CommonDiv)`
m-0 mb-[15px] dark-1
w-full h-[20%]
basis-auto
`;

/* 3.4.6 테스트 케이스 */
const TestCasaeDiv = tw(CommonDiv)`
m-0 mb-[15px] dark-1
w-full h-[80%] min-h-[420px]
basis-auto
`;

/* 부가기능 버튼들 */
const UtilButtonsDiv = tw(CommonDiv)`
m-0 w-full
min-h-[60px] h-[10%]
flex gap-[10px] justify-end items-end
bg-inherit
`;

const UtilButtonDiv = tw(CommonDiv)`
m-0
max-w-[60px]
h-[60px] w-[60px]
`;
