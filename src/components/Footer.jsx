import React from "react";
import { Col, Container, Row } from "reactstrap";
import logo from "../img/coffee-Logo.png";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3" md="4" sm="6">
            <div className="logo footer_logo">
              <img src={logo} alt="logo" />
              <h5>Cup's Coffee</h5>
            </div>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col lg="6" md="6">
            <p>Copyright &copy -2023, website made by me</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
