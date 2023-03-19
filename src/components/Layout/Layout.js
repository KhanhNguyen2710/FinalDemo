import React from "react";
//import Body from './Body';
import Router from "../../routers/Routers.js";
import Footer from "../footer/Footer";
import Navbar from "../Navbar/Navbar.jsx";
import "./Layout.css"

const Layout = () => {
  return (
    <div>
      
        <Navbar />
     
      <div className="router">
        <Router />
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
