import React from 'react';
import './RecipeComments.css';
import RecipePostComment from '../RecipePostComment/RecipePostComment';
import RecipeComment from '../RecipeComment/RecipeComment';

function RecipeComments() {
  return (
    <section className="RecipeCommentsContainer">
        <header>
            <h2>Post comment:</h2>
        </header>
        <RecipePostComment />
        <section className="RecipeComments">
            <header>
                <h2>Comments:</h2>
            </header>
            <RecipeComment />
            <RecipeComment />
            <RecipeComment />
            <RecipeComment />
        </section>
    </section>
  )
};

export default RecipeComments;