import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return <nav className="Footer">
    <ul>
      <Link to="/home">Home</Link>
      <Link to="/recipe">Recipe</Link>
      <Link to="/contacts">Contacts</Link>
    </ul>
  </nav>;
};

export default Footer;