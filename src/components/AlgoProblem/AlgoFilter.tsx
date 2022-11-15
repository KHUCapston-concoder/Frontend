import React, { useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import tw from "tailwind-styled-components";
import SelectBox from "@/components/_styled/Select";
import InputBox from "@/components/_styled/Input";
import {
  algoProbListState,
  algoProbLevelState,
  algoProbCategoryState,
} from "@/store/algoProbState";
import {useGet} from "@/hooks/useHttp";
import Tabs from "../_styled/Tabs";

const AlgoFilterContainer = () => {
  const [tabNum, setTabNum] = useState(0);
  const [algoProbLevelList, setAlgoProbLevelList] =
    useRecoilState(algoProbLevelState);
  const [algoProbCategoryList, setAlgoProbCategoryList] = useRecoilState(
    algoProbCategoryState
  );
  const [algoProblemList, setAlgoProblemList] =
    useRecoilState(algoProbListState);
  const resetAlgoProblemList = useResetRecoilState(algoProbListState);

  const saveSearchedProbList = () => {};

  const onSearch = () => {
    const url =
      tabNum == 0
        ? `/api/problems/random?standard=[”level” | “category” ]&id=[level id| category id]`
        : `/api/problems?number=${problemNum}`;

    const { sendRequest } = useGet({ url }, saveSearchedProbList);
  };

  const [levelFilter, setLevelFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [problemNum, setProblemNum] = useState("");

  return (
    <>
      <Tabs
        list={["필터검색", "번호검색"]}
        tabNum={tabNum}
        setTabNum={setTabNum}
      />
      <ContentDiv>
        {tabNum == 0 ? (
          <div className="flex">
            <SelectBox
              options={algoProbLevelList.list}
              placeholder="티어를 선택하세요"
              label="티어"
              setSelection={setLevelFilter}
            />
            <SelectBox
              options={algoProbCategoryList.list}
              placeholder="문제 유형을 선택하세요"
              label="유형"
              setSelection={setCategoryFilter}
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
