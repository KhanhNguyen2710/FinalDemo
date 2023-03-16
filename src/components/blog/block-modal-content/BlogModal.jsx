import React, { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";

function BlogModal({ id, contentImg, title, img, ...props }) {
  const [imageList, setImageList] = useState([]); //array
  const [selectedImage, setSelectedImage] = useState(null);
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
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div key={id}>
        <Modal.Header closeButton></Modal.Header>

        <Modal.Body className="py-0">
          <Row>
            <Col lg="6" md="6">
              <img
                src={img}
                alt=""
                style={{ width: "100%", height: "500px", objectFit: "cover" }}
              />
            </Col>

            <Col lg="6" md="6">
              <h3 className="mb-4">{title}</h3>
              {contentImg}
            </Col>
          </Row>
        </Modal.Body>
      </div>

      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default BlogModal;
