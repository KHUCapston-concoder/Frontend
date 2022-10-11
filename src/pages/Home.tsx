import React from "react";
import styled from "styled-components";
import tw from "tailwind-styled-components";
import { Button } from "@/components/styled/Buttons";
import { useTheme } from "@/context/ThemeContext";

const ImgURL = "https://embed.lottiefiles.com/animation/63487";

const Home = () => {
  const { themeColorset } = useTheme();

  return (
    <HomeDiv>
      <TitleDiv style={{ color: themeColorset.pointColor }}>
        ConCoder
        <img width="200" src="src/assets/img/coder.gif" />
      </TitleDiv>
      <BtnContainer style={{ color: themeColorset.textColor }}>
        <BtnDiv>
          새로운 방을 만들고싶다면 ..
          <button>CREATE A WORKSPACE</button>
        </BtnDiv>
        <BtnDiv>
          초대받으셨나요?
          <button>ENTER CODE</button>
        </BtnDiv>
      </BtnContainer>
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
