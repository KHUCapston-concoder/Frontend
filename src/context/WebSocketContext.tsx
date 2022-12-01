import { userInfoState } from "@/store/userInfoState";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import Stomp, { Client } from "webstomp-client";

const WebSocketContext = React.createContext<any>(null);
export { WebSocketContext };

export default ({ children }: { children: React.ReactNode }) => {
  const webSocketUrl = "ws://163.180.146.59/api/ws-connection";

  const [stompClient, setStompClient] = useState<Client | null>(null);
  const userInfo = useRecoilValue(userInfoState);

  const createStomp = async () => {
    try {
      if (!stompClient) {
        const stompObj = await Stomp.over(new WebSocket(webSocketUrl), {
          debug: true,
        });
        setStompClient(stompObj);
      } else {
        sendRoomInfo();
      }
    } catch (e) {
      console.error("Can't Create Stomp");
    }
  };

  const disconnectStomp = () => {};

  const sendRoomInfo = () => {
    console.log(stompClient);

    stompClient?.connect(
      {},
      () => {
        stompClient.send(
          `/video/joined-room-info/${userInfo.workspaceId}`,
          JSON.stringify({
            sessionId: userInfo.userId,
            userId: userInfo.userId,
          })
        );
        console.log("connect");
      },
      () => {
        console.error("Can't Connect Stomp");
      }
    );
  };

  useEffect(() => {
    createStomp();
  }, [stompClient]);

  return (
    <WebSocketContext.Provider value={stompClient}>
      {children}
    </WebSocketContext.Provider>
  );
};
