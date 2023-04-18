import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import { db } from '../../../firebase';
import "../recipeShow/RecipeShow.css"


const RecipeShow = () => {

  const [recipes, setRecipes] = useState([]);
  
  useEffect(() => {
    const getData = async () => {
      let data = [];
      const querySnapshot = await getDocs(collection(db, "recipes"));
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
        console.log(doc.id, " => ", doc.data());
      });
      setRecipes(data);
      console.log(data);
    };
    getData();
  }, []);
  //   const [showDetails, setShowDetails] = useState(false);

  //   const handleToggleDetails = () => {
  //     setShowDetails(!showDetails);
  // };
  //  viewing is true
  
  const handleView = (id) => {
    const recipesClone = [...recipes];

    recipesClone.forEach((recipe) => {
      if (recipe.id === id) {
        recipe.viewing = !recipe.viewing;
      } else {
        recipe.viewing = false;
      }
    });

    setRecipes(recipesClone);
  };

  // const removeRecipe = (id) => {
  //   deleteDoc(doc(db, "recipes", id));
  // };

  return (
    <div className="recipe_Show mx-5 mb-5">
      {recipes.map((recipe) => (
        <Container>
          <div className="recipe_Card mb-4 gap-4">
            {/* ================= img ================= */}
            <div>
              <img
                src={recipe.img}
                style={{
                  borderRadius: "15px",
                  width: "300px",
                  height: "250px",
                  objectFit: "cover",
                }}
                alt=""
              />
            </div>
            {/* ================= title ================= */}
            <div className="recipe_Title">
              <h2>{recipe.title}</h2>
              <p>{recipe.description}</p>
              <Button onClick={() => handleView(recipe.id)}>
                {recipe.viewing ? "Hide Details" : "Show Details"}
              </Button>
            </div>
          </div>
          {/* ====================== ingredient,steps ====================== */}
          <div className={`recipe_Details ${!recipe.viewing && "hidden"}`}>
            {recipe.viewing && (
              <div className="recipe_Steps" style={{ display: "flex" }}>
                {/* ======================= Ingredients ======================= */}
                <div style={{ flex: 1 }}>
                  <h3>Ingredients:</h3>
                  <ul>
                    {recipe.ingredient.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                {/* ======================= Steps ======================= */}
                <div style={{ flex: 1 }}>
                  <h3>Steps:</h3>
                  <ol>
                    {recipe.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </div>
        </Container>
      ))}
    </div>
  );
}
  export default RecipeShow;