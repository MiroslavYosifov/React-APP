import React from 'react';
import './Search.css';
import { Router, Link } from 'react-router-dom';
import recipeService from '../../services/recipe-service';

class Search extends React.Component {
    constructor (props) {
      super(props) 
          this.state = {
            search: ''
          }
    }

    searchChangeHandler = (e) => {
        this.setState({
            search: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }

    render() {
      return (
        <section className="Search">
          <form onSubmit={this.handleSubmit}>
            <p>
                <input type="search" onChange={this.searchChangeHandler}  id="search"/>
                {/* {productsError && <span>{inputError.message}</span>} */}
            </p>
             <p>
                <button className="PostButton" type="submit">Search</button>
                {/* {productsError && <span>{inputError.message}</span>} */}
            </p>
          </form>
        </section>
      )
    }
    }

export default Search;
