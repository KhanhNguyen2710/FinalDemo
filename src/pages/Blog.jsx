import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Input } from "reactstrap";
import { db, storage } from "../firebase";
import "../styles/Blog.css";

const Blog = () => {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  const addBlog = async (e) => {
    e.preventDefault();
    // try {
      const storageRef = ref(storage, "content/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...
            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
            default: break;
          }
          
        },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(collection(db, "product"), {
              img: downloadURL,
              content: content,
            });
          });
          //console.log(file, content);
        }
      );
    // } catch (error) {
    //   console.log("error");
    // }

    // await setDoc(doc(db, "cities", ), {
    //   name: "Los Angeles",
    //   state: "CA",
    //   country: "USA",
    // });

  };

  return (
    <section className="Add-content">

      <Button
        style={{
          borderRadius: "50px",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={handleShow}
      >
        +
      </Button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Picture</Modal.Title>
        </Modal.Header>
        {/* =======================Body Start======================= */}
        <Form onSubmit={addBlog}>
          <Modal.Body>
            <Row>
              {/* ====== img Start ====== */}
              <Col lg="6" md="6">
                <label>Add image</label>
                <Input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ borderRadius: "15px" }}
                />
              </Col>
              {/* ====== img End ====== */}
              {/* ====== content Start ====== */}
              <Col lg="6" md="6">
                <label>Content</label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  style={{ borderRadius: "15px" }}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Col>
              {/* ====== content End ====== */}
            </Row>
          </Modal.Body>

          {/* =======================Body End======================= */}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="Submit" variant="primary" onClick={handleClose}>
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>


      <div>
        <p>heel</p>
      </div>
    </section>
  );
};

export default Blog;
