import { useEffect, useRef, useState } from "react";
import LocalCam from "@/components/Cam/LocalCam";
import RemoteCam from "@/components/Cam/RemoteCam";

// stomp, sockJS
import SockJS from "socketjs-client";
import Stomp from "webstomp-client";
import { constants } from "buffer";
import { v4 as uuid } from "uuid";
import { uuidv4 } from "@/utils/commonFunc/genUuid";

// const localId = Math.random();
const localId = uuidv4();
const name = localId;
const sessionId = localId;
// console.log(typeof localId);

const CamList = () => {
  const [localStream, setLocalStream] = useState<MediaStream | undefined>(null);
  const setLocalStreamHandler = (stream) => {
    setLocalStream(stream);
  };

  // socket
  const socketUrl = `ws://localhost:3050`;
  const [ws, setWs] = useState<WebSocket | undefined>(null);
  // sockjs
  // const [socket, setSocket] = useState<WebSocket | undefined>(null);
  // const [stomp, setStommp] = useState(null);
  let socket;
  let stomp;
  // const [socketState, setSockectState] = useState<SockJS | undefined>(null);
  // const [stompState, setStompState] = useState(null);

  // socket message send 함수
  const makeMsg = (eventType, payload, from = null, to = null) => {
    const msg = { event: eventType, data: payload, from: from, to: to };
    ws?.send(JSON.stringify(msg));
  };

  // webRTC
  // 생성된 pc 정보를 가지는 map ({pc => "user02"} 형태)
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

  // window
  // const exit = () => {
  //   window.addEventListener("beforeunload", (event) => {
  //     event.preventDefault();
  //     event.returnValue = "";
  //     makeMsg("exitPage", "exit", localId);
  //     console.log("exit!!!!!");
  //   });
  // };

  // // socket message
  // const memberEnterHandler = async (parsedMsg, pc) => {
  //   console.log(
  //     parsedMsg.from + " 멤버가" + parsedMsg.data + " 방에 입장했습니다!"
  //   );
  //   pc = remoteCamRef.current.makePeerConnection();
  //   pcRef.current[parsedMsg.from] = pc;
  //   setPcsHandler(parsedMsg.from, pc);
  //   pc = remoteCamRef.current.setPeerConnection(pc, localId, parsedMsg.from);
  //   const offer = await pc.createOffer();
  //   pc.setLocalDescription(offer);
  //   makeMsg("offer", offer, localId, parsedMsg.from);
  //   console.log(parsedMsg.from + " 에게 offer 생성 후 보냄");
  // };

  // const memListHandler = (parsedMsg, pc) => {
  //   console.log("기존 멤버 리스트입니다 " + parsedMsg.data);
  //   for (let mem of parsedMsg.data) {
  //     pc = remoteCamRef.current.makePeerConnection();
  //     pcRef.current[mem] = pc;
  //     setPcsHandler(mem, pc);
  //     pc = remoteCamRef.current.setPeerConnection(pc, localId, mem);
  //   }
  // };

  // const offerHandler = async (parsedMsg, pc) => {
  //   console.log(parsedMsg.from + " 에게 offer 받음, offer : " + parsedMsg.data);
  //   pc = pcRef.current[parsedMsg.from];
  //   pc.setRemoteDescription(parsedMsg.data);
  //   console.log(parsedMsg.from + "remoteDescription 설정");
  //   const answer = await pc.createAnswer();
  //   pc.setLocalDescription(answer);
  //   console.log(parsedMsg.from + "locatDescription 설정");
  //   makeMsg("answer", answer, localId, parsedMsg.from);
  //   console.log(parsedMsg.from + "answer 생성 후 송신");
  // };

  // const answerHandler = (parsedMsg, pc) => {
  //   console.log(
  //     parsedMsg.from + " 에게 answer 받음, answer : " + parsedMsg.data
  //   );
  //   pc = pcRef.current[parsedMsg.from];
  //   pc.setRemoteDescription(parsedMsg.data);
  //   console.log("remoteDescription 설정");
  // };

  // const iceHandler = (parsedMsg, pc) => {
  //   console.log("ice 수신");
  //   pc = pcRef.current[parsedMsg.from];
  //   pc.addIceCandidate(parsedMsg.data);
  //   console.log("ice candidate 추가");
  // };

  // const memberExitHandler = (parsedMsg) => {
  //   console.log(parsedMsg.from + " member 나감!!");
  //   delete pcRef.current[parsedMsg.from];
  //   delPcsHandler(parsedMsg.from);
  // };

  // const initCall = async (joinedId) => {
  //   console.log(joinedId + " 멤버가 방에 입장했습니다!");
  //   pc = remoteCamRef.current.makePeerConnection();
  //   pcRef.current[joinedId] = pc;
  //   setPcsHandler(joinedId, pc);
  //   pc = remoteCamRef.current.setPeerConnection(pc, localId, joinedId);
  //   const offer = await pc.createOffer();
  //   pc.setLocalDescription(offer);
  //   makeMsg("offer", offer, localId, joinedId);
  //   console.log(joinedId + " 에게 offer 생성 후 보냄");
  // };

  useEffect(() => {
    let pc;
    if (localStream != null) {
      // socket 연결
      socket = new SockJS(socketUrl);
      stomp = Stomp.over(socket);
      console.log("socker: ", socket);
      console.log("stomp: ", stomp);

      stomp.connect(
        {},
        () => {
          stomp.subscribe("/sub/video/joined-room-info", async (data) => {
            let users = JSON.parse(data.body);
            let topIdx = users.length - 1;
            let joinedId = users[topIdx].id;

            if (topIdx <= 0) return;
            if (users[topIdx].id === localId) {
              console.log("기존 멤버 리스트입니다 " + users);
              for (let mem of users) {
                pc = remoteCamRef.current.makePeerConnection();
                pcRef.current[mem.id] = pc;
                setPcsHandler(mem.id, pc);
                pc = remoteCamRef.current.setPeerConnection(
                  pc,
                  localId,
                  mem.id
                );
                pc.onicecandidate = (event) => {
                  console.log("ice candidate 얻음");
                  // makeMsg("ice", event.candidate, from, to);
                  stomp.send(
                    "/pub/video/caller-info",
                    JSON.stringify({
                      from: localId,
                      to: caller,
                      signal: event.candidate,
                      type: "ice",
                    })
                  );
                };
              }
              return;
            }

            // initCall and offer
            console.log(joinedId + " 멤버가 방에 입장했습니다!");
            pc = remoteCamRef.current.makePeerConnection();
            pcRef.current[joinedId] = pc;
            setPcsHandler(joinedId, pc);
            pc = remoteCamRef.current.setPeerConnection(pc, localId, joinedId);
            pc.onicecandidate = (event) => {
              console.log("ice candidate 얻음");
              // makeMsg("ice", event.candidate, from, to);
              stomp.send(
                "/pub/video/caller-info",
                JSON.stringify({
                  from: localId,
                  to: caller,
                  signal: event.candidate,
                  type: "ice",
                })
              );
            };
            const offer = await pc.createOffer();
            pc.setLocalDescription(offer);
            // makeMsg("offer", offer, localId, joinedId);
            stomp.send(
              "/pub/video/caller-info",
              JSON.stringify({
                toCall: joinedId,
                from: localId,
                signal: offer,
                type: "offer",
              })
            );
            console.log(joinedId + " 에게 offer 생성 후 보냄");
          });

          stomp.subscribe("/sub/video/caller-info", async (data) => {
            data = JSON.parse(data.body);
            let caller = data.from;
            if (data.type === "offer") {
              let offer = data.signal;

              if (caller === localId || data.toCall !== localId) return;

              console.log(caller + " 에게 offer 받음, offer : " + offer);
              pc = pcRef.current[caller];
              pc.setRemoteDescription(offer);
              console.log("remoteDescription 설정");
              const answer = await pc.createAnswer();
              pc.setLocalDescription(answer);
              console.log("locatDescription 설정");
              // makeMsg("answer", answer, localId, data.from);
              stomp.send(
                "/pub/video/callee-info",
                JSON.stringify({ from: localId, to: caller, signal: answer })
              );
              console.log(data.from + "answer 생성 후 송신");
            } else if (data.type === "ice") {
              console.log("ice 수신");
              pc = pcRef.current[caller];
              pc.addIceCandidate(data.signal);
              console.log("ice candidate 추가");
            }
          });

          stomp.subscribe("/sub/video/callee-info", async (data) => {
            data = JSON.parse(data.body);
            let from = data.from;
            let answer = data.signal;

            if (from === localId || data.to !== localId) return;

            console.log(from + " 에게 answer 받음, answer : " + answer);
            pc = pcRef.current[from];
            pc.setRemoteDescription(answer);
            console.log("remoteDescription 설정");
          });

          stomp.send(
            "/pub/video/joined-room-info",
            JSON.stringify({ id: localId, name: name, sessionId: sessionId })
          );
        },

        () => {
          console.log("socket error");
        }
      );
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
