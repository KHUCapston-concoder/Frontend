import { ISnapshotDetail } from "@/interface/Snapshot";
import { atom, selector } from "recoil";

const initialState: ISnapshotDetail = {
  id: null,
  memo: "",
  content: "",
  createdDate: "",
};

export const snapshotState = atom({
  key: "snapshotState",
  default: initialState,
});