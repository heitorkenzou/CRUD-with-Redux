import React from "react";
import { Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup";
import MainScreen from "./pages/MainScreen";
import EditModal from "./components/EditModal";

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/edit-post" element={<EditModal />} />
      <Route path="/" element={<Signup />} />
      <Route path="/main" element={<MainScreen />} />
    </Routes>
  );
}
