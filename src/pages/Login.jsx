import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
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
import ReactLoading from "react-loading";
import { Link, useNavigate } from "react-router-dom";
import ".././styles/Register_Login.css";
import Helmet from "../components/Helmet/Helmet";
import { auth, db } from "../firebase";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Register_img from "../img/lycoffe.png";
import { Timestamp, doc, setDoc } from "firebase/firestore";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
        
      );
      const user = userCredential.user;
      console.log("User", user);

      setLoading(false);
      toast.success("Login successfully");

      if (user && user.email === "khanh@test.com") {
        navigate("/admin/managerAccount");
      } else {
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = (e) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const userRef = doc(db, "user", user.uid);
        setDoc(userRef, {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
          createAt: Timestamp.now().toDate(),
        })
        toast.success("Login successfully");
        navigate("/home");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Helmet title="Login">
      <section>
        <MDBContainer fluid className="p-3 my-5 h-custom ">
          <MDBRow>
            {/* ============= Img ============= */}

            <MDBCol col="10" md="6">
              <div className="register_img">
                <img src={Register_img} alt="" style={{ height: 450 }} />
              </div>
            </MDBCol>
            {/* ============= lien ket ============= */}

            {loading ? (
              <ReactLoading type="spin" color="#bc6c25" />
            ) : (
              <MDBCol col="4" md="6">
                <div className="Register_input">
                  <div className=" d-flex flex-row align-items-center justify-content-center ">
                    <p className="lead fw-normal mb-0 me-3">Sign in with :</p>

                    <MDBBtn floating size="md" tag="a" className=" me-2">
                      <MDBIcon
                        fab
                        icon="google"
                        className="icon"
                        onClick={signInWithGoogle}
                      />
                      </MDBBtn>
                      
                  </div>
                  {/* ============= Input ============= */}
                  <div className="divider d-flex align-items-center my-4">
                    <p className="text-center fw-bold mx-3 mb-0">Or</p>
                  </div>
                  <form onSubmit={signIn}>
                    <MDBInput
                      className="mb-4"
                      label="Email address"
                      type="email"
                      size="lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <MDBInput
                      className="mb-4"
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
                    <a href="!#">Forgot password?</a>
                  </div>

                    <div className="submit text-md-start mt-4 pt-2  ">
                      <MDBBtn
                        type="submit"
                        className="submit-btn mb-0 px-5"
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
      </section>
    </Helmet>
  );
}

export default Login;
