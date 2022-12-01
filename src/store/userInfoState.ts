import { atom } from "recoil";

export interface StateType {
  userId: string;
  username: string;
  workspaceId: string;
}

const initialState: StateType = {
  userId: "",
  username: "",
  workspaceId: "",
};

export const userInfoState = atom({
  key: "userInfo",
  default: initialState,
});
