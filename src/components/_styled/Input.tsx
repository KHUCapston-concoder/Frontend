import React, { Dispatch, RefObject, SetStateAction } from "react";

interface PropType {
  setInput: Dispatch<SetStateAction<string>>;
  placeholder: string;
  className: string;
  label: string;
  disabled: boolean;
}

const InputBox = ({
  setInput,
  placeholder,
  className = "",
  label,
  disabled = false,
}: PropType) => {
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
        onChange={setInput}
      />
    </div>
  );
};

export default InputBox;
