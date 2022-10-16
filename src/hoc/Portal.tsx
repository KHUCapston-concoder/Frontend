import * as ReactDOM from "react-dom";

const $portal = document.querySelector("#modal-root");

const Modal = ({ children, isShowing, close }) => {
  return isShowing && $portal
    ? ReactDOM.createPortal(
        <S.ModalWrapper className={"modal-container"} onClick={close}>
          <div className={"contents"}>{children}</div>
        </S.ModalWrapper>,
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

export default Modal;
