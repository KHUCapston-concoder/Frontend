import { useState } from "react";
import styled from "styled-components";
import { useTheme } from "@/context/ThemeContext";
import Home from "@/pages/Home";

function App() {
  const { themeColorset } = useTheme();

  return (
    <MainDiv theme={themeColorset}>
      <Home />
    </MainDiv>
  );
}

const MainDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.bgColor};
`;

export default App;
