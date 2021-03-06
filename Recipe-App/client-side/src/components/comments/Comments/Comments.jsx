import React from 'react';
import './Comments.css';
import Comment from '../Comment/Comment';

function Comments ({comments}) {
  
  return (
    <section className="CommentsContainer">
        <section className="Comments">
            <header>
                <h3>Comments</h3>
            </header>
            {comments.map((comment, index) => 
              <Comment key={index}
                title={comment.title}
                content={comment.content}
                creator={comment.creator}
              ></Comment>)}
        </section>
    </section>
  )
};

export default Comments;