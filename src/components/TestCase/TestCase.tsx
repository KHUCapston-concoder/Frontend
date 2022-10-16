import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { IconButton } from "../_styled/Buttons";
import InputBox from "@/components/_styled/Input";

interface PropType {
  testCaseNo: number;
}

const TestCase = ({ testCaseNo = 1 }) => {
  const [isCompileSuccess, setIsCompileSuccess] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const onClickDotMenu = () => {};
  return (
    <MainDiv>
      <MenuBar>
        <div className="flex items-center gap-[8px]">
          {`#${testCaseNo}`}
          {isCompileSuccess ? (
            <CompileResultDiv>
              <i className="fa-solid fa-check" />
              {"  "} 컴파일 성공
            </CompileResultDiv>
          ) : (
            <CompileResultDiv>
              <i className="fa-solid fa-triangle-exclamation" />
              {"  "}컴파일 실패
            </CompileResultDiv>
          )}
        </div>
        {/* dot menu dropdown */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0}>
            <IconButton
              onClick={onClickDotMenu}
              width="fit-content"
              name="ellipsis-vertical"
            />
          </label>
          <DropdownUl tabIndex={0}>
            <DropdownLi>
              <DropdownA>수정</DropdownA>
            </DropdownLi>
            <DropdownLi>
              <DropdownA className="font-warning">삭제</DropdownA>
            </DropdownLi>
          </DropdownUl>
        </div>
      </MenuBar>
      <InputBox
        label="입력"
        type="textarea"
        className="h-fit w-full"
        disabled={!isEditing}
      />
      <InputBox label="출력" type="textarea" className="h-fit w-full" />
    </MainDiv>
  );
};

export default TestCase;

const MainDiv = tw.div`
dark-1
w-[100%-20px] h-fit min-h-[140px]
mx-[10px] my-[10px] p-[10px_0_10px_0]
flex flex-col justify-between
rounded-[10px]
`;

const MenuBar = tw.div`
w-full h-[20px]
flex justify-between items-center
px-[10px] mb-[10px]
relative top-[0]
text-sm font-bold text-white
`;

const CompileResultDiv = tw.div`
w-fit h-fit
p-[0_6px]
rounded-[10px]
bg-accent
text-neutral font-bold text-2xs 
`;

const DropdownUl = tw.ul`
dropdown-content menu rounded-box w-20 
bg-base-100 p-[5px] text-sm shadow"
`;

const DropdownLi = tw.li`
text-2xs
flex justify-center items-center
`;

const DropdownA = tw.a`
py-[4px]
`;
