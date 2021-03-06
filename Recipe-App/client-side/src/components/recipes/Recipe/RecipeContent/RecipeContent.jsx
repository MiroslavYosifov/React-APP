import React from 'react';
import './RecipeContent.css';

function RecipeContent({ingredients, preparation, title, category}) { 

  return (
    <section className="RecipeContent">
        <header>
            <h2><b>{title}</b></h2>
        </header>
        <section>
            <h4><b>Category: {category}</b></h4>
        </section>
        <section>
            <h5><b>Ingredients</b></h5>
            <p>{ingredients}</p>
        </section>
        <section>
            <h5><b>Preparation</b></h5>
            <p>{preparation}</p>
        </section>
    </section>
  )
};

export default RecipeContent;