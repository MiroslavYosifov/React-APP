import React from 'react';
import './MyPostedRecipes.css';
import Recipe from '../../Recipe/Recipe';
import { Link } from 'react-router-dom';

function MyPostedRecipes({recipes, isLogged, hideRecipeElements}) {
  return (
      <section className="My-posted-recipes mobile">
        <header>
          <h2>MY POSTED RECIPES</h2>
        </header>
        <div className="My-recipes-container">
        {recipes.map((recipe, index) => 
            <Recipe key={index}
              recipeId={recipe._id}
              imageUrl={recipe.imageUrl}
              title={recipe.title}
              ingredients={recipe.ingredients}
              preparation={recipe.preparation}
              category={recipe.category}
              likes={recipe.likes}
              isLogged={isLogged}
              hideRecipeElements={hideRecipeElements}
            ></Recipe>)}
        </div>
      </section>
  )
};

export default MyPostedRecipes;