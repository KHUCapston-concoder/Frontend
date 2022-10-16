import React, { Dispatch, SetStateAction } from "react";

interface PropType {
  setInput: Dispatch<SetStateAction<string>>;
  placeholder: string;
  className: string;
  label: string;
  disabled: boolean;
  type: string;
}

const InputBox = ({
  setInput,
  placeholder,
  className = "",
  label,
  disabled = false,
  type = "input",
}: PropType) => {
  return (
    <div className="my-[2px] w-full px-[12px] py-[4px]">
      <div className="w-full text-left text-xs font-bold">
        {label != undefined && `· ${label}`}
      </div>
      {type == "textarea" ? (
        <textarea
          placeholder={placeholder}
          className={className + " input input-xs mt-[4px]"}
          disabled={disabled}
        />
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          className={className + " input input-xs mt-[4px]"}
          disabled={disabled}
        />
      )}
    </div>
  );
};

export default InputBox;
