import React from "react";
import tw from "tailwind-styled-components";
import SnapshotBtn from "@/components/Snapshot/PopupBtn";
import TimerBtn from "@/components/Timer/PopupBtn";
import { useTheme } from "@/context/ThemeContext";
import ChatPopupBtn from "@/components/Chat/PopupBtn";
import AlgoFilterContainer from "@/components/AlgoProblem/AlgoFilter";
import AlgoInfo from "@/components/AlgoProblem/AlgoInfo";

const Workspace = () => {
  const { themeColorset } = useTheme();

  return (
    <MainDiv>
      <CamDiv></CamDiv>
      <AlgoDiv>
        <AlgoFilterDiv>
          <AlgoFilterContainer />
        </AlgoFilterDiv>
        <AlgoInfoDiv>
          <AlgoInfo />
        </AlgoInfoDiv>
      </AlgoDiv>
      <CodeDiv>
        <FloatButtonDiv style={{ transform: "translate(-50%, 0)" }}>
          {/* Floating Buttons Container */}
        </FloatButtonDiv>
      </CodeDiv>
      <FlexDiv>
        <CompileInfoDiv></CompileInfoDiv>
        <TestCasaeDiv></TestCasaeDiv>
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
top-[90%] left-[50%]
w-[50%] h-[60px]
rounded-[15px]
dark-1
`;

/* 3.4.5 컴파일 정보 */
const CompileInfoDiv = tw(CommonDiv)`
m-0 mb-[15px]
w-full 
basis-[100px] grow-[2]
`;

/* 3.4.6 테스트 케이스 */
const TestCasaeDiv = tw(CommonDiv)`
m-0 mb-[15px]
w-full 
basis-[100px] grow-[6]
`;

/* 부가기능 버튼들 */
const UtilButtonsDiv = tw(CommonDiv)`
m-0 w-full
basis-[60px]
flex gap-[10px] justify-end items-end
bg-inherit
`;

const UtilButtonDiv = tw(CommonDiv)`
m-0
max-w-[60px]
h-[60px] w-[60px]
`;
