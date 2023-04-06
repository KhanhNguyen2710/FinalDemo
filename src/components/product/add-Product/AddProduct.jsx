import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { MDBInput } from "mdb-react-ui-kit";
import React, { useState } from "react";
import { Button, Col, Container, Form, FormGroup, InputGroup, Row } from "react-bootstrap";
import "./AddProduct.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../firebase";
import { Input, Label } from "reactstrap";
import { Link } from "react-router-dom";


const AddProduct = () => {

  const [file, setFile] = useState(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [describe, setDescribe] = useState("");

   const [preview, setPreview] = useState(null);


  const [isChecked, setIsChecked] = useState(false);



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
            productName: productName,
            describe: describe,
            price: price,
          });
        });
      }
    );
  };
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
    setFile(file);
  };
  return (
    <section>
      <Container className="Add_product px-5">
        <div className="divider d-flex align-items-center my-4">
          <p className="text-center fw-bold mx-3 mb-0">
            <h1>Add product</h1>
          </p>
        </div>
        <form onSubmit={addProduct}>
          <Row>
            {/* ======================= Add img ======================= */}
            <Col lg="6" md="6">
              <div>
                <p className="add_img d-flex justify-content-center">
                  {" "}
                  <h3>Image</h3>
                </p>
                <Input
                  className=""
                  style={{ borderRadius: "10px", marginTop: "48px" }}
                  type="File"
                  size="lg"
                  // onChange={(e) => setFile(e.target.files[0])}
                  onChange={handleFileInputChange}
                />
                {preview && (
                  <img
                    src={preview}
                    alt=""
                    style={{ marginTop: "20px", maxWidth: "100%", maxHeight: "300px" }}
                  />
                )}
              </div>
            </Col>
            {/* ======================= Add info product ======================= */}
            <Col lg="6" md="6">
              <p className="add_img d-flex justify-content-center">
                {" "}
                <h3>Information Product</h3>
              </p>
              {/* =============================== name =============================== */}
              <Form.Group>
                <Label>Product's name</Label>
                <Form.Control
                  type="text"
                  style={{ borderRadius: "10px" }}
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </Form.Group>

              {/* =============================== Price =============================== */}
              <Form.Group className="mt-3">
                <Label>Price</Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    style={{ borderRadius: "10px 0px 0px 10px" }}
                    value={price}
                    min="0"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <InputGroup.Text
                    style={{
                      backgroundColor: "white",
                      borderRadius: "0px 10px 10px 0px",
                    }}
                  >
                    $
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              {/* =============================== Describe =============================== */}
              <Form.Group className="mt-3">
                <Label>Describe</Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  style={{ borderRadius: "10px" }}
                  value={describe}
                  onChange={(e) => setDescribe(e.target.value)}
                />
              </Form.Group>
              {/* =============================== check & ADD =============================== */}
              <FormGroup check className="mt-3">
                <Label check>
                  <Input
                    type="checkbox"
                    onChange={(e) => setIsChecked(e.target.checked)}
                  />
                  <span className="mx-2">Confirm</span>
                </Label>
                <div className="d-flex justify-content-center">
                  <Button
                    size="lg"
                    className="my-4 align-self-end"
                    type="submit"
                    disabled={!isChecked}
                    style={{ width: "150px" }}
                  >
                    ADD
                  </Button>
                </div>
              </FormGroup>
            </Col>
          </Row>
        </form>
      </Container>
    </section>
  );
};

export default AddProduct;
