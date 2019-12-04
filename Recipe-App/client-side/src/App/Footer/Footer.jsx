import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer({isLogged}) {
  return <nav className="Footer">
    <ul>
      <Link to="/home">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/recipe">Recipe</Link>
      <Link to="/contacts">Contacts</Link>
      { !isLogged && <Link to="/register">Register</Link>}
      { !isLogged && <Link to="/login">Login</Link>}
      { isLogged && <Link to="/logout">Logout</Link>}
    </ul>
  </nav>;
};

export default Footer;