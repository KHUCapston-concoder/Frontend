import React, { Dispatch, RefObject, SetStateAction, useRef } from "react";

interface PropType {
  setInput: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  className?: string;
  label?: string;
  disabled?: boolean;
}

const InputBox = ({
  setInput,
  placeholder,
  className = "",
  label,
  disabled = false,
}: PropType) => {
  const inputRef = useRef(null);
  return (
    <div className="my-[2px] w-full px-[12px] py-[4px]">
      <div className="w-full text-left text-xs font-bold">
        {label != undefined && `· ${label}`}
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className={className + " input input-xs mt-[4px]"}
        disabled={disabled}
        ref={inputRef}
        onChange={() =>
          setInput(inputRef.current ? inputRef.current.value : "")
        }
      />
    </div>
  );
};

// 채팅용 InputBox (엔터 입력 이벤트 추가됨, 추후 InputBox와 결합 논의 필요)
export const InputChatBox = ({
  setInput,
  placeholder,
  className = "",
  label,
  disabled = false,
  enterHandler,
}: {
  PropType;
  enterHandler: Function;
}) => {
  const inputRef = useRef(null);
  return (
    <div className="my-[2px] w-full px-[12px] py-[4px]">
      <div className="w-full text-left text-xs font-bold">
        {label != undefined && `· ${label}`}
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className={className + " input input-xs mt-[4px]"}
        disabled={disabled}
        ref={inputRef}
        onChange={() =>
          setInput(inputRef.current ? inputRef.current.value : "")
        }
        onKeyPress={() => {
          if (event.keyCode == 13) {
            event?.preventDefault();
            enterHandler();
          }
        }}
      />
    </div>
  );
};

export default InputBox;
