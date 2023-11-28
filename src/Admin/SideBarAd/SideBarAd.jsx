import {
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import AdminTabs from "./AdminTabs";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import "./SideBarAd.css";


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

//     const [productList, setProductList] = useState([]);

//   const getData = async () => {
//     try {
//       const querySnapshot = await getDocs(db);
//       let data = [];
//       querySnapshot.forEach((doc) => {
//         data.push({ id: doc.id, ...doc.data() });
//       });
//       setProductList(data);
//     } catch (error) {
//       console.error("Error getting data: ", error);
//     }
//   };
// useEffect(() => {
//   getData();
// }, []);
  

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
      link: "/admin/managerRecipe",
      name: " Manager Recipe",
      icon: <i class="ri-file-list-fill fs-5"></i>,
    },
    {
      link: "/admin/managerOrder",
      name: " Manager Order",
      icon: <i class="ri-shopping-cart-fill fs-5"></i>,
    },
    {
      link: "/admin/dashboard",
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
        // width: "240px",
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
