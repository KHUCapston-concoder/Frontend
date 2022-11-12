import { AlgoProbInfo } from "@/interface/AlgoProbLevel";
import { atom } from "recoil"

const initialState = {
  list: [],
  length: 0,
};

export const algoProbListState = atom({
  key: "algoProbList",
  default: initialState,
});

export const algoProbLevelState = atom({
  key: "algoProbLevel",
  default: initialState,
});