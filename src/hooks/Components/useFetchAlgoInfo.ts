import { AlgoProbCategory, AlgoProbLevel } from "@/interface/AlgoProbLevel";
import {
  algoProbCategoryState,
  algoProbLevelState,
} from "@/store/algoProbState";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useGet } from "@/hooks/useHttp";

const useFetchAlgoInfo = () => {
  const [algoProbLevelList, setAlgoProbLevelList] =
    useRecoilState(algoProbLevelState);

  const [algoProbCategoryList, setAlgoProbCategoryList] = useRecoilState(
    algoProbCategoryState
  );

  /* 알고리즘 문제 level 정보 fetch */
  const saveProbLevelInfo = (levelInfoList: Array<AlgoProbLevel>) => {
    setAlgoProbLevelList(() => {
      return { list: levelInfoList };
    });
  };

  const { sendRequest: sendRequestProbLevel } = useGet(
    { url: "/api/problems/levels" },
    saveProbLevelInfo
  );

  /* 알고리즘 문제 category 정보 fetch */
  const saveProbCategoryInfo = (categoryInfoList: Array<AlgoProbCategory>) => {
    setAlgoProbCategoryList(() => {
      return { list: categoryInfoList };
    });
  };

  const { sendRequest: sendRequestProbCategory } = useGet(
    { url: "/api/problems/categories" },
    saveProbCategoryInfo
  );

  return [sendRequestProbLevel, sendRequestProbCategory];
};

export default useFetchAlgoInfo;
