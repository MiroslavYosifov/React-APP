import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

function Navigation({ isLogged, currentUser, props }) {
  console.log(props);
  return (    
      <nav className="Navigation">
        <ul>
          <Link to="/">Home</Link>
          {/* <Link to="/about">About</Link> */}
          <Link to="/recipe">Recipes</Link>
          { isLogged && <Link to="/myRecipes">MyRecipes</Link>}
          { isLogged && <Link to={`/myProfile`}>MyProfile</Link> }
          { !isLogged && <Link to="/register">Register</Link>}
          { !isLogged && <Link to="/login">Login</Link>}
          { isLogged && <Link to="/logout">Logout</Link>}
        </ul>
      </nav>
  )
};

export default Navigation;