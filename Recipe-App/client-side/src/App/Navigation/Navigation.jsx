import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

function Navigation({ isLogged }) {
  return (
      <nav className="Navigation">
        <ul>
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/recipe">Recipe</Link>
          <Link to="/contacts">Contacts</Link>
          { !isLogged && <Link to="/register">Register</Link>}
          { !isLogged && <Link to="/login">Login</Link>}
          { isLogged && <Link to="/logout">Logout</Link>}
        </ul>
      </nav>
  )
};

export default Navigation;