import React, { useEffect, useRef, useState } from "react";
import Stomp, { Client } from "webstomp-client";

const WebSocketContext = React.createContext<any>(null);
export { WebSocketContext };

export default ({ children }: { children: React.ReactNode }) => {
  const webSocketUrl = "ws://163.180.146.59/api/ws-connection";

  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    if (!stompClient) {
      const stompObj = Stomp.over(new WebSocket(webSocketUrl), {
        debug: true,
      });
      setStompClient(stompObj);
    }
  }, [stompClient]);

  return (
    <WebSocketContext.Provider value={stompClient}>
      {children}
    </WebSocketContext.Provider>
  );
};
