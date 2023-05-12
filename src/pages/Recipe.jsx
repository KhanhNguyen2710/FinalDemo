import React from "react";
import Helmet from "../components/Helmet/Helmet";
import RecipeTest from "../components/recipe/RecipeTest";
import RecipeAdd from "../components/recipe/recipeAdd/RecipeAdd";
import RecipeShow from "../components/recipe/recipeShow/RecipeShow";

const Recipe = () => {
  return (
    <Helmet title="Recipe">
      {/* <RecipeAdd /> */}
      {/* <RecipeTest /> */}
      <section>
        <RecipeShow />
      </section>
    </Helmet>
  );
};

export default Recipe;
