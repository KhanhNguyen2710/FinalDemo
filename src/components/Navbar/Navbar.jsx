import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminOnly from "../../Admin/AdminOnly";
import Ava from "../../img/Ava.jpg";
import logo from "../../img/coffee-Logo.png";
import { authLogin, authLogout } from "../../redux/AuthReducer";
import "../Navbar/Navbar.css";
import "./Nav_links";
import Nav_links from "./Nav_links";

const Navbar = () => {
  const menuRef = useRef(null);
  const auth = getAuth();
  const [dropdown, setDropdown] = useState(false);

  const toggleMenu = () => menuRef.current.classList.toggle("show_menu");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };
  //
  const logout = () => {
    signOut(auth)
      .then(() => {
        // navigate("/");
        toast.success("Logout success");
        navigate("/home");
      })
      .catch((error) => {
        toast.error("Logout error");
      });
  };
  const menuDown = [
    { display: "Profile", path: "/profile" },
    { display: "Admin", path: "/admin", component: AdminOnly },
    { display: "Log Out", onClick: logout },
  ];

  const [displayAccount, setDisplayAccount] = useState("");


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // user google
        // console.log("name", user);
        // if (user.displayName == null) {
        //   const u1 = user.email.substring(0,user.email.indexOf("@"));
        //   const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
        //   // console.log("n", uName);
        //   setDisplayAccount(uName);
        // } else {
        //    setDisplayAccount(user);
        // }
        setDisplayAccount(user);
        dispatch(
          authLogin({
            email: user.email,
            userName: user.displayName, //? user.displayName : displayAccount,
            userID: user.uid,
            photoURL: user.photoURL,
          })
        );
      } else {
        setDisplayAccount("");
        dispatch(authLogout());
      }
    });
  }, []);

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
            {displayAccount ? (
              <div className="user">
                <div
                  style={{ position: "relative", cursor: "pointer" }}
                  onClick={handleDropdown}
                >
                  {/* <i className="ri-user-line">Hi, {displayAccount} </i> */}
                  <img
                    style={{
                      height: "40px",
                      width: "40px",
                      borderRadius: "50%",
                      border: "1px solid black",
                    }}
                    src={displayAccount.photoURL || Ava}
                    alt=""
                  />
                  {/* {displayAccount.displayName}  */}
                </div>
                {dropdown && (
                  <div className="dropdown">
                    {menuDown.map((menu, index) => (
                      <div
                        className="menuDown"
                        onClick={() => {
                          if (menu.onClick) {
                            //onClick: logOut
                            menu.onClick();
                          } else if (menu.component) {
                            //AdminRoute
                            navigate(menu.path);
                          } else {
                            navigate(menu.path);
                          }
                        }}
                        key={index}
                      >
                        {menu.component ? (
                          <menu.component>{menu.display}</menu.component> // Sử dụng component
                        ) : (
                          menu.display // display bình thường
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <span className="cart_icon">
                <Link to="/login">
                  <i className="ri-user-line"></i>
                </Link>
              </span>
            )}
            <span className="mobile_menu" onClick={toggleMenu}>
              <Link to="/login">
                <Button>
                  <i class="ri-menu-line"></i>
                </Button>
              </Link>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
