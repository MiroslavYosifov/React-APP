import React from 'react';
import './RecipeComments.css';
import RecipeComment from '../RecipeComment/RecipeComment';

function RecipeComments ({comments}) {  
  return (
    <section className="RecipeCommentsContainer">
        <section className="RecipeComments">
            <header>
                <h2>Comments:</h2>
            </header>
            {comments.map((comment, index) => 
              <RecipeComment key={index}
                title={comment.title}
                content={comment.content}
              ></RecipeComment>)}
        </section>
    </section>
  )
};

export default RecipeComments;