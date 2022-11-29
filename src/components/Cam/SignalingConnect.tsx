import Stomp, { Client } from "webstomp-client";
import axios from "axios";
import { useEffect, useState } from "react";

const SignalingConnect = () => {
  const [stompClient, setStompClient] = useState<Client | undefined>(null);

  useEffect(() => {
    if (stompClient === null) {
      setStompClient(
        // TODO: 추후 sockJS로 생성하기
        Stomp.over(new WebSocket("ws://163.180.146.59/api/ws-connection"), {
          debug: true,
        })
      );
    } else if (stompClient !== null) {
      stompClient?.connect(
        {},
        () => {
          // 해당 endpoint 구독
          stompClient.subscribe("/sub/video/joined-room-info", (data) => {
            console.log(JSON.parse(data.body));
          });

          // 해당 endpoint 구독
          stompClient.subscribe("/sub/video/unjoined-room-info", (data) => {
            console.log(JSON.parse(data.body));
          });

          // connect되면 해당 endpoint로 메세지 전달 (입장 정보 전달)
          stompClient.send(
            "/pub/video/joined-room-info",
            JSON.stringify({ roomId: "", userId: "", sessionId: "" })
          );
        },
        () => {
          console.log("error has occurred while trying to connect stompClient");
        }
      );
    }
  }, [stompClient]);
};

export default SignalingConnect;
