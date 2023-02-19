import "mdb-react-ui-kit/dist/css/mdb.min.css";
import React from "react";
import ".././styles/Register_Login.css";
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

function App() {
  return (
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
            <div className="icon d-flex flex-row align-items-center justify-content-center ">
              <p className="lead fw-normal mb-0 me-3">Sign in with</p>

              <MDBBtn floating size="md" tag="a" className="icon me-2">
                <MDBIcon fab icon="facebook" />
              </MDBBtn>

              <MDBBtn floating size="md" tag="a" className="icon me-2">
                <MDBIcon fab icon="twitter" />
              </MDBBtn>

              <MDBBtn floating size="md" tag="a" className="icon me-2">
                <MDBIcon fab icon="linkedin-in" />
              </MDBBtn>
            </div>
            {/* ============= Input ============= */}
            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">Or</p>
            </div>

            <MDBInput
              wrapperClass="mb-4"
              label="Email address"
              id="formControlLg"
              type="email"
              size="lg"
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="formControlLg"
              type="password"
              size="lg"
            />

            <div className="d-flex justify-content-between mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              {/* <a href="!#">Forgot password?</a> */}
            </div>

            <div className="login_btn text-md-start mt-4 pt-2  ">
              <MDBBtn className="log-btn mb-0 px-5" size="lg">
                Login
              </MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2 ">
                Don't have an account?{" "}
                <a href="#!" className="link-danger">
                  Register
                </a>
              </p>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
