import React from "react";
import { AdRouters } from "../../Admin/AdRouters";
import AdminSidebar from "../../Admin/AdSidebar/AdminSidebar";

const AdminPage = () => {
  return (
    <div style={{ display: "flex", height: "100vh", background: "#e7e7e7" }}>
      <div>{<AdminSidebar />}</div>
      {/* =========================== */}
      <div style={{width: "100%", overflowY: "auto"}}>{<AdRouters />}</div>
    </div>
  );
};

export default AdminPage;
