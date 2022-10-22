import React, { useEffect, useState } from "react";
import tw from "tailwind-styled-components";
import LabelTab from "@/components/_styled/LabelTab";

const CompileInfo = () => {
  const [time, setTime] = useState(0);
  const [memory, setMemory] = useState(0);

  useEffect(() =>
    // TODO: 컴파일 완료 후 Response data Setting하기
    {}, [time, memory]);

  return (
    <>
      <LabelTab label="컴파일 정보" />
      <MainDiv>
        <InfoList>
          <Info>
            <InfoTitle>시간</InfoTitle>
            <InfoData>{time}s</InfoData>
          </Info>
          <Info>
            <InfoTitle>메모리</InfoTitle>
            <InfoData>{memory}KB</InfoData>
          </Info>
        </InfoList>
      </MainDiv>
    </>
  );
};

export default CompileInfo;

const MainDiv = tw.div`
w-full h-[calc(100%-32px)]
dark-2
rounded-[0_10px_10px_10px]
overflow-x-hidden 
`;

const InfoList = tw.div`
w-[100%-20px] h-fit
mx-[10px] my-[8px] p-[10px_0_10px_0]
flex flex-col justify-between gap-[14px]
rounded-[10px]
`;

const Info = tw.div`
flex flex-row justify-around
mx-4
`;

const InfoTitle = tw.div`
py-1
w-full text-left text-sm font-bold
`;

const InfoData = tw.div`
dark-1
rounded-[10px]
py-1
w-full text-center text-sm font-bold
`;
