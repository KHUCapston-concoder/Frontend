import { useGet } from "@/hooks/useHttp";
import { ISnapshotDetail, ISnapshotInfo } from "@/interface/Snapshot";
import { snapshotState } from "@/store/snapshotState";
import React from "react";
import { useRecoilState } from "recoil";
import tw from "tailwind-styled-components";

interface PropType {
  data: ISnapshotInfo;
}

const SnapshotInfo = ({ data }: PropType) => {
  const [snapshotDetail, setSnapshotDetail] = useRecoilState(snapshotState);
  const { sendRequest } = useGet(
    { url: `/api/snapshots/${data.id}` },
    (data: ISnapshotDetail) => {
      setSnapshotDetail(() => data);
    }
  );

  const onAddMemo = () => {};

  const onClickSnapshot = () => {
    sendRequest();
  };

  return (
    <MainDiv
      style={{ background: snapshotDetail.id == data.id ? "#29303b" : "" }}
      onClick={onClickSnapshot}
    >
      <TimeHolder>{data.createdDate}</TimeHolder>
      <MemoHolder onClick={onAddMemo}>
        {!data.memo && "메모 추가하기"}
        {/* 이부분 클릭하면 input으로 바뀐다거나.. 하는 코드 추가 */}
        <i className="fa-solid fa-pen"></i>
      </MemoHolder>
    </MainDiv>
  );
};

export default SnapshotInfo;

const MainDiv = tw.div`
w-full h-fit
dark-1
mb-[10px] p-[10px]
rounded-[10px]
hover:bg-[#191f26] ease-linear
`;

const TimeHolder = tw.div`
text-base font-bold
`;

const MemoHolder = tw.div`
text-xs
flex items-center gap-[6px]
`;
