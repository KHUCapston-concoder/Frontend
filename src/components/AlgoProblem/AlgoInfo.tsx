import { useTheme } from "@/context/ThemeContext";
import React from "react";
import tw from "tailwind-styled-components";

const AlgoInfo = () => {
  const { themeColorset } = useTheme();

  const algoInfo = {
    num: 25848,
    title: "보석 도둑",
    timeRestraint: "1초",
    memoryRestraint: "256MB",
    problemContent: `세계적인 도둑 상덕이는 보석점을 털기로 결심했다. \n
      상덕이가 털 보석점에는 보석이 총 N개 있다. 각, 보석은 무게 Mi와 가격 Vi를 가지고 있다. 상덕이는 가방을 K개 가지고 있고, 각 가방에 담을 수 있는 최대 무게는 Ci이다. 가방에는 최대 한 개의 보석만 넣을 수 있다. \n
      상덕이가 훔칠 수 있는 보석의 최대 가격을 구하는 프로그램을 작성하시오.`,
    input: `첫째 줄에 N과 K가 주어진다. (1 ≤ N, K ≤ 300,000) \n
        다음 N개 줄에는 각 보석의 정보 Mi와 Vi가 주어진다. (0 ≤ Mi, Vi ≤ 1,000,000) \n
        다음 K개 줄에는 가방에 담을 수 있는 최대 무게 Ci가 주어진다. (1 ≤ Ci ≤ 100,000,000) \n
        모든 숫자는 양의 정수이다.`,
    output: `첫째 줄에 상덕이가 훔칠 수 있는 보석 가격의 합의 최댓값을 출력한다.`,
  };

  return (
    <MainDiv>
      <TitleHolder>
        {algoInfo.num} {algoInfo.title}
      </TitleHolder>
      <RestraintDiv>
        시간 복잡도 <RestraintHolder>{algoInfo.timeRestraint}</RestraintHolder>
      </RestraintDiv>
      <RestraintDiv>
        공간 복잡도{" "}
        <RestraintHolder>{algoInfo.memoryRestraint}</RestraintHolder>
      </RestraintDiv>
      <TitleDiv>· 문제</TitleDiv>
      <ContentP>{algoInfo.problemContent}</ContentP>
      <TitleDiv>· 입력</TitleDiv>
      <ContentP>{algoInfo.input}</ContentP>
      <TitleDiv>· 출력</TitleDiv>
      <ContentP>{algoInfo.output}</ContentP>
    </MainDiv>
  );
};

export default AlgoInfo;

const MainDiv = tw.div`
w-full h-full overflow-y-scroll overflow-x-hidden
px-[14px] py-[10px]
`;

const TitleHolder = tw.span`
text-m font-bold
`;

const RestraintDiv = tw.div`
relative right-[2%]
w-[104%] h-[30px]
mt-[6px] px-[10px]
flex justify-between items-center
text-xs font-bold
bg-neutral rounded-[4px]
`;

const RestraintHolder = tw.span`
font-normal
`;

const TitleDiv = tw.div`
mt-[12px]
text-sm font-bold
`;

const ContentP = tw.p`
text-xs leading-5
`;
