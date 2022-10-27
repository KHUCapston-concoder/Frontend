import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { useTheme } from "@/context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { uuidv4 } from "@/utils/commonFunc/genUuid";
import Modal from "@/hoc/Portal";
import EnterCodeModal from "@/components/Home/EnterCodeModal";

const ImgURL = "https://embed.lottiefiles.com/animation/63487";

const Home = () => {
  const navigate = useNavigate();
  const { themeColorset } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onClickCreateWorkspace = () => {
    const wordkspaceId = uuidv4();
    const nickname = generateNickname();
    localStorage.setItem("workspace-id", wordkspaceId);
    localStorage.setItem("nickname", nickname);
    // @todo: workspace id 서버로 넘기기
    console.log(wordkspaceId);
  };

  return (
    <HomeDiv>
      <TitleDiv style={{ color: themeColorset.pointColor }}>
        ConCoder
        <img width="200" src="src/assets/img/coder.gif" />
      </TitleDiv>
      <BtnContainer style={{ color: themeColorset.textColor }}>
        <BtnDiv>
          새로운 방을 만들고싶다면 ..
          <button className="styled" onClick={onClickCreateWorkspace}>
            CREATE A WORKSPACE
          </button>
        </BtnDiv>
        <BtnDiv>
          초대받으셨나요?
          <button className="styled" onClick={() => setIsModalOpen(true)}>
            ENTER CODE
          </button>
        </BtnDiv>
      </BtnContainer>
      <Modal
        className="h-[30%] w-[60%] min-w-[300px] max-w-[900px]"
        isShowing={isModalOpen}
        close={() => setIsModalOpen(false)}
      >
        <EnterCodeModal />
      </Modal>
    </HomeDiv>
  );
};

export default Home;

const HomeDiv = tw.div`
  flex flex-col justify-center items-center
`;

const TitleDiv = tw.div`
 text-[70px] font-bold py-[100px] px-[40px]
 flex gap-[20px] justify-center items-center
 tracking-wider
`;

const BtnContainer = tw.div`
  flex gap-[20px]
`;

const BtnDiv = tw.div`
  flex flex-col justify-center items-center gap-[5px]
`;
