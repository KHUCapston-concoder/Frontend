import { IconButton } from "@/components/_styled/Buttons";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";
import tw from "tailwind-styled-components";

const $portal = document.querySelector("#modal-root");

interface PropType {
  width: string;
  height: string;
  children: ReactNode;
  isShowing: boolean;
  close: Dispatch<SetStateAction<boolean>>;
}

const Modal = ({ children, isShowing, close, width, height }: PropType) => {
  return isShowing && $portal
    ? ReactDOM.createPortal(
        <ModalWrapper onClick={close}>
          <ModalContainer style={{ width: width, height: height }}>
            <CloseButton>
              <IconButton name="close" onClick={close} />
            </CloseButton>
            {children}
          </ModalContainer>
        </ModalWrapper>,
        $portal
      )
    : null;
};

export const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4); // 바깥 배경 밝기
  z-index: 10;
`;

const ModalContainer = tw.div`
dark-2 
w-[60%] h-1/2
rounded-[10px] z-100
`;

const CloseButton = tw.div`
relative float-right w-fit p-[10px_14px]
`;

export default Modal;
