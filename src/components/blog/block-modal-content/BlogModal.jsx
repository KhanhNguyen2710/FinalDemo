import React, { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import "../block-modal-content/BlogModal.css"
function BlogModal({ id, contentImg, title, img, ...props }) {
  // const [imageList, setImageList] = useState([]); //array
  // const [selectedImage, setSelectedImage] = useState(null);
  // useEffect(() => {
  //   const getData = async () => {
  //     let data = [];
  //     const querySnapshot = await getDocs(collection(db, "content"));
  //     querySnapshot.forEach((doc) => {
  //       // doc.data()
  //       data.push({ id: doc.id, ...doc.data() });
  //       // console.log(doc.id, " => ", doc.data());
  //     });
  //     setImageList(data);
  //   };
  //   getData();
  // }, []);

  // const getDocument = async (docId) => {
  //   const document = await getDoc(doc(db, "content", docId));
  //   if (document.exists()) {
  //     setSelectedImage({ id: document.id, ...document.data() });
  //     console.log("Document data:", document.data());
  //   } else {
  //     console.log("No such document!");
  //   }
  // };

  return (
    <Modal
      {...props}
      size="fullscreen"
      aria-labelledby=" contained-modal-title-vcenter"
      centered
      className="animate__animated animate__slideInUp"
      style={{ marginTop: "3rem" }}
    >
      <button
        className="btn-close  mb-4"
        onClick={props.onHide}
      ></button>
      {/* <Modal.Header closeButton className="header-modal"></Modal.Header> */}

      {/* ========== OP 1 ========== */}
      {/* <Modal.Body className=" p-0">
          <Row>
            <Col lg="7" md="7">
              <img
                src={img}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "25px 0 0px 25px",
                }}
              />
            </Col>

            <Col lg="5" md="5" className="p-3">
              <button
                className="btn-close  mb-4"
                style={{
                  display: "flex",
                  marginLeft: "auto",
                  marginRight: "20px",
                }}
                onClick={props.onHide}
              ></button>
              <h3 className="mb-4" style={{ color: "black" }}>
                {title}
              </h3>
              {contentImg}
            </Col>
          </Row>
        </Modal.Body> */}
      {/* ========== OP 2 ========== */}

      {/* <Modal.Header
        closeButton
        className="header-modal"
        style={{  }}
      ></Modal.Header> */}
      <Modal.Body>
        <div className="body-modal">
          <img
            src={img}
            alt=""
            style={{
              width: "50%",
              height: "50%",
              objectFit: "cover",
              // borderRadius: "25px 0 0px 25px",
            }}
          />
          <h3 className="mb-4" style={{ color: "black" }}>
            {title}
          </h3>
          <p className="contentImg ">{contentImg}</p>
        </div>
      </Modal.Body>

      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}
export default BlogModal;
