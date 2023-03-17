import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { useTheme } from "@/context/ThemeContext";
import Modal from "@/hoc/Portal";
import EnterCodeModal from "@/components/Home/EnterCodeModal";
import useModal from "@/hooks/useModal";
import { uuidv4 } from "@/utils/commonFunc/genUuid";
import { generateNickname } from "@/utils/commonFunc/genNickname";
import { usePost } from "@/hooks/useHttp";
import { userInfoState } from "@/store/userInfoState";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import InputBox from "@/components/_styled/Input";

const ImgURL = "https://embed.lottiefiles.com/animation/63487";

const Home = () => {
  const { themeColorset } = useTheme();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen, onClick] = useModal();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const setUserInfoHandler = (res: any) => {
    const workspaceId = res.rooms[0].id;
    const userId = res.users[0].id;
    const username = res.users[0].name;
    setUserInfo({
      userId: userId,
      username: username,
      workspaceId: workspaceId,
      host: true,
    });

    localStorage.setItem("workspace-id", workspaceId);
    localStorage.setItem("user-id", userId);
    localStorage.setItem("nickname", username);
    localStorage.setItem("host", "true");
    navigate(`/workspace/${workspaceId}`);
  };

  const { sendRequest } = usePost(
    {
      url: "/api/video",
    },
    setUserInfoHandler
  );

  const onClickCreateWorkspace = () => {
    const nickname = generateNickname();
    sendRequest({ username: nickname });
  };

  return (
    <HomeDiv>
      <Nav>
        <img width="200" src="src/assets/img/logo2.png" />
        <button
          className="styled line"
          style={{ height: "40px", marginRight: "10px" }}
        >
          SIGN IN
        </button>
      </Nav>
      <MainDiv>
        <FlexDiv>
          <TitleDiv style={{ color: themeColorset.pointColor }}>
            Code Concurrently
            <SubTitleDiv>
              The joy of Concoder.
              Use our free webRTC-based webcam service along with modern live
              code IDE supporting up to 10 users.
            </SubTitleDiv>
            <BtnContainer style={{ color: themeColorset.textColor }}>
              <BtnDiv>
                <InputBox
                  placeholder="If you have a workspace code.."
                  className="input-md"
                  containerStyle={{
                    width: "calc(80% - 160px)",
                  }}
                  inputStyle={{
                    backgroundColor: "#d4d4d4",
                    width: "100%",
                  }}
                  setInput={() => {}}
                />
                <button
                  className="styled"
                  style={{ height: "50px", width: "180px" }}
                  onClick={onClick}
                >
                  JOIN WORKSPACE
                </button>
              </BtnDiv>
              <BtnDiv>
                {/* 새로운 방을 만들고싶다면 .. */}
                OR
                <button
                  className="styled line"
                  style={{
                    height: "50px",
                    marginLeft: "10px",
                  }}
                  onClick={onClickCreateWorkspace}
                >
                  CREATE A WORKSPACE
                </button>
              </BtnDiv>
            </BtnContainer>
          </TitleDiv>
          <img width="400" src="src/assets/img/coder.gif" />
        </FlexDiv>
      </MainDiv>

      <Modal
        className="h-[30%] w-[30%] min-w-[300px] max-w-[900px]"
        isShowing={isModalOpen}
        close={() => setIsModalOpen(false)}
      >
        <EnterCodeModal />
      </Modal>
      <div className="blur"></div>
    </HomeDiv>
  );
};

export default Home;

const Nav = tw.nav`
h-[120px] w-full
px-[20px]
flex justify-between items-center
shadow-xl
`;

const MainDiv = tw.div`
w-[80%] max-w-[1200px] h-[calc(100%-120px)]
flex flex-col items-center justify-center
z-[2] mb-[100px]
`;

const FlexDiv = tw.div`
flex gap-[20px]
`;

const HomeDiv = tw.div`
  flex flex-col justify-center items-center h-full
`;

const TitleDiv = tw.div`
 text-[70px] font-bold py-[100px] px-[40px]
 flex flex-col gap-[20px] justify-center items-end
 leading-[80px] tracking-wide text-right
`;

const SubTitleDiv = tw.div`
  text-[18px] text-[#d4d4d4] font-[400]
  w-[480px]
  leading-[20px] tracking-normal
  pr-[20px]
`;

const BtnContainer = tw.div`
  w-full items-center justify-center
  flex flex-col gap-[10px]
  mt-[20px]
`;

const BtnDiv = tw.div`
  w-full h-[60px]
  flex justify-end items-center gap-[5px]
  text-[16px]
`;
