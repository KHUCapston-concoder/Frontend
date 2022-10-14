import React, { MouseEventHandler } from "react";
import tw from "tailwind-styled-components";

interface ButtonProps {
  type: string;
  name: string;
  size: string;
  className: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const Button = tw.button`

`;

export const IconButton = ({
  type = "solid", // solid, regular, light, thin, duotone
  name = "",
  size = "", // 2x, xs, sm, lg, xl, 2xl
  className = "",
  onClick = () => {},
}: ButtonProps) => {
  return (
    <button
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClick}
    >
      <i className={`fa-${type} fa-${name} fa-${size} ${className || ""}`} />
    </button>
  );
};
