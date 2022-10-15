import { atom } from "recoil"

interface AlgoProblemType {
  num: number;
  title: string;
  timeRestraint: string;
  memoryRestraint: string;
  problemContent: string;
  input: string;
  output: string;
}

export interface StateType {
    list: Array<AlgoProblemType>
    length: number,
}

const initialState: StateType = {
  list: [],
  length: 0,
};

export const algoProbState = atom({
  key: "algoProblemList",
  default: initialState,
});