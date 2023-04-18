import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../img/coffee-Logo.png";
import "../Navbar/Navbar.css";
import "./Nav_links";
import Nav_links from "./Nav_links";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import UserInfo from "../../custom/UserInfo";




const Navbar = () => {
  const menuRef = useRef(null);
  const auth = getAuth();
  // const headerRef = useRef(null);
  const [dropdown, setDropdown] = useState(false);

  const toggleMenu = () => menuRef.current.classList.toggle("show_menu");
  const navigate = useNavigate();

  const menuDown = [
    { display: "Profile", path: "/profile" },
    { display: "Log Out", path: "/login" },
  ];

  // const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  // const { currentUser } = useAuth();


  const handleDropdown = () => {
    setDropdown(!dropdown);
  };
  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success("Logout success")
        navigate("/home")
      })
      .catch((error) => {
        // An error happened.
      });
  }
  
  return (
    <header className="header">
      <Container>
        <div className="nav_wrapper d-flex align-items-center justify-content-between">
          <div className="logo">
            <Link to="/home">
              <img src={logo} alt="logo" />

              <h5>Cup's Coffee</h5>
            </Link>
          </div>
          {/* =================== MENU =================== */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <div className="menu d-flex align-items-center gap-5">
              {Nav_links.map((item, index) => (
                <NavLink
                  onClick={toggleMenu}
                  to={item.path}
                  key={index}
                  className={(navClass) =>
                    navClass.isActive ? "active_menu" : ""
                  }
                >
                  {item.display}
                </NavLink>
              ))}
            </div>
          </div>
          {/* ============ right ============ */}
          <div className="nav_right d-flex align-items-center gap-4">
            <span className="cart_icon">
              <i class="ri-shopping-bag-2-line"></i>
              {totalQuantity !== 0 && (
                <span className="cart_badge">{totalQuantity}</span>
              )}
            </span>
            {/* =================== user =================== */}
            <div className="user">
              <div
                style={{ position: "relative", cursor: "pointer" }}
                onClick={handleDropdown}
              >
                <i className="ri-user-line"></i>
              </div>
              {dropdown && (
                <div className="dropdown">
                  {menuDown.map((menu) => (
                    <div
                      className="menuDown"
                      onClick={() => navigate(menu.path)}
                    >
                      {menu.display}
                    </div>
                  ))}
                </div>
              )}
            </div>
           
           
            <span className="mobile_menu" onClick={toggleMenu}>
              <i class="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
