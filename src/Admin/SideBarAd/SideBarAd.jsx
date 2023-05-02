import { Box, Divider,  List,  ListItem, ListItemButton, ListItemIcon,  ListItemText,  Toolbar } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import AdminTabs from "./AdminTabs";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import "./SideBarAd.css";
import { useState } from "react";

const SideBarAd = () => {
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout success");
        navigate("/home");
      })
      .catch((error) => {
        toast.error("Logout error");
      });
  };

  const AdminTabs = [
    {
      link: "/admin/managerAccount",
      name: "Manager Account",
      icon: <i class="ri-user-fill fs-5"></i>,
    },
    {
      link: "/admin/managerProduct",
      name: "Manager Product",
      icon: <i class="ri-sticky-note-2-fill fs-5 "></i>,
    },
    {
      link: "/admin/chart",
      name: " Chart",
      icon: <i class="ri-bar-chart-fill fs-5"></i>,
    },
 
  ];
 const [activeItem, setActiveItem] = useState(null);
 const handleItemClick = (item) => {
   setActiveItem(item);
 };
  return (
    <div
      className="sidebar"
      style={{
        height: "100%",
        backgroundColor: "#6F3F14",
        color: "white",
        width: "240px",
      }}
    >
      <Toolbar />
      <Divider />
      <div style={{ overflow: "auto" }}>
        {AdminTabs.map((item, index) => (
          <Link to={item.link}>
            <ListItem
              key={index}
              disablePadding
              className={`sidebar-item ${
                activeItem === item.link ? "sidebar-active" : ""
              }`} // giữ hover
              onClick={() => handleItemClick(item.link)}
            >
              <ListItemButton
                className="sidebar_btn no-hover"
                disableTouchRipple={true}
              >
                <ListItemIcon style={{ color: "white" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </div>

      {/* {AdminTabs.map((item, index) => (
        <ul className="sidebar ">
          <Link to={item.link}>
            <li className="sidebar-item">
              {item.name}
            </li>
          </Link>
    
        </ul>
      ))} */}

      {/* <ul className="sidebar ">
        <Link to="/admin/managerAccount ">
          <li className="sidebar-item">Manager Account</li>
        </Link>
        <li className="sidebar-item">
          <Link to="/admin/chart">Chart</Link>
        </li>
        <li className="sidebar-item">
          <Link to="/admin/managerProduct">Manager Product</Link>
        </li>
      </ul> */}

      <ListItem disablePadding className="sidebar-item" onClick={logout}>
        <ListItemButton className="no-hover">
          <ListItemIcon style={{ color: "white" }}>
            {" "}
            <i class="fa fa-sign-out fs-5"></i>
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </ListItem>
    </div>
  );
};

export default SideBarAd;
