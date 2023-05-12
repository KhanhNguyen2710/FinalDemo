import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { Input, Label } from "reactstrap";
import { db, storage } from "../../../firebase";
import "./AddProduct.css";

const AddProduct = ({ onProductAdded }) => {
  const [file, setFile] = useState(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [preview, setPreview] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            description: description,
            price: price,
          });
          onProductAdded();
          // Reset form
          setProductName("");
          setPrice("");
          setFile("");
        });
      }
    );

    
    handleClose();
  };
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
    setFile(file);
  };


  useEffect(() => {
    if (!show) {
      // Reset the form when the modal is closed
      setFile(null);
      setProductName("");
      setPrice("");
      setDescription("");
      setPreview(null);
    }
  }, [show]);
  
  return (
    <Container>
      <div className="d-flex justify-content-center text-align-center">
        <Button
          className=""
          style={{
            borderRadius: "50px",
            background: "black",
          }}
          onClick={handleShow}
        >
          Add Product
        </Button>
      </div>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h1>Add product</h1>
        </Modal.Header>
        {/* =======================Body Start======================= */}
        <Form onSubmit={addProduct}>
          <Modal.Body>
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
                    required
                    // onChange={(e) => setFile(e.target.files[0])}
                    onChange={handleFileInputChange}
                  />
                  {preview && (
                    <img
                      src={preview}
                      alt=""
                      style={{
                        marginTop: "20px",
                        maxWidth: "100%",
                        maxHeight: "300px",
                      }}
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
                    required
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </Form.Group>

                {/* =============================== Price =============================== */}
                <Form.Group className="mt-3">
                  <Label>Price</Label>
                  <InputGroup>
                    <Form.Control
                      required
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
                {/* =============================== description =============================== */}
                <Form.Group className="mt-3">
                  <Label>Description</Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    style={{ borderRadius: "10px" }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
                {/* =============================== check & ADD =============================== */}
              </Col>
            </Row>
          </Modal.Body>


          {/* =======================Footer======================= */}
          <Modal.Footer>
            <Button
              size="lg"
              className="my-4 align-self-end"
              type="submit"
              style={{ width: "150px" }}
              // onClick={handleClose}
            >
              ADD
            </Button>
          </Modal.Footer>
         
        </Form>
      </Modal>
    </Container>
  );
};

export default AddProduct;
