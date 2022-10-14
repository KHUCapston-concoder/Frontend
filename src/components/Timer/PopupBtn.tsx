import React from "react";
import { IconButton } from "@/components/_styled/Buttons";

const TimerPopupBtn = () => {
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };

  return (
    <IconButton name="stopwatch" size="xl" onClick={onClick} />
  );
};

export default TimerPopupBtn;
