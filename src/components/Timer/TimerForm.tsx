import { useState } from "react";
import tw from "tailwind-styled-components";
import styled from "styled-components";
import { TimerProps } from "./PopupBtn";

const TimerForm = ({
  onClose,
  onShowTimerToast,
  onClickTimerStart,
}: TimerProps) => {
  // timer 입력 시간관련 state, handelr
  const [timerInputs, setTimerInputs] = useState({
    hour: parseInt(0),
    min: parseInt(0),
    sec: parseInt(0),
  });

  const hourChangeHandler = (event: React.MouseEvent<HTMLElement>) => {
    setTimerInputs((prevState) => {
      return { ...prevState, hour: parseInt(event.target.value) };
    });
  };
  const minChangeHandler = (event: React.MouseEvent<HTMLElement>) => {
    setTimerInputs((prevState) => {
      return { ...prevState, min: parseInt(event.target.value) };
    });
  };
  const secChangeHandler = (event: React.MouseEvent<HTMLElement>) => {
    setTimerInputs((prevState) => {
      return { ...prevState, sec: parseInt(event.target.value) };
    });
  };

  // 시작하기 버튼 클릭 시, TimerToast 띄우고 TimerForm은 내리기
  const clickTimerStartHandler = () => {
    onClickTimerStart(timerInputs.hour, timerInputs.min, timerInputs.sec);
    onShowTimerToast();
    onClose();
  };

  return (
    <>
      <TimerModal>
        <TimerFormMainDiv>
          <TimerTitle>타이머 시간을 설정하세요.</TimerTitle>
          <TimerSettings>
            <TimerInputBox>
              <TimerInput
                name="hour"
                placeholder="0"
                type="number"
                min="1"
                onChange={hourChangeHandler}
                value={timerInputs.hour}
              />
              {/* <InputBox placeholder="0" /> */}
              <p>h</p>
            </TimerInputBox>
            <TimerInputBox>
              <TimerInput
                name="min"
                placeholder="0"
                type="number"
                min="0"
                max="59"
                onChange={minChangeHandler}
                value={timerInputs.min}
              />
              {/* <InputBox placeholder="0" /> */}
              <p>m</p>
            </TimerInputBox>
            <TimerInputBox>
              <TimerInput
                name="sec"
                placeholder="0"
                type="number"
                min="0"
                max="59"
                onChange={secChangeHandler}
                value={timerInputs.sec}
              />
              {/* <InputBox placeholder="0" /> */}
              <p>s</p>
            </TimerInputBox>
          </TimerSettings>
          <TimerAction>
            <TimerBtn onClick={clickTimerStartHandler}>시작하기</TimerBtn>
            {/* <TimerBtn onClick={onClose}>뒤로가기</TimerBtn> */}
          </TimerAction>
        </TimerFormMainDiv>
      </TimerModal>
    </>
  );
};

export default TimerForm;

const TimerModal = styled.div`
  position: fixed;
  top: 40%;
  left: 30%;
  width: 40%;
  padding: 1rem;
  border-radius: 14px;
  z-index: 30;
`;

const TimerFormMainDiv = tw.div`
flex
flex-col
items-center
`;

const TimerTitle = tw.p`
text-lg
mb-4
`;

const TimerSettings = tw.div`
flex
flex-row
justify-center
`;

const TimerInputBox = tw.div`
flex
flex-row
`;

const TimerInput = tw.input`
input
input-xs
bg-accent
text-black
placeholder-black
w-12
`;

const TimerAction = tw.div`
flex
flex-row
justify-center
mt-4
w-fit
f-fit
`;

const TimerBtn = tw.button`
text-black
w-20
mx-4
bg-accent
rounded-[10px]
`;
