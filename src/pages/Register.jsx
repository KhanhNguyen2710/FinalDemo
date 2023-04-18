import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";

import React, { useState } from "react";
import { Form } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ".././styles/Register_Login.css";
import Helmet from "../components/Helmet/Helmet";
import { auth, db } from "../firebase.js";
import Register_img from "../img/lycoffe.png";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    // setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // add to firestore
      await setDoc(doc(db, "user", user.uid), {
        uid: user.uid,
        username: username,
        email: email,
        phone: phone,
        password: password,
      });
      console.log("register successfully");
      console.log(user);
      navigate("/login");
    } catch (error) {
      toast.error("wrong");
    }
  };
  return (
    <Helmet title="Register">
      <section>
        <MDBContainer fluid className="p-3 my-5 h-custom">
          <MDBRow>
            {/* ============= Img ============= */}
            <MDBCol col="10" md="6">
              <div className="register_img">
                <img src={Register_img} alt="" style={{ height: 450 }} />
              </div>
            </MDBCol>

            <MDBCol col="4" md="6">
              <div className="Register_input">
                {/* ============= Input ============= */}
                <div className="divider d-flex align-items-center my-4">
                  <h5 className="text-center fw-bold mx-3 mb-0">Register</h5>
                </div>
                <Form onSubmit={register}>
                  <MDBInput
                    className="Input mb-4"
                    label="User name"
                    type="text"
                    size="lg"
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />

                  <MDBInput
                    className="Input mb-4"
                    label="Email address"
                    type="email" // @gmail.com
                    size="lg"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <MDBInput
                    className="Input mb-4"
                    label="Phone"
                    type="number" //
                    size="lg"
                    min="0"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />

                  <MDBInput
                    className="Input mb-4"
                    label="Password"
                    // type="password"// ẩn
                    size="lg"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <div className="submit text-md-start mt-4 pt-2  ">
                    <MDBBtn
                      type="submit"
                      className="submit-btn mb-0 px-5"
                      size="lg"
                    >
                      Sign Up
                    </MDBBtn>
                  </div>
                </Form>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </Helmet>
  );
}

export default Register;
