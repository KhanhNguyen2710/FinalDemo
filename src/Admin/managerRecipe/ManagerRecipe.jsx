import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Pagination, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { Input } from "reactstrap";
import RecipeAdd from "../../components/recipe/recipeAdd/RecipeAdd";
import { db } from "../../firebase";
import EditRecipe from "./EditRecipe";

const ManagerRecipe = () => {
  const [recipeList, setRecipeListList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredRecipeList, setFilteredRecipeList] = useState([]);

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

  const handleSearch = () => {
    const filteredList = recipeList.filter((recipe) => {
      const { title } = recipe;
      const searchValue = searchInput.toLowerCase();
      return title.toLowerCase().includes(searchValue);
    });
    setFilteredRecipeList(filteredList);
  };

  //implement pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(5);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipe = recipeList.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(recipeList.length / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteDoc(doc(db, "recipes", id));
      setRecipeListList((prevState) =>
        prevState.filter((recipe) => recipe.id !== id)
      );
      toast.success("User successfully deleted.");
    }
  };

  const [editRecipe, setEditRecipe] = useState(null);
  const getDocument = async (docId) => {
    const document = await getDoc(doc(db, "recipes", docId));

    if (document.exists()) {
      setEditRecipe({ id: document.id, ...document.data() });
      console.log("Document data:", document.data());
    } else {
      console.log("No such document!");
    }
  };

  const fetchData = async () => {
    let data = [];
    const querySnapshot = await getDocs(collection(db, "recipes"));
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
      console.log(doc.id, " => ", doc.data());
    });
    setRecipeListList(data);
  };

  return (
    <div>
      <div>
        <RecipeAdd />
      </div>
      <div className="d-flex mt-3">
        <Input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <Button onClick={handleSearch}>search</Button>
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
            {currentRecipe.length === 0 ? (
              <tr>
                <td colSpan="6">No recipes found.</td>
              </tr>
            ) : (
              currentRecipe.map((item, index) => (
                <tr>
                  <td>{indexOfFirstRecipe + index + 1}</td>
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
                      {/* <i class="ri-eye-fill fs-5"></i> */}
                      <i
                        class="fa fa-pencil fs-5"
                        // onClick={() => handleEdit(item.id)}
                        onClick={() => {
                          getDocument(item.id);
                          setModalShow(true);
                        }}
                      ></i>
                      <i
                        class="fa fa-trash fs-5"
                        onClick={() => handleDelete(item.id)}
                      ></i>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        {editRecipe && (
          <EditRecipe
            show={modalShow}
            // onHide={() => setModalShow(false)}
            id={editRecipe.id}
            description={editRecipe.description}
            title={editRecipe.title}
            img={editRecipe.img}
            createDate={editRecipe.createDate}
            ingredient={editRecipe.ingredient}
            steps={editRecipe.steps}
            onHide={() => {
              setModalShow(false);
              fetchData();
              window.location.reload();
            }}
            onClose={() => {
              setModalShow(false);
            }}
          />
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
