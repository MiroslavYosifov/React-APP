import React from 'react';
import './Comment.css';

function Comment({title, content, creator}) {  
  return (
    <section className="Comment">
      <h5>Title: {title}</h5>
      <p>{content}</p>
      <blockquote>Author: {creator}</blockquote>
    </section>
  )
};

export default Comment;