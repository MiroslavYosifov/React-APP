import React from 'react';
import './Background.css';

function Background({imageUlr}) {  
  return (
    <section className="Background-media">
      <img src="https://images.pexels.com/photos/1435895/pexels-photo-1435895.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260" alt=""/>
       <section class="Background-text">
        <h1 class="Site-title"><b>Welcome to our webesite for cooking</b></h1>
        <h2 class="Site-title">Recipe Categories</h2>
      </section>
    </section>
  )
};

export default Background;