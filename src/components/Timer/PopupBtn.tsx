import React from "react";
import { IconButton } from "@/components/_styled/Buttons";

const TimerPopupBtn = () => {
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };

  return <IconButton name="stopwatch" size="lg" onClick={onClick} />;
};

export default TimerPopupBtn;
