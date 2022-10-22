import React, { useState } from "react";
import { IconButton } from "@/components/_styled/Buttons";
import Modal from "@/hoc/Portal";

const SnapshotPopupBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    setIsModalOpen(true);
  };

  return (
    <>
      <IconButton name="history" size="lg" onClick={onClick} />
      <Modal isShowing={isModalOpen} close={() => setIsModalOpen(false)} />
    </>
  );
};

export default SnapshotPopupBtn;
