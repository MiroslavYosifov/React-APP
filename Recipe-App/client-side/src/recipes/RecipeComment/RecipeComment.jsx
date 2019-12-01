import React from 'react';
import './RecipeComment.css';

function RecipeComment({title, content}) {  
  return (
    <section className="RecipeComment">
      <p>{title}</p>
      <p>{content}</p>
      <p>AuthorName: Miroslav</p>
    </section>
  )
};

export default RecipeComment;