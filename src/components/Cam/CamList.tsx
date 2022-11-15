import { useEffect, useRef, useState } from "react";
import LocalCam from "./LocalCam";

const CamList = () => {
  const [localStream, setLocalStream] = useState<MediaStream | undefined>(null);
  const setLocalStreamHandler = (stream) => {
    setLocalStream(stream);
  };

  // socket
  const socketUrl = `ws://localhost:3050`;
  const ws = useRef<WebSocket | null>(null);

  // socket message send 함수
  const makeMsg = (eventType, payload) => {
    const msg = { event: eventType, data: payload };
    ws.current?.send(JSON.stringify(msg));
  };

  // webRTC
  let config = null;
  let peerConnection;
  const memCam = useRef<HTMLVideoElement | undefined>(null);

  // webRTC
  const makeConnection = () => {
    // RTC connection 객체 생성
    peerConnection = new RTCPeerConnection(config);
    // 다른 user(원격 user)에게 트랙을 받을 경우에 대해 eventListener 추가
    peerConnection.ontrack = (event) => {
      if (memCam != null) {
        memCam.current.srcObject = event.streams[0];
        memCam.current.play();
      }
    };

    if (localStream != null) {
      // 다른 user(원격 user)에게 전송될 트랙들에 myStream의 오디오, 비디오 트랙을 추가
      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });
      // iceCandidate listener 추가
      peerConnection.onicecandidate = (event) => {
        console.log("ice candidate 얻음");
        makeMsg("ice", event.candidate);
      };
    }
  };

  useEffect(async () => {
    if (localStream != null) {
      // socket 연결
      ws.current = new WebSocket(socketUrl);
      // socket 연결 시, workspace에 입장했음을 socket server에 알림. (추후 server는 해당 workspace의 다른 user들에게 user 입장에 대한 socket msg 보냄)
      ws.current.onopen = () => {
        // workspace id를 data로 담아 workspace 입장에 대한 socket msg 보냄
        makeMsg("enter", "workspace01");
      };

      makeConnection();

      // 다른 user가 workspace 입장 시, local user가 받을 socket message에 대한 리스너 추가 (offer 생성 및 전송을 위해)
      if (ws != null) {
        ws.current.onmessage = async (msg) => {
          const parsedMsg = JSON.parse(msg.data);
          const eventType = parsedMsg.event;
          const data = parsedMsg.data;
          switch (eventType) {
            case "enter":
              console.log("멤버가 입장했습니다!");
              const offer = await peerConnection.createOffer();
              peerConnection.setLocalDescription(offer);
              makeMsg("offer", offer);
              console.log("offer 생성 후 보냄");
              break;
            case "offer":
              console.log("offer 받음");
              peerConnection.setRemoteDescription(data);
              console.log("remoteDescription 설정");
              const answer = await peerConnection.createAnswer();
              peerConnection.setLocalDescription(answer);
              makeMsg("answer", answer);
              console.log("answer 생성 후 송신");
              break;
            case "answer":
              console.log("answer 수신");
              peerConnection.setRemoteDescription(data);
              console.log("remoteDescription 설정");
            case "ice":
              console.log("ice 수신");
              peerConnection.addIceCandidate(data);
              console.log("ice candidate 추가");
          }
        };
      }
    }
  }, [localStream, memCam]);

  return (
    <>
      <div>
        <LocalCam onSetLocalStream={setLocalStreamHandler} />
      </div>
      <div>
        <video id="memCam" ref={memCam}></video>
      </div>
    </>
  );
};

export default CamList;
