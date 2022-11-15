import { useEffect, useRef } from "react";

const RemoteCam = ({ ws, localStream, onSetPeerConnection }) => {
  const remoteCam = useRef<HTMLVideoElement | undefined>(null);
  let config = null;
  let peerConnection: RTCPeerConnection | undefined;

  // socket message send 함수
  const makeMsg = (eventType, payload) => {
    const msg = { event: eventType, data: payload };
    ws?.send(JSON.stringify(msg));
  };

  // webRTC
  const makeConnection = () => {
    // RTC connection 객체 생성
    peerConnection = new RTCPeerConnection(config);
    // 다른 user(원격 user)에게 트랙을 받을 경우에 대해 eventListener 추가
    peerConnection.ontrack = async (event) => {
      if (remoteCam != null) {
        remoteCam.current.srcObject = event.streams[0];
        let playPromise = remoteCam.current.play();
        if (playPromise != null) {
          playPromise
            .then((_) => {
              // console.log(_);
            })
            .catch((err) => {
              console.log(err);
            });
        }
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

  useEffect(() => {
    if (ws != null) {
      makeConnection();
      onSetPeerConnection(peerConnection);
    }
  }, [ws]);

  return (
    <>
      <video id="memCam" ref={remoteCam}></video>
    </>
  );
};

export default RemoteCam;
