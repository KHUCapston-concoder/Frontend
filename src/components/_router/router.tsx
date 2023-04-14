import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import Workspace from "@/pages/workspace/:id";
import PrivateRouter from "./PrivateRouter";
import Page404 from "@/pages/404";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRouter />} />
        <Route path="/workspace/:id" element={<Workspace />} />
        <Route path="/home" element={<Home />}></Route>
        <Route path="/*" element={<Page404 />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
