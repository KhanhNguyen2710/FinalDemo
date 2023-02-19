import "mdb-react-ui-kit/dist/css/mdb.min.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ".././styles/Register_Login.css";
import Helmet from "../components/Helmet/Helmet";
import Register_img from "../img/register_coffee.png";

import {
  MDBBtn,
  MDBCheckbox,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Helmet title="Login">
      <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow>
          {/* ============= Img ============= */}
          <MDBCol col="10" md="6">
            <div className="register_img">
              <img src={Register_img} alt="" className="w-60" />
            </div>
          </MDBCol>
          {/* ============= lien ket ============= */}
          <MDBCol col="4" md="6">
            <div className="Register_input">
              <div className=" d-flex flex-row align-items-center justify-content-center ">
                <p className="lead fw-normal mb-0 me-3">Sign in with</p>

                <MDBBtn floating size="md" tag="a" className=" me-2">
                  <MDBIcon fab icon="facebook-f" className="icon" />
                </MDBBtn>

                <MDBBtn floating size="md" tag="a" className=" me-2">
                  <MDBIcon fab icon="twitter" className="icon" />
                </MDBBtn>

                <MDBBtn floating size="md" tag="a" className=" me-2">
                  <MDBIcon fab icon="linkedin-in" className="icon" />
                </MDBBtn>
              </div>
              {/* ============= Input ============= */}
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
              </div>

              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                type="email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                type="password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="d-flex justify-content-between mb-4">
                <MDBCheckbox name="flexCheck" value="" label="Remember me" />
                {/* <a href="!#">Forgot password?</a> */}
              </div>

              <div className="com text-md-start mt-4 pt-2  ">
                <MDBBtn type="submit" className="login-btn mb-0 px-5" size="lg">
                  Login
                </MDBBtn>
                <p className="small fw-bold mt-2 pt-1 mb-2 ">
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </Helmet>
  );
}

export default Login;
