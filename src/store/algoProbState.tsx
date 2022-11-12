import {
  AlgoProbCategory,
  AlgoProbInfo,
  AlgoProbLevel,
} from "@/interface/AlgoProbLevel";
import { atom } from "recoil";

/* initial states */
const algoProbListInitialState: { list: Array<AlgoProbInfo>; length: number } =
  {
    list: [],
    length: 0,
  };

const algoProbLevelInitialState: { list: Array<AlgoProbLevel> } = {
  list: [],
};

const algoProbCategoryInitialState: { list: Array<AlgoProbCategory> } = {
  list: [],
};

/* atoms */
export const algoProbListState = atom({
  key: "algoProbList",
  default: algoProbListInitialState,
});

export const algoProbLevelState = atom({
  key: "algoProbLevel",
  default: algoProbLevelInitialState,
});

export const algoProbCategoryState = atom({
  key: "algoProbCategory",
  default: algoProbCategoryInitialState,
});
