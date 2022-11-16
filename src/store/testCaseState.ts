import { atom } from "recoil";

export interface testCase {
  input: string;
  output: string;
}

export interface StateType {
  list: Array<testCase>;
}

const initialState: StateType = {
  list: [],
};

export const testCaseState = atom({
  key: "testCaseState",
  default: initialState,
});
