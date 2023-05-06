import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Input } from "reactstrap";
import { db, storage } from "../../../firebase";

const RecipeAdd = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  // const [form, setForm] = useState({
  //   title: "",
  //   desc: "",
  //   ingredients: [],
  //   steps: [],
  // });
  const [title, setTitle] = useState("");
  const [steps, setSteps] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [description, setDescription] = useState("");


useEffect(() => {
  if (!show) {
    // Reset the form when the modal is closed
    setFile(null);
    setPreview(null);
    setTitle("");
    setDescription("");
    setIngredient([]);
    setSteps([]);
  }
}, [show]);
  
  
  const addRecipe = async (e) => {
    e.preventDefault();
    let isFormValid = true;
     if (
       !title ||
       !description ||
       ingredient.length === 0 ||
       steps.length === 0
     ) {
       isFormValid = false;
       alert("Please fill in all required fields.");
     }
    // try {
     if (isFormValid) {
    // ...code for uploading the image and adding the recipe to the database
    const storageRef = ref(storage, "recipes/" + file.name);
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
          await addDoc(collection(db, "recipes"), {
            img: downloadURL,
            title: title,
            steps: steps,
            ingredient: ingredient,
            description: description,
          });
        });
      }
    );
  };
  }
  
  // xem ảnh
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
    setFile(file);
  };

   // Add ingredient
   const handleIngredient = (e, i) => {
     const ingredientClone = [...ingredient];
     ingredientClone[i] = e.target.value;
     setIngredient(ingredientClone);
   };

  const handleIngredientCount = () => {
    setIngredient([...ingredient, ""]);
  };

  // Add Step
  const handleStep = (e, i) => {
    const stepsClone = [...steps];
    stepsClone[i] = e.target.value;
    setSteps(stepsClone);
  };

  const handleStepCount = () => {
    setSteps([...steps, ""]);
  };



  return (
    <section>
      {/* ==================== Btn show modal ==================== */}
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
        <Form onSubmit={addRecipe}>
          <Modal.Body>
            <Row>
              {/* ================== Image ================== */}
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
                    style={{
                      maxWidth: "100%",
                      maxHeight: "300px",
                      marginTop: "20px",
                    }}
                  />
                )}
              </Col>

              {/* ==================  input Recipe ================== */}
              <Col lg="6" md="6">
                {/* ====== Title ====== */}
                <Form.Group>
                  <label>Title</label>
                  <Form.Control
                    type="text"
                    style={{ borderRadius: "15px" }}
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
                {/* ====== Description ====== */}
                <Form.Group>
                  <label>Description</label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    style={{ borderRadius: "15px" }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>

                {/* ====== Add ingredient ====== */}
                <Form.Group>
                  
                    <label style={{ marginRight: "10px", marginTop: "30px" }}>
                      Ingredient :{" "}
                    </label>
                    {ingredient.map((ingredient, index) => (
                      <Form.Control
                        key={index}
                        type="text"
                        style={{ borderRadius: "10px", marginBottom: "15px" }}
                        value={ingredient}
                        onChange={(e) => handleIngredient(e, index)}
                      />
                    ))}
                    <Button
                      style={{ padding: "8px" }}
                      type="button"
                      onClick={handleIngredientCount}
                    >
                      Add Ingredient
                    </Button>
                 
                </Form.Group>

                {/* ====== Add Step ====== */}
                <Form.Group>
                  <label style={{ marginTop: "30px", marginRight: "10px" }}>
                    Step :
                  </label>
                  {steps.map((step, index) => (
                    <Form.Control
                      key={index}
                      type="text"
                      style={{ borderRadius: "15px", marginBottom: "15px" }}
                      value={step}
                      onChange={(e) => handleStep(e, index)}
                    />
                  ))}
                  <Button
                    style={{ padding: "8px" }}
                    type="button"
                    onClick={handleStepCount}
                  >
                    Add Step
                  </Button>
                </Form.Group>
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
