import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import tw from "tailwind-styled-components";

const AlgoFilterContainer = () => {
  const [tabNum, setTabNum] = useState(0);
  const onClickTab = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e.target);

    setTabNum(e.target.id);
  };

  return (
    <>
      <div className="tabs w-full">
        <a
          id="0"
          className={`tab tab-lifted ${tabNum == 0 && "tab-active"} w-1/2`}
          onClick={onClickTab}
        >
          필터검색
        </a>
        <a
          id="1"
          className={`tab tab-lifted ${tabNum == 1 && "tab-active"} w-1/2`}
          onClick={onClickTab}
        >
          번호검색
        </a>
      </div>
      <ContentDiv></ContentDiv>
    </>
  );
};

export default AlgoFilterContainer;

const ContentDiv = tw.div`
w-full h-[calc(100%-32px)]
rounded-b-[15px]
dark-2
`;
