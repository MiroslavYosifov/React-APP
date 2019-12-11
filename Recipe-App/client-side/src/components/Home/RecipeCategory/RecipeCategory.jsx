import React from 'react';
import './RecipeCategory.css';

function RecipeCategory({imageUlr, title}) {  
  return (
    <section className="Recipe-category">
        <section className="Recipe-category-media">
            <img src={imageUlr} alt=""/>
            <div><h1>{title}</h1></div>
        </section>
    </section>
  )
};

export default RecipeCategory;