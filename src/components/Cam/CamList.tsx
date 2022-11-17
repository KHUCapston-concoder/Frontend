import { useEffect, useRef, useState } from "react";
import LocalCam from "./LocalCam";
import RemoteCam from "./RemoteCam";

const localId = Math.random();

const CamList = () => {
  const [localStream, setLocalStream] = useState<MediaStream | undefined>(null);
  const setLocalStreamHandler = (stream) => {
    setLocalStream(stream);
  };

  // socket
  const socketUrl = `ws://localhost:3050`;
  const [ws, setWs] = useState<WebSocket | undefined>(null);

  // socket message send 함수
  const makeMsg = (eventType, payload, from = null, to = null) => {
    const msg = { event: eventType, data: payload, from: from, to: to };
    ws?.send(JSON.stringify(msg));
  };

  // webRTC
  // 생성된 pc 정보를 가지는 map ({pc => "user02"} 형태)
  const [pcMap, setPcMap] = useState<
    Map<string, RTCPeerConnection | undefined> | undefined
  >(new Map());
  const pcs = useRef<Object | undefined>(new Object());
  const [pcState, setPcState] = useState<Object | undefined>(new Object());
  const setPcStateHandler = (memId, pc) => {
    setPcState((prev: object) => {
      return { ...prev, [memId]: pc };
    });
  };
  const delPcStateHandler = (memId) => {
    setPcState((prev: object) => {
      delete prev[memId];
      return { ...prev };
    });
  };
  // 생성된 dc 정보를 가지는 map
  const [dcMap, setDcMap] = useState<
    Map<string, RTCDataChannel | undefined> | undefined
  >(new Map());

  // test용
  const [state, setState] = useState(0);
  const handler = () => {
    setState((prev) => {
      return !prev;
    });
    console.log(pcMap);
  };

  // remoteCam Component Ref
  const remoteCamRef = useRef();

  // window
  const exit = () => {
    window.addEventListener("beforeunload", (event) => {
      event.preventDefault();
      event.returnValue = "";
      makeMsg("exitPage", "exit", localId);
      console.log("exit!!!!!");
    });
  };

  useEffect(() => {
    exit();
    if (localStream != null) {
      // socket 연결
      if (ws === null) {
        setWs(new WebSocket(socketUrl));
      } else if (ws != null) {
        ws.onopen = () => {
          makeMsg("enter", "workspace01", localId);
        };

        ws.onmessage = async (msg) => {
          const parsedMsg = JSON.parse(msg.data);
          let pc: RTCPeerConnection | undefined;
          switch (parsedMsg.event) {
            case "memberEnter":
              console.log(
                parsedMsg.from +
                  " 멤버가" +
                  parsedMsg.data +
                  " 방에 입장했습니다!"
              );
              pc = remoteCamRef.current.makePeerConnection();
              pcs.current[parsedMsg.from] = pc;
              pcMap?.set(parsedMsg.from, pc);
              setPcStateHandler(parsedMsg.from, pc);
              pc = remoteCamRef.current.setPeerConnection(
                pc,
                localId,
                parsedMsg.from
              );
              const offer = await pc.createOffer();
              pc.setLocalDescription(offer);
              makeMsg("offer", offer, localId, parsedMsg.from);
              console.log(parsedMsg.from + " 에게 offer 생성 후 보냄");
              break;
            case "memList":
              console.log("기존 멤버 리스트입니다 " + parsedMsg.data);
              for (let mem of parsedMsg.data) {
                pc = remoteCamRef.current.makePeerConnection();
                pcs.current[mem] = pc;
                pcMap?.set(mem, pc);
                setPcStateHandler(mem, pc);
                pc = remoteCamRef.current.setPeerConnection(pc, localId, mem);
              }
              break;
            case "offer":
              console.log(
                parsedMsg.from + " 에게 offer 받음, offer : " + parsedMsg.data
              );
              pc = pcs.current[parsedMsg.from];
              pc = pcMap?.get(parsedMsg.from);
              // pcState[parsedMsg.from]
              pc.setRemoteDescription(parsedMsg.data);
              console.log(parsedMsg.from + "remoteDescription 설정");
              const answer = await pc.createAnswer();
              pc.setLocalDescription(answer);
              console.log(parsedMsg.from + "locatDescription 설정");
              makeMsg("answer", answer, localId, parsedMsg.from);
              console.log(parsedMsg.from + "answer 생성 후 송신");
              break;
            case "answer":
              console.log(
                parsedMsg.from + " 에게 answer 받음, answer : " + parsedMsg.data
              );
              pc = pcs.current[parsedMsg.from];
              pc = pcMap?.get(parsedMsg.from);
              pc.setRemoteDescription(parsedMsg.data);
              console.log("remoteDescription 설정");
              break;
            case "ice":
              console.log("ice 수신");
              pc = pcs.current[parsedMsg.from];
              pc = pcMap?.get(parsedMsg.from);
              pc.addIceCandidate(parsedMsg.data);
              console.log("ice candidate 추가");
              break;
            case "memberExit":
              console.log(parsedMsg.from + " member 나감!!");
              delete pcs.current[parsedMsg.from];
              delPcStateHandler(parsedMsg.from);
              pcMap?.delete(parsedMsg.from);

              break;
          }
        };
      }
    }

    return () => {
      ws?.close();
    };
  }, [localStream, ws]);

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
          pcMap={pcMap}
          pcs={pcs}
          pcState={pcState}
          ref={remoteCamRef}
        />
      </div>
      <button onClick={handler}>test !!</button>
    </>
  );
};

export default CamList;
