import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { MDBInput } from "mdb-react-ui-kit";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./AddProduct.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../firebase";
import { Input } from "reactstrap";


const AddProduct = () => {

  const [file, setFile] = useState(null);
  const [describe, setDescribe] = useState("");
  const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");




  const addProduct = async (e) => {
    e.preventDefault();
    // try {
    const storageRef = ref(storage, "product/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log("Upload error: " + error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await addDoc(collection(db, "product"), {
            img: downloadURL,
            title: title,
            describe: describe,
            price: price,
          });
        });
      }
    );
  
  };
  return (
    <section>
      <Container className="Add_product px-5">
        <div className="divider d-flex align-items-center my-4">
          <p className="text-center fw-bold mx-3 mb-0">
            <h5>Add product</h5>
          </p>
        </div>
        <form onSubmit={addProduct}>
          <Row>
            {/* ======================= Add img ======================= */}
            <Col lg="6" md="6">
              <div>
                <p className="add_img d-flex justify-content-center">
                  {" "}
                  <h5>Img</h5>
                </p>
                <Input
                  className="mb-4"
                  style={{ borderRadius: "10px" }}
                  type="File"
                  size="lg"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </Col>
            {/* ======================= Add info product ======================= */}
            <Col lg="6" md="6">
              <label>Title</label>
              <Form.Control
                type="text"
                style={{ borderRadius: "10px" }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label>Describe</label>
              <Form.Control
                as="textarea"
                rows={5}
                style={{ borderRadius: "15px" }}
                value={describe}
                onChange={(e) => setDescribe(e.target.value)}
              />
              <label>Price</label>
              <Form.Control
                type="text"
                style={{ borderRadius: "10px" }}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Col>

            <button className="m-3" type="submit">
              add
            </button>
          </Row>
        </form>
      </Container>
    </section>
  );
};

export default AddProduct;
