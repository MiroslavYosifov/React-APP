import React from 'react';
import './RecipeNavigation.css'
import { Link } from 'react-router-dom';

class RecipeNavigation extends React.Component  {
  constructor (props) {
    super(props)
      this.state = {
      }  
  }

  handleCategory = (e) => {
    e.preventDefault();
    const category = e.target.value;
    const url = this.props.location.pathname + `?category=${category}`;
    this.props.history.replace(`/reload`);
    setTimeout(() => {
        this.props.history.replace(url);
    }, 1);
  }

  handleCriterion = (e) => {
    e.preventDefault();
    const criterion = e.target.value;
    const url = this.props.location.pathname + '?criterion=' + criterion;
    this.props.history.replace(`/reload`);
    setTimeout(() => {
        this.props.history.replace(url);
    }, 1);
  }

  handleAll = (e) => {
    e.preventDefault();
    this.props.history.replace(`/reload`);
    setTimeout(() => {
        this.props.history.replace(`/recipe`);
    }, 1);
  }

  render (){

    return (
      <nav className="RecipeNavigation">
        <section className="RecipeNavigation-criterion">
            <h3>Criterion:</h3>
            <button onClick={this.handleCriterion} value="likes">Most Liked</button>
            <button onClick={this.handleCriterion} value="createdDate">Most Recent</button>
        </section>
        <section>
            <h3>Category:</h3>
            <button onClick={this.handleAll} value="salad">All</button>
            <button onClick={this.handleCategory} value="salad">Salads</button>
            <button onClick={this.handleCategory} value="meat">Meats</button>
            <button onClick={this.handleCategory} value="soup">Soups</button>
            <button onClick={this.handleCategory} value="fish">Fish</button>
            <button onClick={this.handleCategory} value="pasta">Pasta</button>
            <button onClick={this.handleCategory} value="meat">Meats</button>
        </section>
      </nav>
    )
  }
};

export default RecipeNavigation;