import React from 'react';
import './Comment.css';

function Comment({title, content, creator}) {  
  return (
    <section className="Comment">
      <p>{title}</p>
      <p>{content}</p>
      <p>Author: {creator}</p>
    </section>
  )
};

export default Comment;