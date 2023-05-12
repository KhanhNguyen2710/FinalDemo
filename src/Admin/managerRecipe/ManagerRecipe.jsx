import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Modal, Pagination, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { Input } from "reactstrap";
import RecipeAdd from "../../components/recipe/recipeAdd/RecipeAdd";
import { db } from "../../firebase";

const ManagerRecipe = () => {
  const [recipeList, setRecipeListList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    const getData = async () => {
      let data = [];
      const querySnapshot = await getDocs(collection(db, "recipes"));
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
        console.log(doc.id, " => ", doc.data());
      });
      setRecipeListList(data);
    };
    getData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentRecipe = recipeList.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(recipeList.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleDelete = async (userID) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteDoc(doc(db, "user", userID));
      setRecipeListList((prevState) =>
        prevState.filter((user) => user.id !== userID)
      );
      toast.success("User successfully deleted.");
    }
  };

  const handleEdit = (id) => {
    setEditId(id);
    setEditTitle(recipeList.find((recipe) => recipe.id === id).title);
    setShowModal(true);
  };

  const handleSave = async (id, title) => {
    await updateDoc(doc(db, "recipes", id), { title });
    setRecipeListList(
      recipeList.map((recipe) =>
        recipe.id === id ? { ...recipe, title } : recipe
      )
    );
    setEditId(null);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div>
        <RecipeAdd />
      </div>
      <div className="d-flex mt-3">
        <Input type="text" placeholder="Search" />
        <Button>search</Button>
      </div>
      <>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Image</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRecipe.map((item, index) => (
              <tr>
                <td>{indexOfFirstProduct + index + 1}</td>
                {/* {editId === item.id ? (
                  <Input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                ) : (
                  item.title
                )} */}
                <td>{item.title}</td>
                <td>
                  <img
                    src={item.img}
                    alt=""
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>
                  <div className="d-flex gap-4 " style={{ width: "30px" }}>
                    <i
                      class="fa fa-trash fs-5"
                      onClick={() => handleDelete(item.id)}
                    ></i>

                    {/* {editId === item.id ? (
                      <i
                        class="fa fa-save fs-5"
                        onClick={() => handleSave(item.id, editTitle)}
                      ></i>
                    ) : (
                      <i
                        class="fa fa-pencil fs-5"
                        onClick={() => handleEdit(item.id)}
                      ></i>
                    )} */}

                    <i
                      class="fa fa-pencil fs-5"
                      onClick={() => handleEdit(item.id)}
                    ></i>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {showModal && (
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Recipe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => handleSave(editId, editTitle)}
              >
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        )}

        <Pagination>
          {pageNumbers.map((number) => (
            <Pagination.Item
              key={number}
              active={number === currentPage}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </Pagination.Item>
          ))}
        </Pagination>
      </>
    </div>
  );
};

export default ManagerRecipe;
