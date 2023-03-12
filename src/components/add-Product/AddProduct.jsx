import { doc, setDoc } from "firebase/firestore";
import { MDBInput } from "mdb-react-ui-kit";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { db } from "../../firebase";
import "./AddProduct.css";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

const AddProduct = () => {
  const [product, setProduct] = useState("");
  const [file, setFile] = useState(null);
  //const [description, setDescription] = useState("");
  // const [radio, setRadio] = useState("");

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      // console.log("File name: " + file.name);
      // console.log(file);
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          // console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            
            
            await setDoc(doc(db, "product"), {
              nameProduct: product,
              img: file,
            });
          });
        }
      );
    } catch (error) {
      console.log("error");
    }
  };
  return (
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
              <MDBInput
                className="mb-4"
                type="File"
                size="lg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </Col>
          <button className="btn" type="submit">
            add
          </button>
          {/* ======================= Add Product ======================= */}
        </Row>
      </form>
    </Container>
  );
};

export default AddProduct;
