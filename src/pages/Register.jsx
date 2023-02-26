import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
  MDBBtn,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import React, { useState } from "react";
import { toast } from "react-toastify";
import ".././styles/Register_Login.css";
import Helmet from "../components/Helmet/Helmet";
import { auth, db } from "../firebase.js";
import Register_img from "../img/lycoffe.png";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);

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
        displayName: username,
        email: email,
        password: password,
      });

      console.log(user);
    } catch (error) {
      toast.error("wrong");
    }
  };
  return (
    <Helmet title="Register">
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
                <p className="text-center fw-bold mx-3 mb-0">REGISTER</p>
              </div>
              <form onSubmit={register}>
                <MDBInput
                  className="Input mb-4"
                  label="User name"
                  type="text"
                  size="lg"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <MDBInput
                  className="Input mb-4"
                  label="Email address"
                  type="email" // @gmail.com
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <MDBInput
                  className="Input mb-4"
                  label="Password"
                  // type="password"// ẩn
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="com text-md-start mt-4 pt-2  ">
                  <MDBBtn
                    type="submit"
                    className="login-btn mb-0 px-5"
                    size="lg"
                  >
                    Sign up
                  </MDBBtn>
                </div>
              </form>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </Helmet>
  );
}

export default Register;
