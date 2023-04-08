import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Input } from "reactstrap";

const RecipeAdd = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <section>
      <div className="d-flex justify-content-center text-align-center">
        <Button
          className=""
          style={{
            borderRadius: "50px",
            background: "black",
          }}
          onClick={handleShow}
        >
          +
        </Button>
      </div>
      {/* ==================== modal ==================== */}
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Recipe</Modal.Title>
        </Modal.Header>
        {/* =======================Body ======================= */}
        <Form>
          <Modal.Body>
            <Row>
              {/* ====== Image ====== */}
              <Col lg="6" md="6">
                <label>Add image</label>
                <Input
                  type="file"
                  style={{ borderRadius: "15px" }}
                  // onChange={(e) => setFile(e.target.files[0])}
                  // onChange={handleFileInputChange}
                />
                {/* {preview && (
                  <img
                    src={preview}
                    alt=""
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                )} */}
              </Col>

              {/* ======  input Recipe ====== */}
              <Col lg="6" md="6">
                <label>Title</label>
                <Form.Control type="text" style={{ borderRadius: "15px" }} />
                <label>Content</label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  style={{ borderRadius: "15px" }}
                />
              </Col>
            </Row>
          </Modal.Body>

          {/* =======================Body End======================= */}
          {/* =======================Footer Start======================= */}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="Submit" variant="primary" onClick={handleClose}>
              Save
            </Button>
          </Modal.Footer>
          {/* =======================Footer End======================= */}
        </Form>
      </Modal>
    </section>
  );
};

export default RecipeAdd;
