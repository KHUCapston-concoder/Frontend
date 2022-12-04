import { atom, selector } from "recoil";

export interface testCase {
  input: string;
  output: string;
  testCaseId: string;
}

export interface StateType {
  list: Array<testCase>;
}
export interface StateType2 {
  list: Array<string>;
}

const initialState1: StateType = {
  list: [],
};

const initialState2: StateType2 = {
  list: [],
};

export const testCaseState = atom({
  key: "testCaseState",
  default: initialState1,
});

export const testCaseResultState = atom({
  key: "testCaseResultState",
  default: initialState2,
});
