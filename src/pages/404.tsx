import React from "react";
import { useNavigate } from "react-router-dom";
import tw from "tailwind-styled-components";

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <BackDiv>
      <MainDiv>
        <div>
          <OopsDiv>Oops!</OopsDiv>
          <div style={{ textAlign: "center", padding: "20px 0 80px 0" }}>
            <h1>404: Page Not Found</h1>
            <div style={{ letterSpacing: "0.12rem", padding: "5px 0" }}>
              We're sorry, looks like the page you've looking for does not exist
            </div>
          </div>
        </div>
        <button className="styled" onClick={() => navigate("/home")}>
          Go Back to Home
        </button>
      </MainDiv>
    </BackDiv>
  );
};

export default Page404;

const BackDiv = tw.div`
w-full h-full bg-accent
flex flex-col items-center justify-center
`;

const MainDiv = tw.div`
w-[80%] max-w-[1200px] h-[50%] bg-neutral
text-center
rounded-[10rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]
py-[5rem]
flex flex-col items-center justify-around
`;

const OopsDiv = tw.div`
text-[8rem] font-bold tracking-wide
`;
