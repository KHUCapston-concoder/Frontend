import { useEffect, useRef, useState } from "react";
import LocalCam from "@/components/Cam/LocalCam";
import RemoteCam from "@/components/Cam/RemoteCam";
import SignalingConnect from "./SignalingConnect";

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
  const exit = () => {
    window.addEventListener("beforeunload", (event) => {
      event.preventDefault();
      event.returnValue = "";
      makeMsg("exitPage", "exit", localId);
      console.log("exit!!!!!");
    });
  };

  // socket message
  const memberEnterHandler = async (parsedMsg, pc) => {
    console.log(
      parsedMsg.from + " 멤버가" + parsedMsg.data + " 방에 입장했습니다!"
    );
    pc = remoteCamRef.current.makePeerConnection();
    pcRef.current[parsedMsg.from] = pc;
    setPcsHandler(parsedMsg.from, pc);
    pc = remoteCamRef.current.setPeerConnection(pc, localId, parsedMsg.from);
    const offer = await pc.createOffer();
    pc.setLocalDescription(offer);
    makeMsg("offer", offer, localId, parsedMsg.from);
    console.log(parsedMsg.from + " 에게 offer 생성 후 보냄");
  };

  const memListHandler = (parsedMsg, pc) => {
    console.log("기존 멤버 리스트입니다 " + parsedMsg.data);
    for (let mem of parsedMsg.data) {
      pc = remoteCamRef.current.makePeerConnection();
      pcRef.current[mem] = pc;
      setPcsHandler(mem, pc);
      pc = remoteCamRef.current.setPeerConnection(pc, localId, mem);
    }
  };

  const offerHandler = async (parsedMsg, pc) => {
    console.log(parsedMsg.from + " 에게 offer 받음, offer : " + parsedMsg.data);
    pc = pcRef.current[parsedMsg.from];
    pc.setRemoteDescription(parsedMsg.data);
    console.log(parsedMsg.from + "remoteDescription 설정");
    const answer = await pc.createAnswer();
    pc.setLocalDescription(answer);
    console.log(parsedMsg.from + "locatDescription 설정");
    makeMsg("answer", answer, localId, parsedMsg.from);
    console.log(parsedMsg.from + "answer 생성 후 송신");
  };

  const answerHandler = (parsedMsg, pc) => {
    console.log(
      parsedMsg.from + " 에게 answer 받음, answer : " + parsedMsg.data
    );
    pc = pcRef.current[parsedMsg.from];
    pc.setRemoteDescription(parsedMsg.data);
    console.log("remoteDescription 설정");
  };

  const iceHandler = (parsedMsg, pc) => {
    console.log("ice 수신");
    pc = pcRef.current[parsedMsg.from];
    pc.addIceCandidate(parsedMsg.data);
    console.log("ice candidate 추가");
  };

  const memberExitHandler = (parsedMsg) => {
    console.log(parsedMsg.from + " member 나감!!");
    delete pcRef.current[parsedMsg.from];
    delPcsHandler(parsedMsg.from);
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
              memberEnterHandler(parsedMsg, pc);
              break;
            case "memList":
              memListHandler(parsedMsg, pc);
              break;
            case "offer":
              offerHandler(parsedMsg, pc);
              break;
            case "answer":
              answerHandler(parsedMsg, pc);
              break;
            case "ice":
              iceHandler(parsedMsg, pc);
              break;
            case "memberExit":
              memberExitHandler(parsedMsg);
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
      <SignalingConnect />
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
