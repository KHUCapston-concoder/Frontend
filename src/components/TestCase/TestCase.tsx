import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import tw from "tailwind-styled-components";
import { IconButton } from "../_styled/Buttons";
import Textarea from "@/components/_styled/TextArea";
import { useRecoilState } from "recoil";
import { testCaseState } from "@/store/testCaseState";

interface PropType {
  testCaseNo: number;
  inputVal?: string;
  outputVal?: string;
  disabled?: boolean;
  setIsAdding: Dispatch<SetStateAction<boolean>>;
  compileResult?: string | null;
}

const TestCase = ({
  testCaseNo,
  inputVal,
  outputVal,
  disabled,
  setIsAdding,
  compileResult = null,
}: PropType) => {
  const [testCases, setTestCases] = useRecoilState(testCaseState);

  const [isEditing, setIsEditing] = useState(true);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);

  const onDeleteTestCase = () => {
    const newList = testCases.list.filter((item, idx) => idx !== testCaseNo);

    setTestCases({ list: newList });
    setIsAdding(false);
  };

  const onSaveTestCase = () => {
    console.log(inputRef.current?.value, outputRef.current?.value);

    const newObj = {
      input: inputRef.current?.value,
      output: outputRef.current?.value,
    };

    const newList = [...testCases.list, newObj];

    console.log(newList);

    setTestCases({ list: newList });
    setIsEditing(false);
    setIsAdding(false);
  };

  return (
    <MainDiv>
      <MenuBar>
        <div className="flex items-center gap-[8px]">
          {`#${testCaseNo + 1}`}
          {/* 테스트 케이스 컴파일 성공 여부 */}
          {!isEditing && (
            <>
              {compileResult == "success" && (
                <CompileResultDiv>
                  <i className="fa-solid fa-check" />
                  {"  "} 컴파일 성공
                </CompileResultDiv>
              )}
              {compileResult == "fail" && (
                <CompileResultDiv>
                  <i className="fa-solid fa-triangle-exclamation" />
                  {"  "}컴파일 실패
                </CompileResultDiv>
              )}
            </>
          )}
        </div>
        {/* 삭제/저장 버튼 */}
        <div className="flex gap-[14px]">
          {isEditing && (
            <IconButton
              name="check"
              width="fit-content"
              onClick={onSaveTestCase}
            />
          )}
          <IconButton
            name="close"
            width="fit-content"
            onClick={onDeleteTestCase}
          />
        </div>
      </MenuBar>
      {/* inputs */}
      <Textarea
        label="입력"
        className="h-fit w-full"
        disabled={!isEditing || disabled}
        placeholder={inputVal}
        ref={inputRef}
      />
      <Textarea
        label="출력"
        className="h-fit w-full"
        disabled={!isEditing || disabled}
        placeholder={outputVal}
        ref={outputRef}
      />
      {/* 취소 & 저장 버튼 */}
      {isEditing && <></>}
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

const DropdownA = tw.a`
py-[4px]
`;
