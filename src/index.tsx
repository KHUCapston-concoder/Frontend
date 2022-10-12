import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import "@/assets/styles/index.css";
import "@/assets/styles/index.scss";
import App from "@/App";
import { ThemeProvider } from "@/context/ThemeContext";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
