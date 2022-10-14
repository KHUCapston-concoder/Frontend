import { useTheme } from "@/context/ThemeContext";
import React from "react";
import tw from "tailwind-styled-components";
const Workspace = () => {
  const { themeColorset } = useTheme();

  return (
    <MainDiv>
      <CamDiv></CamDiv>
      <AlgoDiv>
        <AlgoFilterDiv></AlgoFilterDiv>
        <AlgoInfoDiv></AlgoInfoDiv>
      </AlgoDiv>
      <CodeDiv>
        <FloatButtonDiv style={{ transform: "translate(-50%, 0)" }}>
          {/* Floating Buttons Container */}
        </FloatButtonDiv>
      </CodeDiv>
      <FlexDiv>
        <CompileInfoDiv></CompileInfoDiv>
        <TestCasaeDiv></TestCasaeDiv>
        <UtilButtonsDiv></UtilButtonsDiv>
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
`;

const AlgoInfoDiv = tw(CommonDiv)`
m-0 mt-[15px]
h-[calc(80%-15px)]
`;

/* 3.4.2 실시간 동시 코딩 */
const CodeDiv = tw(CommonDiv)`
grow-[6]
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
basis-[60px] grow
`;

const FloatButtonDiv = tw.div`
relative
top-[90%] left-[50%]
w-[50%] h-[60px]
rounded-[15px]
dark-1
`;
