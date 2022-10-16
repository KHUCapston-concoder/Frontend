import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import tw from "tailwind-styled-components";
import SelectBox from "@/components/_styled/Select";
import InputBox from "@/components/_styled/Input";
import { algoProbState } from "@/store/algoProbState";
import algoProbDummyData from "@/utils/dummyData/algoInfo.json";

const AlgoFilterContainer = () => {
  const [tabNum, setTabNum] = useState(0);
  const [algoProblemList, setAlgoProblemList] = useRecoilState(algoProbState);
  const resetAlgoProblemList = useResetRecoilState(algoProbState);

  const onClickTab = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e.target);

    setTabNum(e.target.id);
  };

  const onSearch = () => {
    /* API 호출 비동기 작업 */
    resetAlgoProblemList();
    setAlgoProblemList(() => {
      return { list: algoProbDummyData, length: algoProbDummyData.length };
    });
  };

  const [levelList, setLevelList] = useState([
    { name: "골드2", value: 1 },
    { name: "골드1", value: 0 },
  ]);
  const [levelFilter, setLevelFilter] = useState("");
  const [typeList, setTypeList] = useState([
    { name: "DP", value: 1 },
    { name: "그리디", value: 0 },
  ]);
  const [typeFilter, setTypeFilter] = useState("");
  const [problemNum, setProblemNum] = useState("");

  return (
    <>
      <div className="tabs w-full">
        <a
          id="0"
          className={`tab tab-lifted ${
            tabNum == 0 && "tab-active font-bold"
          } w-1/2`}
          onClick={onClickTab}
        >
          필터검색
        </a>
        <a
          id="1"
          className={`tab tab-lifted ${
            tabNum == 1 && "tab-active font-bold"
          } w-1/2`}
          onClick={onClickTab}
        >
          번호검색
        </a>
      </div>
      <ContentDiv>
        {tabNum == 0 ? (
          <div className="flex">
            <SelectBox
              options={levelList}
              placeholder="티어를 선택하세요"
              label="티어"
              setSelection={setLevelFilter}
            />
            <SelectBox
              options={typeList}
              placeholder="문제 유형을 선택하세요"
              label="유형"
              setSelection={setTypeFilter}
            />
          </div>
        ) : (
          <InputBox
            placeholder="문제 번호를 검색하세요"
            label="문제 번호"
            setInput={setProblemNum}
          />
        )}
        <SearchBtn onClick={onSearch}> 검색 </SearchBtn>
      </ContentDiv>
    </>
  );
};

export default AlgoFilterContainer;

const ContentDiv = tw.div`
w-full h-[calc(100%-32px)]
py-[5px]
rounded-b-[15px]
dark-2
flex flex-col justify-between items-center gap-[4px]
`;

const SearchBtn = tw.button`
btn
h-fit min-h-[10px] w-[90%]
py-[4px]
bg-netural
text-xs
`;
