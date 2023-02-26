import { signInWithEmailAndPassword } from "firebase/auth";
import {
  MDBBtn,
  MDBCheckbox,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ".././styles/Register_Login.css";
import Helmet from "../components/Helmet/Helmet";
import { auth } from "../firebase";

import Register_img from "../img/lycoffe.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      console.log(user);
      setLoading(false);
      navigate("/home");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Helmet title="Login">
      <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow>
          {/* ============= Img ============= */}

          <MDBCol col="10" md="6">
            <div className="register_img">
              <img src={Register_img} alt="" style={{ height: 450 }} />
            </div>
          </MDBCol>
          {/* ============= lien ket ============= */}

          {loading ? (
            <MDBCol lg="12" className="text-center">
              <h5 className="fw-bold">loading.......</h5>
            </MDBCol>
          ) : (
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
                <form onSubmit={signIn}>
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
                    <MDBCheckbox
                      name="flexCheck"
                      value=""
                      label="Remember me"
                    />
                    {/* <a href="!#">Forgot password?</a> */}
                  </div>

                  <div className="com text-md-start mt-4 pt-2  ">
                    <MDBBtn
                      type="submit"
                      className="login-btn mb-0 px-5"
                      size="lg"
                    >
                      Login
                    </MDBBtn>

                    <p className="small fw-bold mt-2 pt-1 mb-2 ">
                      Don't have an account?{" "}
                      <Link to="/register">Register</Link>
                    </p>
                  </div>
                </form>
              </div>
            </MDBCol>
          )}
        </MDBRow>
      </MDBContainer>
    </Helmet>
  );
}

export default Login;
