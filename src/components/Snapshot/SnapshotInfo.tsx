import React from "react";
import tw from "tailwind-styled-components";

const SnapshotInfo = () => {
  return (
    <MainDiv>
      <TimeHolder>2022.10.23 01:12</TimeHolder>
      <MemoHolder>
        메모 추가하기
        {/* 이부분 클릭하면 input으로 바뀐다거나.. 하는 코드 추가 */}
        <i className="fa-solid fa-pen"></i>
      </MemoHolder>
    </MainDiv>
  );
};

export default SnapshotInfo;

const MainDiv = tw.div`
w-full h-fit
dark-1
mb-[10px] p-[10px]
rounded-[10px]
hover:bg-blend-darken
`;

const TimeHolder = tw.div`
text-base font-bold
`;

const MemoHolder = tw.div`
text-xs
flex items-center gap-[6px]
`;
