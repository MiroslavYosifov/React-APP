import React from 'react';
import './MyFovoriteRecipes.css';
import Recipe from '../../Recipe/Recipe';
import { Link } from 'react-router-dom';

function MyFovoriteRecipes({myFavoriteRecipes, isLogged, hideRecipeElements}) {
  return (
      <section className="My-fovorite-recipes">
        <header>
          <h2>MY FAVORITE RECIPES</h2>
        </header>
        <div className="My-fovorite-container">
        {myFavoriteRecipes.map((recipe, index) => 
            <Recipe key={index}
              recipeId={recipe._id}
              imageUrl={recipe.imageUrl}
              title={recipe.title}
              ingredients={recipe.ingredients}
              preparation={recipe.preparation}
              likes={recipe.likes}
              isLogged={isLogged}
              hideRecipeElements={hideRecipeElements}
            ></Recipe>)}
        </div>
      </section>
  )
};

export default MyFovoriteRecipes;