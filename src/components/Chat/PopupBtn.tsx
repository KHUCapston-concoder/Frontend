import React from "react";
import { IconButton } from "@/components/_styled/Buttons";

const ChatPopupBtn = () => {
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };

  return <IconButton name="message" size="lg" onClick={onClick} />;
};

export default ChatPopupBtn;
