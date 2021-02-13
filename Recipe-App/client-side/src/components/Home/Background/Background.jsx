import React from 'react';
import './Background.css';

function Background({imageUrl}) {  
  return (
    <section className="Background-media">
      <img src={imageUrl} alt=""/>
       <section className="Background-text">
        <h1 className="Site-title"><b>Welcome to our webesite for cooking</b></h1>
        <h2 className="Site-title">Recipe Categories</h2>
      </section>
    </section>
  )
};

export default Background;