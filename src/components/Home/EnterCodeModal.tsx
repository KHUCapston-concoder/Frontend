import React, { useEffect, useState } from "react";
import { generateNickname } from "@/utils/commonFunc/genNickname";
import tw from "tailwind-styled-components";
import InputBox from "@/components/_styled/Input";
import { useNavigate } from "react-router-dom";

const EnterCodeModal = () => {
  const [nickname, setNickname] = useState<string>("");
  const [workspaceId, setWorkspaceId] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const savedNickname = localStorage.getItem("nickname") || "";
    setNickname(savedNickname);

    if (nickname == "") makeNickname();
  }, []);

  const makeNickname = () => {
    const newNickname = generateNickname();
    setNickname(newNickname);
  };

  const enterWorkspace = () => {
    /* @todo 이 코드의 방이 있는지 확인*/
    console.log(workspaceId);

    localStorage.setItem("nickname", nickname);
    navigate(`/workspace/${workspaceId}`);
  };

  return (
    <MainDiv>
      <NicknameDiv>
        <NicknameHolder>{nickname} </NicknameHolder>님 안녕하세요!
        <LinkDiv onClick={makeNickname}> 닉네임이 마음에 안들어요 ..</LinkDiv>
      </NicknameDiv>
      <EnterCodeDiv>
        <InputBox
          className="input-bordered mt-0 h-[48px] w-full px-[10px]"
          placeholder="방 코드를 입력해주세요"
          setInput={setWorkspaceId}
        />
        <button
          disabled={workspaceId.length == 0}
          className="btn"
          onClick={enterWorkspace}
        >
          {" "}
          입장하기{" "}
        </button>
      </EnterCodeDiv>
    </MainDiv>
  );
};

export default EnterCodeModal;

const MainDiv = tw.div`
w-full h-full
py-[30px]
flex flex-col items-center justify-around
`;

const NicknameDiv = tw.div`
w-full text-center
`;

const NicknameHolder = tw.span`
font-bold text-xl
`;

const EnterCodeDiv = tw.div`
w-full
flex items-center justify-center
px-[40px]
`;
const LinkDiv = tw.div`
w-full text-center
underline underline-offset-2
text-2xs text-base-200
cursor-pointer
`;
