import { useEffect, useRef } from "react";

const LocalCam = ({ onSetLocalStream }) => {
  const localStream = useRef<MediaStream | undefined>(null);
  const localCam = useRef<HTMLVideoElement | undefined>(null);
  const cameraBtn = useRef<HTMLButtonElement | undefined>(null);
  const muteBtn = useRef<HTMLButtonElement | undefined>(null);

  // 현재 카메라 off 상태 담는 변수 (컴포넌트 재실행할 필요 없어서 state가 아닌 변수로 관리)
  let cameraOff = false;
  // 현재 오디오 off 상태 담는 변수 (컴포넌트 재실행할 필요 없어서 state가 아닌 변수로 관리)
  let muted = false;

  // cam on/off 관리 함수
  const camClickHandler = () => {
    localStream.current?.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    if (cameraBtn.current != null) {
      if (cameraOff) {
        cameraBtn.current.innerText = "Cam Off";
        cameraOff = false;
      } else {
        cameraBtn.current.innerText = "Cam On";
        cameraOff = true;
      }
    }
  };

  // audio on/off 관리 함수
  const muteClickHandler = () => {
    localStream.current?.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });
    if (muteBtn.current != null) {
      if (muted) {
        muteBtn.current.innerText = "Mute";
        muted = false;
      } else {
        muteBtn.current.innerText = "Unmute";
        muted = true;
      }
    }
  };

  const getMedia = async () => {
    try {
      localStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: { facingMode: "true" },
      });
      if (localCam.current != null) {
        localCam.current.srcObject = localStream.current;
        localCam.current.play();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(async () => {
    await getMedia();
    onSetLocalStream(localStream.current);
  }, []);

  return (
    <>
      <video id="localCam" ref={localCam}></video>
      <button onClick={camClickHandler} ref={cameraBtn}>
        Cam Off
      </button>
      <button onClick={muteClickHandler} ref={muteBtn}>
        Mute
      </button>
    </>
  );
};

export default LocalCam;
