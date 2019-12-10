import React from 'react';
import './RecipeNavigation.css'
import { Link } from 'react-router-dom';

function RecipeNavigation(props) {
  console.log('fe3f3',props);
  
  return (
      <nav className="RecipeNavigation">
        <ul>
            {props.isLogged && <Link to="/myRecipes/post">Add Recipe</Link>}
            <Link to="/recipe/liked">Мost Liked</Link>
            <Link to="/recipe/recent">Мost recent</Link>
        </ul>
      </nav>
  )
};

export default RecipeNavigation;