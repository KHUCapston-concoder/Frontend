import React, { Dispatch, SetStateAction } from "react";

interface PropType {
  setInput: Dispatch<SetStateAction<string>>;
  placeholder: string;
  className: string;
}

const InputBox = ({
  setInput,
  placeholder,
  className = "input input-xs w-[80%] max-w-xs",
}: PropType) => {
  return <input type="text" placeholder={placeholder} className={className} />;
};

export default InputBox;
