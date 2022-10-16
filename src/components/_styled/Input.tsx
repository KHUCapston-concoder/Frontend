import React, { Dispatch, SetStateAction } from "react";

interface PropType {
  setInput: Dispatch<SetStateAction<string>>;
  placeholder: string;
  className: string;
  label: string;
}

const InputBox = ({
  setInput,
  placeholder,
  className = "",
  label,
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
      />
    </div>
  );
};

export default InputBox;
