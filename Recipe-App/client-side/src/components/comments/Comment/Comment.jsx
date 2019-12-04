import React from 'react';
import './Comment.css';

function Comment({title, content}) {  
  return (
    <section className="Comment">
      <p>{title}</p>
      <p>{content}</p>
      <p>AuthorName: Miroslav</p>
    </section>
  )
};

export default Comment;