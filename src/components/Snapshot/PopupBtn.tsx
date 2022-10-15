import React from "react";
import { IconButton } from "@/components/_styled/Buttons";

const SnapshotPopupBtn = () => {
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };

  return <IconButton name="history" size="lg" onClick={onClick} />;
};

export default SnapshotPopupBtn;
