import React from "react";
import { Route, Routes } from "react-router-dom";
import Chart from "../Admin/chart/Chart";
import ManagerAccount from "../Admin/managerAccount/ManagerAccount";
import ManagerProduct from "../Admin/managerProduct/ManagerProduct";
import Home from "../pages/Home";
import ManagerRecipe from "../Admin/managerRecipe/ManagerRecipe";

const AdRouters = () => {
  return (
    <Routes>
      <Route path="/managerAccount" element={<ManagerAccount />} />
      <Route path="/chart" element={<Chart />} />
      <Route path="/managerProduct" element={<ManagerProduct />} />
      <Route path="/managerRecipe" element={<ManagerRecipe />} />
    </Routes>
  );
};

export default AdRouters;
