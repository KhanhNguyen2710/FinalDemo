import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Input } from "reactstrap";
import { db } from "../../firebase";

const EditRecipe = ({
  id,
  img,
  title,
  description,
  ingredient,
  steps,
  onHide,
  onClose,
  ...props
}) => {
  const [show, setShow] = useState(false);



  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  //show img
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setPreview(URL.createObjectURL(file));
    setFile(file);
  };

  // Add ingredient
  const handleIngredient = (e, i) => {
    const ingredientClone = [...recipe.ingredient];
    ingredientClone[i] = e.target.value;
    setRecipe({ ...recipe, ingredient: ingredientClone });
  };

  const handleIngredientCount = () => {
    setRecipe({ ...recipe, ingredient: [...recipe.ingredient, ""] });
  };

  // Add Step
  const handleStep = (e, i) => {
    const stepsClone = [...recipe.steps];
    stepsClone[i] = e.target.value;
    setRecipe({ ...recipe, steps: stepsClone });
  };

  const handleStepCount = () => {
    setRecipe({ ...recipe, steps: [...recipe.steps, ""] });
  };
  //////////////////////////////////////////////////////
  const initialState = {
    img: img,
    title: title,
    description: description,
    ingredient: ingredient,
    steps: steps,
  };

  const [recipe, setRecipe] = useState({ ...initialState });

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "recipes", id), {
        img: recipe.img,
        title: recipe.title,
        description: recipe.description,
        ingredient: recipe.ingredient,
        steps: recipe.steps,
      });
      // Clear form fields
      setRecipe({ ...initialState });
      
 handleClose();
      
    } catch (error) {
      console.log(error);
    }
  };


  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div>
      <Modal size="lg" {...props} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Your Recipe</Modal.Title>
        </Modal.Header>
        {/* =======================Body ======================= */}
        <Form onSubmit={handleEdit}>
          <Modal.Body>
            <Row>
              {/* ================== Image ================== */}
              <Col lg="6" md="6">
                <label>Add image</label>
                <Input
                  type="file"
                  style={{ borderRadius: "15px" }}
                  // required
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
                    value={recipe.title}
                    required
                    onChange={(e) =>
                      setRecipe({ ...recipe, title: e.target.value })
                    }
                  />
                </Form.Group>
                {/* ====== Description ====== */}
                <Form.Group>
                  <label>Description</label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    style={{ borderRadius: "15px" }}
                    value={recipe.description}
                    onChange={(e) =>
                      setRecipe({ ...recipe, description: e.target.value })
                    }
                  />
                </Form.Group>

                {/* ====== Add ingredient ====== */}
                <Form.Group>
                  <label style={{ marginRight: "10px", marginTop: "30px" }}>
                    Ingredient :{" "}
                  </label>
                  {recipe.ingredient.map((ingredients, index) => (
                    <Form.Control
                      key={index}
                      type="text"
                      style={{ borderRadius: "10px", marginBottom: "15px" }}
                      value={ingredients}
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
                  {recipe.steps.map((step, index) => (
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

          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button type="Submit" variant="primary">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default EditRecipe;
