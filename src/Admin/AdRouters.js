import React from "react";
import { Route, Routes } from "react-router-dom";
import { ManagerAcc } from "./AdPages/ManagerAcc";

export const AdRouters = () => {
  return (
    <Routes>
      <Route path="/managerAcc" element={<ManagerAcc />} />
    </Routes>
  );
};
