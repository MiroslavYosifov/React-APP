import React from 'react';
import './Recipe.css';
import { Link } from 'react-router-dom';
import recipeService from '../../../services/recipe-service'

function Recipe({recipeId, title, imageUrl, products, hideRecipeElements}) {

  return (
    <section className="Recipe">
      <section className="Recipe-media">
          <img src={imageUrl} alt=""/>
      </section>
      <section className="Recipe-content">
          <section className="Products">
              <h4>{title}</h4>
              <ul>
                { !hideRecipeElements ? <li>{products}</li> : ''}
              </ul>
          </section>
          <section className="RecipeButtonsWrapper">
          { hideRecipeElements ? <Link className="DetailButton" to={"/recipe/details/" + recipeId}>Details</Link> : '' }
          { !hideRecipeElements ? <Link className="EditButton" to={"/recipe/edit/" + recipeId}>Edit</Link> : ''}
          </section>
      </section>
    </section>
  )
};

export default Recipe;