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
    const category = e.target.value
    const url = this.props.location.pathname + `?category=${category}`;
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

  handleSearch = (e) => {
    
  }

  render (){
    return (
      <nav className="RecipeNavigation">
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
        <section>
            <h3>Criterion:</h3>
            <button onClick={this.handleSearch} value="mostliked">Most Liked</button>
            <button onClick={this.handleSearch} value="mostrecent">Most Recent</button>
        </section>
      </nav>
    )
  }
};

export default RecipeNavigation;