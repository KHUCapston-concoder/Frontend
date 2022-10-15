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
  className = "input input-xs w-[80%] max-w-xs",
  label,
}: PropType) => {
  return (
    <div className="my-[2px] w-full px-[12px] py-[4px]">
      <div className="w-full text-left text-xs font-bold">
        {label != undefined && `· ${label}`}
      </div>
      <input
        className="mt-[4px]"
        type="text"
        placeholder={placeholder}
        className={className}
      />
    </div>
  );
};

export default InputBox;
