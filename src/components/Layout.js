import React from "react";
//import Body from './Body';
import Router from "../routers/Routers.js";
import Footer from "./Footer";
import Navbar from "./Navbar.jsx";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div>
        <Router />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
