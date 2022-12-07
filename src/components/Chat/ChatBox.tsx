import React, { useState } from "react";
import LabelTab from "@/components/_styled/LabelTab";
import tw from "tailwind-styled-components";
import ChatBubble from "./ChatBubble";
import InputBox from "../_styled/Input";

const ChatBox = () => {
  const [chatContent, setChatContent] = useState<string>("");

  return (
    <>
      <LabelTab label="채팅" />
      <MainDiv>
        <ChatList>
          <ChatBubble />
          <ChatBubble />
          <ChatBubble />
          <ChatBubble />
          <ChatBubble />
          <ChatBubble mine={true} />
        </ChatList>
        <InputBox
          placeholder="채팅을 입력해주세요."
          setInput={setChatContent}
        />
      </MainDiv>
    </>
  );
};

export default ChatBox;

// const MainDiv = tw.div`
// w-full h-[calc(100%-32px)]
// overflow-h-auto
// dark-2
// rounded-[0_10px_10px_10px]
// overflow-x-hidden overflow-y-scroll
// p-[10px]
// `;
const MainDiv = tw.div`
w-full h-[calc(100%-32px)] 
overflow-h-auto
dark-2
rounded-[0_10px_10px_10px]
p-[10px]
`;

const ChatList = tw.div`
w-full h-[calc(100%-32px)] 
overflow-h-auto
p-[10px]
overflow-x-hidden overflow-y-scroll
`;
