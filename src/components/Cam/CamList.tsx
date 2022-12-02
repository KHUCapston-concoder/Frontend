import { useEffect, useRef, useState } from "react";
import LocalCam from "@/components/Cam/LocalCam";
import RemoteCam from "@/components/Cam/RemoteCam";

// stomp, sockJS
import SockJS from "sockjs-client";
import Stomp, { Client } from "webstomp-client";

import { userInfoState } from "@/store/userInfoState";
import { useRecoilState } from "recoil";
import WebSocketContext from "@/context/WebSocketContext";

const CamList = () => {
  const [localStream, setLocalStream] = useState<MediaStream | undefined>(null);
  const setLocalStreamHandler = (stream) => {
    setLocalStream(stream);
  };

  // socket
  const socketUrl = `http://163.180.146.59/api/ws-connection`;
  const [ws, setWs] = useState<WebSocket | undefined>(null);

  // stomp
  // const [stompClient, setStompClient] = useState<Client | null>(null);

  // userInfo
  // const [userId, setUserId] = useState(null);
  // const [roomId, setRoomId] = useState(null);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  // socket message send 함수
  const makeMsg = (eventType, payload, from = null, to = null) => {
    const msg = { event: eventType, data: payload, from: from, to: to };
    ws?.send(JSON.stringify(msg));
  };

  // webRTC
  const pcRef = useRef<Object | undefined>(new Object());
  const [pcs, setPcs] = useState<Object | undefined>(new Object());
  const setPcsHandler = (memId, pc) => {
    setPcs((prev: object) => {
      return { ...prev, [memId]: pc };
    });
  };
  const delPcsHandler = (memId) => {
    setPcs((prev: object) => {
      delete prev[memId];
      return { ...prev };
    });
  };

  // test용
  const [state, setState] = useState(0);
  const handler = () => {
    setState((prev) => {
      return !prev;
    });
    console.log(pcRef);
  };

  // remoteCam Component Ref
  const remoteCamRef = useRef();

  useEffect(() => {
    let pc;
    if (localStream !== null) {
      // TODO: stompClient 가져와서 RTC 커넥트 진행
    }
    if (localStream !== null && false) {
      console.log(userId);
      console.log(roomId);

      // socket 연결
      console.log(1);
      // socket = new SockJS(socketUrl, null, {
      //   transports: ["websocket", "xhr-streaming", "xhr-polling"],
      // });
      // socket = new SockJS("/api/ws-connection");
      // console.log(2);
      // socket.onopen = () => {
      //   console.log("success");
      //   console.log("socker: ", socket);
      // };
      // socket.onerror = () => {
      //   console.log("err");
      // };
      // socket.onclose = (event) => {
      //   console.log("close");
      //   console.log(event);
      //   console.log(socket);
      // };
      // console.log(3);
      stomp = Stomp.over(
        new WebSocket("ws://163.180.146.59/api/ws-connection"),
        {
          debug: true,
        }
      );
      console.log("stomp: ", stomp);

      stomp.connect(
        {},
        () => {
          console.log("connect!");
          stomp.subscribe("/sub/video/joined-room-info", (data) => {
            console.log(data);
            console.log(JSON.parse(data.body));
          });

          stomp.send(
            "/pub/video/joined-room-info",
            JSON.stringify({
              roomId: roomId,
              userId: userId,
            })
          );
        },
        () => {
          console.log("errer");
        }
      );

      // stomp.connect(
      //   {},
      //   () => {
      //     stomp.subscribe("/sub/video/joined-room-info", async (data) => {
      //       let users = JSON.parse(data.body);
      //       let topIdx = users.length - 1;
      //       let joinedId = users[topIdx].id;

      //       if (topIdx <= 0) return;
      //       if (users[topIdx].id === localId) {
      //         console.log("기존 멤버 리스트입니다 " + users);
      //         for (let mem of users) {
      //           pc = remoteCamRef.current.makePeerConnection();
      //           pcRef.current[mem.id] = pc;
      //           setPcsHandler(mem.id, pc);
      //           pc = remoteCamRef.current.setPeerConnection(
      //             pc,
      //             localId,
      //             mem.id
      //           );
      //           pc.onicecandidate = (event) => {
      //             console.log("ice candidate 얻음");
      //             // makeMsg("ice", event.candidate, from, to);
      //             stomp.send(
      //               "/pub/video/caller-info",
      //               JSON.stringify({
      //                 from: localId,
      //                 to: caller,
      //                 signal: event.candidate,
      //                 type: "ice",
      //               })
      //             );
      //           };
      //         }
      //         return;
      //       }

      //       // initCall and offer
      //       console.log(joinedId + " 멤버가 방에 입장했습니다!");
      //       pc = remoteCamRef.current.makePeerConnection();
      //       pcRef.current[joinedId] = pc;
      //       setPcsHandler(joinedId, pc);
      //       pc = remoteCamRef.current.setPeerConnection(pc, localId, joinedId);
      //       pc.onicecandidate = (event) => {
      //         console.log("ice candidate 얻음");
      //         // makeMsg("ice", event.candidate, from, to);
      //         stomp.send(
      //           "/pub/video/caller-info",
      //           JSON.stringify({
      //             from: localId,
      //             to: caller,
      //             signal: event.candidate,
      //             type: "ice",
      //           })
      //         );
      //       };
      //       const offer = await pc.createOffer();
      //       pc.setLocalDescription(offer);
      //       // makeMsg("offer", offer, localId, joinedId);
      //       stomp.send(
      //         "/pub/video/caller-info",
      //         JSON.stringify({
      //           toCall: joinedId,
      //           from: localId,
      //           signal: offer,
      //           type: "offer",
      //         })
      //       );
      //       console.log(joinedId + " 에게 offer 생성 후 보냄");
      //     });

      //     stomp.subscribe("/sub/video/caller-info", async (data) => {
      //       data = JSON.parse(data.body);
      //       let caller = data.from;
      //       if (data.type === "offer") {
      //         let offer = data.signal;

      //         if (caller === localId || data.toCall !== localId) return;

      //         console.log(caller + " 에게 offer 받음, offer : " + offer);
      //         pc = pcRef.current[caller];
      //         pc.setRemoteDescription(offer);
      //         console.log("remoteDescription 설정");
      //         const answer = await pc.createAnswer();
      //         pc.setLocalDescription(answer);
      //         console.log("locatDescription 설정");
      //         // makeMsg("answer", answer, localId, data.from);
      //         stomp.send(
      //           "/pub/video/callee-info",
      //           JSON.stringify({ from: localId, to: caller, signal: answer })
      //         );
      //         console.log(data.from + "answer 생성 후 송신");
      //       } else if (data.type === "ice") {
      //         console.log("ice 수신");
      //         pc = pcRef.current[caller];
      //         pc.addIceCandidate(data.signal);
      //         console.log("ice candidate 추가");
      //       }
      //     });

      //     stomp.subscribe("/sub/video/callee-info", async (data) => {
      //       data = JSON.parse(data.body);
      //       let from = data.from;
      //       let answer = data.signal;

      //       if (from === localId || data.to !== localId) return;

      //       console.log(from + " 에게 answer 받음, answer : " + answer);
      //       pc = pcRef.current[from];
      //       pc.setRemoteDescription(answer);
      //       console.log("remoteDescription 설정");
      //     });

      //     stomp.send(
      //       "/pub/video/joined-room-info",
      //       JSON.stringify({ id: localId, name: name, sessionId: sessionId })
      //     );
      //   },

      //   () => {
      //     console.log("socket error");
      //   }
      // );
    }

    // ws.onopen = () => {
    //   makeMsg("enter", "workspace01", localId);
    // };

    // ws.onmessage = async (msg) => {
    //   const parsedMsg = JSON.parse(msg.data);
    //   let pc: RTCPeerConnection | undefined;
    //   switch (parsedMsg.event) {
    //     case "memberEnter":
    //       memberEnterHandler(parsedMsg, pc);
    //       break;
    //     case "memList":
    //       memListHandler(parsedMsg, pc);
    //       break;
    //     case "offer":
    //       offerHandler(parsedMsg, pc);
    //       break;
    //     case "answer":
    //       answerHandler(parsedMsg, pc);
    //       break;
    //     case "ice":
    //       iceHandler(parsedMsg, pc);
    //       break;
    //     case "memberExit":
    //       memberExitHandler(parsedMsg);
    //       break;
    //   }
  }, [localStream]);

  return (
    <>
      <div>
        <LocalCam onSetLocalStream={setLocalStreamHandler} />
      </div>
      <div>
        <RemoteCam
          ws={ws}
          localStream={localStream}
          makeMsg={makeMsg}
          pcs={pcs}
          ref={remoteCamRef}
        />
      </div>
      <button onClick={handler}>test !!</button>
    </>
  );
};

export default CamList;
