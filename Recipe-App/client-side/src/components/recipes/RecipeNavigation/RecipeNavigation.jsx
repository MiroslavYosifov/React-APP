import React from 'react';
import './RecipeNavigation.css'
import { Link } from 'react-router-dom';

function RecipeNavigation () {

    return (
      <nav className="RecipeNavigation">
        <section className="RecipeNavigation-criterion">
            <h3>Criterion:</h3>
            <Link to="/recipes/likes?criterion=likes">Most Liked</Link>
            <Link to="/recipes/createdDate?criterion=createdDate">Most Recent</Link>
        </section>
        <section className="RecipeNavigation-criterion">
            <h3>Category:</h3>
            <Link to="/recipes">All</Link>
            <Link to="/recipes/salad?category=salad">Salad</Link>
            <Link to="/recipes/meat?category=meat">Meat</Link>
            <Link to="/recipes/soup?category=soup">Soup</Link>
            <Link to="/recipes/fish?category=fish">Fish</Link>
            <Link to="/recipes/pasta?category=pasta">Pasta</Link>
            <Link to="/recipes/dessert?category=dessert">Desserts</Link>
        </section>
      </nav>
    )
};

export default RecipeNavigation;