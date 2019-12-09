import React from 'react';
import './RecipeContent.css';

function RecipeContent({ingredients, preparation, title}) { 

  return (
    <section className="RecipeContent">
        <header>
            <h3>{title}</h3>
        </header>
        <section>
            <h5>Ingredients</h5>
            <p>{ingredients}</p>
        </section>
        <section>
            <h5>Preparation</h5>
            <p>{preparation}</p>
        </section>
    </section>
  )
};

export default RecipeContent;