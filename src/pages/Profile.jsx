import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Helmet from "../components/Helmet/Helmet";
import "../styles/Profile.css"
import Ava from "../img/Ava.jpg"
import { Input } from "reactstrap";

const Profile = () => {
  return (
    <Helmet title="Profile">
      <section>
        <Container>
          <Row className="profile px-4">
            {/* ==============header start============== */}
            <div className="text-center my-3">
              <h3> Profile</h3>
            </div>
            {/* ==============header end============== */}

            {/* ==============img ava start============== */}
            <div className="d-flex gap-4 m-auto">
              <img
                src={Ava}
                className="avaProfile mb-3"
                style={{ width: 90, height: 90 }}
                alt=""
              />

              <button className="btn_change">Change</button>
            </div>
            {/* ==============img ava End============== */}
            <div>
              {/* ==============Information Start============== */}
              <Form>
                <div className="d-flex gap-3">
                  <Col Col lg="4" md="6">
                    <label>Name</label>
                    <Input
                      type="text"
                      className="mb-4"
                      placeholder="Name"
                      style={{ borderRadius: "20px", height: "50px" }}
                    />
                  </Col>

                  <Col Col lg="5" md="6">
                    <label>Gmail</label>
                    <Input
                      type="email"
                      className="mb-4"
                      placeholder="Gmail"
                      style={{ borderRadius: "20px", height: "50px" }}
                    />
                  </Col>
                </div>

                <Form.Group
                  className=" mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <label>Description</label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    style={{ borderRadius: "20px" }}
                  />
                </Form.Group>
              </Form>
              {/* ==============Information End============== */}
            </div>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Profile;
