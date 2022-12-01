/* libraries */
import { useEffect, useState } from "react";
import styled from "styled-components";
/* router */
import AppRouter from "@/components/_router/router";
/* context */
import { useTheme } from "@/context/ThemeContext";

function App() {
  const { themeColorset } = useTheme();

  return (
    <MainDiv theme={themeColorset}>
      <AppRouter />
    </MainDiv>
  );
}

const MainDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.baseColor};
`;

export default App;
