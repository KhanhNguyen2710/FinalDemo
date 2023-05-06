import React from "react";
import { Col, Modal, Row } from "react-bootstrap";
import Ava from "../../../img/Ava.jpg";
import "../block-modal-content/BlogModal.css";
import BlogComments from "./BlogComments";

function BlogModal({ id, contentImg, title, img,displayName, ...props }) {
  return (
    <div>
      <Modal
        {...props}
        size="fullscreen"
        aria-labelledby=" contained-modal-title-vcenter"
        centered
        className=" animate__animated animate__slideInUp animate__faster"
        style={{ marginTop: "2.0rem", borderRadius: "25px" }}
      >
        <button className="btn-close  mb-2" onClick={props.onHide}></button>

        <Modal.Body>
          <Row className=" body-section ">
            {/* ===================== Author  ===================== */}
            <div className="d-flex align-item-center gap-4 mb-3">
              <img
                src={Ava}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  marginLeft: "20px",
                }}
                alt=""
              />
              <div>
                <h6 className="Custom_Name mb-0 mt-3">{displayName}</h6>
              </div>
            </div>
            {/* =================img================= */}

            <Col lg="7" md="7">
              <div
                style={{
                  width: "100%",
                  height: "550px",
                  borderRadius: "25px",
                  display: "flex",
                  justifyContent: "center",
                  // background: "#E6E6E6",
                }}
              >
                <img
                  className="img-content "
                  src={img}
                  alt=""
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    borderRadius: "25px",
                    boxShadow: "5",
                  }}
                />
              </div>
            </Col>

            {/* =================content================= */}
            <Col lg="5" md="5">
              {/* ===================== ===================== */}
              <div style={{ overflowY: "auto", height: "550px" }}>
                <h3
                  className="mb-4 d-flex fw-bold justify-content-center "
                  style={{ color: "black" }}
                >
                  {title}
                </h3>

                <p className="contentImg ">{contentImg}</p>
                <BlogComments />
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default BlogModal;
