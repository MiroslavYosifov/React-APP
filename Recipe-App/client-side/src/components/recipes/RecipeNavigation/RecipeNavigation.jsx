import React from 'react';
import './RecipeNavigation.css'
import { Link } from 'react-router-dom';

function RecipeNavigation({ isLogged }) {
  return (
      <nav className="RecipeNavigation">
        <ul>
            {isLogged && <Link to="/myRecipes/post">Add Recipe</Link>}
            <Link to="/recipe/category">Category</Link>
            <Link to="/recipe/category">Sort</Link>
        </ul>
      </nav>
  )
};

export default RecipeNavigation;