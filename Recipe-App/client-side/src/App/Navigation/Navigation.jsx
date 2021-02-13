import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

function Navigation({ isLogged, username }) {
  console.log(username);
  return (    
      <nav className="Navigation">
        <ul>
          <Link to="/">Home</Link>
          {/* <Link to="/about">About</Link> */}
          <Link to="/recipes">Recipes</Link>
          { isLogged && <Link to="/myRecipes">MyRecipes</Link>}
          { isLogged && <Link to={`/myProfile`}>MyProfile</Link> }
          { !isLogged && <Link to="/register">Register</Link>}
          { !isLogged && <Link to="/login">Login</Link>}
          { isLogged && <p> Hello {username}!</p>}
          { isLogged && <Link to="/logout">Logout</Link>}
        </ul>
      </nav>
  )
};

export default Navigation;