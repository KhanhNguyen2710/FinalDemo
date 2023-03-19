import React, { useRef,useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import logo from "../../img/coffee-Logo.png";
import "../Navbar/Navbar.css";
import useAuth from "../../custom/useAuth"
import "./Nav_links"
import Nav_links from "./Nav_links";


const Navbar = () => {
  const menuRef = useRef(null);
  // const headerRef = useRef(null);

  const toggleMenu = () => menuRef.current.classList.toggle("show_menu");
  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     if (
  //       document.body.scrollTop > 80 ||
  //       document.documentElement.scrollTop > 80
  //     ) {
  //       headerRef.current.classList.add("header_sticky");
  //     } else {
  //       headerRef.current.classList.remove("header_sticky");
  //     }
  //   });
  //   return () => window.removeEventListener("scroll");
  // }, []);
const {currentUser} = useAuth() 

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
          {/* ============MENU ============ */}
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
              {/* <span className="cart_badge">2</span> */}
            </span>

            <div className="user">
              <Link to="/login">
                <i class="ri-user-line"></i>
              </Link>
              {/* <i class="ri-user-line"></i>
              <div className="profile_actions">
                {currentUser ? (
                  <span>Logout</span>
                ) : (
                  <div>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Login</Link>
                  </div>
                )}
              </div> */}
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
