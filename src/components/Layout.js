import React from "react";
//import Body from './Body';
import Router from "../routers/Routers.js";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Router />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
