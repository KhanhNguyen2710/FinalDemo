import React from "react";
//import Body from './Body';
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/footer/Footer.jsx";
import Router from "../../routers/Routers.js";
import "./WebLayout.css";

const WebLayout = () => {
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

export default WebLayout;
