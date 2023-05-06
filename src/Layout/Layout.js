import React from "react";
//import Body from './Body';

import { useSelector } from "react-redux";
import SideBarAd from "../Admin/SideBarAd/SideBarAd";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/footer/Footer";
import { AuthEmail } from "../redux/AuthReducer";
import AdRouters from "../routers/AdRouters";
import Routers from "../routers/Routers";
import "./Layout.css";

const Layout = () => {
  const adminEmail = useSelector(AuthEmail);
  console.log("email", adminEmail);

  if (adminEmail === "khanh@test.com") {
    return (
      <div className="" style={{ display: "flex", height: "100vh", background: "#e7e7e7" }}>
        <div>
          <SideBarAd />
        </div>
        {/* =========================== */}

        <div style={{ width: "100%", overflowY: "auto", padding:"50px" }}>
          {/* <AdRouters /> */}
          <Routers />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Navbar />
        <div className="router">
          <Routers />
        </div>
        <Footer />
      </div>
    );
  }
};
export default Layout;
