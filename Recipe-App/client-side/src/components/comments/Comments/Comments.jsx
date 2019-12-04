import React from 'react';
import './Comments.css';
import Comment from '../Comment/Comment';

function Comments ({comments}) {

  return (
    <section className="RecipeCommentsContainer">
        <section className="RecipeComments">
            <header>
                <h2>Comments:</h2>
            </header>
            {comments.map((comment, index) => 
              <Comment key={index}
                title={comment.title}
                content={comment.content}
              ></Comment>)}
        </section>
    </section>
  )
};

export default Comments;