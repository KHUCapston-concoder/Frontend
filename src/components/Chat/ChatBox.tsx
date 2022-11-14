import React from "react";
import LabelTab from "@/components/_styled/LabelTab";
import tw from "tailwind-styled-components";

const ChatBox = () => {
  return (
    <>
      <LabelTab label="채팅" />
      <MainDiv>

      </MainDiv>
    </>
  );
};

export default ChatBox;

const MainDiv = tw.div`
w-full h-[calc(100%-32px)]
dark-2
rounded-[0_10px_10px_10px]
overflow-x-hidden overflow-y-scroll
`;
