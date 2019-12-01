import React from 'react';
import './Recipe.css';
import { Link } from 'react-router-dom';

function Recipe({recipeId, title, imageUrl, products, showDetailsButton}) {
  return (
    <section className="Recipe">
      <section className="Recipe-media">
          <img src={imageUrl} alt=""/>
      </section>
      <section className="Recipe-content">
          <section className="Products">
              <h3>{title}</h3>
              <ul>
                <li>{products}</li>
              </ul>
          </section>
          <section>
          { showDetailsButton ? <Link to={"/recipe/details/" + recipeId}>Details</Link> : '' }
          </section>
      </section>
    </section>
  )
};

export default Recipe;