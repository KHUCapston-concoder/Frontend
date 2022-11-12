import { useEffect, useRef } from "react";
import { Button } from "../_styled/Buttons";

const CamList = () => {
  let myStream: MediaStream;
  const myCam = useRef<HTMLVideoElement | undefined>(null);
  const cameraBtn = useRef<HTMLButtonElement | undefined>(null);

  // 현재 카메라 off 상태 담는 변수 (컴포넌트 재실행할 필요 없어서 state가 아닌 변수로 관리)
  let cameraOff = false;

  const camClickHandler = () => {
    myStream.getVideoTracks().forEach((track) => {
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

  const getMedia = async () => {
    try {
      myStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: { facingMode: "true" },
      });
      if (myCam.current != null) {
        myCam.current.srcObject = myStream;
        myCam.current.play();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMedia();
  }, [myCam]);

  return (
    <>
      <div>
        <video id="myCam" ref={myCam}></video>
        <Button onClick={camClickHandler} ref={cameraBtn}>
          Cam Off
        </Button>
      </div>
    </>
  );
};

export default CamList;
