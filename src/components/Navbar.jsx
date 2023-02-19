import React, { useRef } from "react";
import { Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import logo from "../img/coffee-Logo.png";
import "../styles/Navbar.css";

const nav_links = [
  {
    display: "Home",
    path: "/home",
  },
  {
    display: "Recipe",
    path: "/recipe",
  },
  {
    display: "Contact",
    path: "/contact",
  },
  {
    display: "Cart",
    path: "/cart",
  },
];

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
  //       headerRef.current.classList.add("header_shrink");
  //     } else {
  //       headerRef.current.classList.remove("header_shrink");
  //     }
  //   });
  //   return () => window.removeEventListener("scroll");
  // }, []);

  return (
    <header className="header">
      <Container>
        <div className="nav_wrapper d-flex align-items-center justify-content-between">
          <div className="logo">
            <img src={logo} alt="logo" />
            <h5>Cup's Coffee</h5>
          </div>
          {/* ============MENU ============ */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <div className="menu d-flex align-items-center gap-5">
              {nav_links.map((item, index) => (
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

            <span className="user">
              <Link to="/login">
                <i class="ri-user-line"></i>
              </Link>
            </span>

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
