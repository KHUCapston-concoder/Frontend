import React, { useState, useContext, useEffect } from "react";
import LabelTab from "@/components/_styled/LabelTab";
import tw from "tailwind-styled-components";
import ChatBubble from "./ChatBubble";
import { InputChatBox } from "../_styled/Input";
import { userInfoState } from "@/store/userInfoState";
import { useRecoilState } from "recoil";
import { WebSocketContext } from "@/context/WebSocketContext";

const ChatBox = () => {
  const [chatContent, setChatContent] = useState<string>("");
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const stompClient = useContext(WebSocketContext);

  const sendChat = () => {
    stompClient.send(
      `/pub/video/chat/${userInfo.workspaceId}`,
      JSON.stringify({ userId: userInfo.userId, content: chatContent })
    );
  };

  useEffect(() => {
    if (stompClient.connected === true) {
      stompClient.subscribe(
        `/sub/video/chat/${userInfo.workspaceId}`,
        (msg) => {
          console.log(JSON.parse(msg.body));
        }
      );
    }
  }, [stompClient.connected]);

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
        <InputChatBox
          placeholder="채팅을 입력해주세요."
          setInput={setChatContent}
          enterHandler={sendChat}
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
