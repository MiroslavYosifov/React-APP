import React from 'react';
import './Background.css';

function Background({imageUrl}) {  
  return (
    <section className="Background-media">
      <img src={imageUrl} alt=""/>
       <section class="Background-text">
        <h1 class="Site-title"><b>Welcome to our webesite for cooking</b></h1>
        <h2 class="Site-title">Recipe Categories</h2>
      </section>
    </section>
  )
};

export default Background;