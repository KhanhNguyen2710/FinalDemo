import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";

const Login = () => {
  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5">
                <div className="form_group">
                  <input type="email" placeholder="Email" required />
                </div>

                <div className="form_group">
                  <input type="password" placeholder="Password" required />
                </div>
                <button typle="submit" className="addTOcart_btn">
                  Login
                </button>
              </form>

              <Link to="/register">Already have an account</Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
