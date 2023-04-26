import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../AdSidebar/AdSidebar.css";
import AdSidebarData from "./AdSidebarData";

const AdminSidebar = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar className="sidebar">
        {/* Header */}
        <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
          ADMIN
        </CDBSidebarHeader>
        {/* Content */}
        <CDBSidebarContent>
          {AdSidebarData.map((item) => (
            <CDBSidebarMenu>
              <Link to={item.to}>
                <CDBSidebarMenuItem
                  className={`sidebar-item ${
                    activeItem === item.to ? "sidebar-active" : ""
                  }`} // giữ hover
                  icon={item.icon}
                  onClick={() => handleItemClick(item.to)}
                >
                  {item.label}
                </CDBSidebarMenuItem>
              </Link>
            </CDBSidebarMenu>
          ))}
        </CDBSidebarContent>
        {/* Footer */}
        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div className="sidebar-btn-wrapper" style={{ padding: "20px 5px" }}>
            <h5>Cup's Coffee</h5>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default AdminSidebar;
