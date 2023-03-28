import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Input } from "reactstrap";
import BlogShow from "../components/blog/block-show-img/BlogShow";
import Helmet from "../components/Helmet/Helmet";
import { db, storage } from "../firebase";
import "../styles/Blog.css";

const Blog = () => {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState(null);



  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

//  add data
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
      },
      (error) => {
        console.log("Upload error: " + error);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await addDoc(collection(db, "content"), {
            img: downloadURL,
            title: title,
            content: content,
          });
        });
        //console.log(file, content);
      }
    );
    // } catch (error) {
    //   console.log("error");
    // }
  };
// xem ảnh 
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
    setFile(file);
  };

  return (
    <Helmet title="Home">
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
                    style={{ borderRadius: "15px" }}
                    // onChange={(e) => setFile(e.target.files[0])}
                    onChange={handleFileInputChange}
                  />
                  {preview && (
                    <img
                      src={preview}
                      alt=""
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />
                  )}
                </Col>
                {/* ====== img End ====== */}
                {/* ====== content Start ====== */}
                <Col lg="6" md="6">
                  <label>Title</label>
                  <Form.Control
                    type="text"
                    style={{ borderRadius: "15px" }}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Content</label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    style={{ borderRadius: "15px" }}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </Col>
                {/* ====== content End ====== */}
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

      <section>
        <div>
          <BlogShow />
        </div>
      </section>
    </Helmet>
  );
};

export default Blog;
