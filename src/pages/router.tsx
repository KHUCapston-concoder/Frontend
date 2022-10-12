import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "@/pages/home";
import Workspace from "@/pages/workspace/:id";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/workspace/:id" element={<Workspace />} />
    </Routes>
  </Router>
);

export default AppRouter;
