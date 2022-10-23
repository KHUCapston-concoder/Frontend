import React, { useState } from "react";
import { IconButton } from "@/components/_styled/Buttons";
import Modal from "@/hoc/Portal";
import SnapshotListModal from "@/components/Snapshot/SnapshotListModal";

const SnapshotPopupBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    setIsModalOpen(true);
  };

  return (
    <>
      <IconButton name="history" size="lg" onClick={onClick} />
      <Modal
        className="h-[70%] w-[80%] min-w-[600px] max-w-[900px]"
        isShowing={isModalOpen}
        close={() => setIsModalOpen(false)}
      >
        <SnapshotListModal />
      </Modal>
    </>
  );
};

export default SnapshotPopupBtn;
