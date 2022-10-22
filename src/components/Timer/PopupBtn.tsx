import React, { useState } from "react";
import { IconButton } from "@/components/_styled/Buttons";
import TimerForm from "./TimerForm";
import TimerPortal from "./TimerPortal";
import TimerToast from "./TimerToast";
import Modal from "@/hoc/Portal";

interface Time {
  hour: number;
  min: number;
  sec: number;
}
export interface TimerProps {
  onClose: () => void;
  onShowTimerToast: () => void;
  onClickTimerStart: (hour: number, min: number, sec: number) => void;
}

export interface TimerToastProps {
  timeData: Time;
  onTimerReset: () => void;
  onClose: () => void;
}

const TimerPopupBtn = () => {
  // timerForm관련 state
  const [timerFromIsShowing, setTimerFormIsShowing] = useState(false);

  const showTimerFormHandler = () => {
    setTimerFormIsShowing(true);
  };

  const hideTimerFormHandler = () => {
    setTimerFormIsShowing(false);
  };

  // timerToast관련 state, handler
  const [timerToastIsShowing, setTimerToastIsShowing] = useState(false);

  const showTimerToastHandler = () => {
    setTimerToastIsShowing(true);
  };
  const hideTimerToastHandler = () => {
    setTimerToastIsShowing(false);
  };

  // timer 입력 시간관련 state, handelr
  const [timerInputs, setTimerInputs] = useState({
    hour: parseInt(0),
    min: parseInt(0),
    sec: parseInt(0),
  });

  const timerSettingHandler = (hour: number, min: number, sec: number) => {
    setTimerInputs((prevState) => {
      return { ...prevState, hour: hour, min: min, sec: sec };
    });
  };

  return (
    <>
      {/* <TimerPortal
        children={
          <TimerForm
            onClickTimerStart={timerSettingHandler}
            onClose={hideTimerFormHandler}
            onShowTimerToast={showTimerToastHandler}
          />
        }
        isShowing={timerFromIsShowing}
      /> */}

      <Modal
        children={
          <TimerForm
            onClickTimerStart={timerSettingHandler}
            onClose={hideTimerFormHandler}
            onShowTimerToast={showTimerToastHandler}
          />
        }
        isShowing={timerFromIsShowing}
        close={hideTimerFormHandler}
      />

      {/* <TimerPortal
        children={
          <TimerToast
            timeData={timerInputs}
            onClose={hideTimerToastHandler}
            onTimerReset={showTimerFormHandler}
          />
        }
        isShowing={timerToastIsShowing}
      /> */}

      <Modal
        children={
          <TimerToast
            timeData={timerInputs}
            onClose={hideTimerToastHandler}
            onTimerReset={showTimerFormHandler}
          />
        }
        isShowing={timerToastIsShowing}
        close={hideTimerToastHandler}
      />

      <IconButton name="stopwatch" size="lg" onClick={showTimerFormHandler} />
    </>
  );
};

export default TimerPopupBtn;
