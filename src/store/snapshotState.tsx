import { ISnapshotDetail } from "@/interface/Snapshot";
import { atom } from "recoil";

const initialState: ISnapshotDetail = {
  id: "",
  memo: "",
  content: "",
  createdDate: "",
};

export const snapshotState = atom({
  key: "snapshotState",
  default: initialState,
});
