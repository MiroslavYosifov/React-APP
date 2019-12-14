import React from 'react';
import './RecipeCategory.css';

function RecipeCategory(props) {

  function handleCategory (e) {
    const category = props.category.toLowerCase();
    props.history.push(`/recipes/${category}?category=${category}`);
  }
  
  return (
    <section onClick={handleCategory} className="Recipe-category">
        <section className="Recipe-category-media">
            <img src={props.imageUlr} alt=""/>
            <div><h1>{props.category}</h1></div>
        </section>
    </section>
  )
};

export default RecipeCategory;