import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Home from "@/pages/home";
import Workspace from "@/pages/workspace/:id";

const AppRouter = () => {

  return (
    <Router>
      <Routes>
        <Route path="/workspace/:id" element={<Workspace />} />
        <Route path="/home" element={<Home />} >
          
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
