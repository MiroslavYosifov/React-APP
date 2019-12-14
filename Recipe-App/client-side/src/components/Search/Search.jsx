import React from 'react';
import './Search.css';
import queryString from 'query-string'
import { Router, Link, Redirect  } from 'react-router-dom';
import recipeService from '../../services/recipe-service';

class Search extends React.Component {
    constructor (props) {
      super(props) 
          this.state = {
            searchParams: '',
          }
    }

    componentDidMount () {
        const searchQuery = this.props.location.search;
        const searchParams = queryString.parse(searchQuery);
        this.setState ({ 
            searchParams: searchParams.search 
        })
    }

    searchChangeHandler = (e) => { this.setState({ searchParams: e.target.value })}
    handleSubmit = (e) => {
        e.preventDefault();
        const url = this.props.location.pathname + '?search=' + this.state.searchParams;
        this.props.history.replace(`/reload`);
        setTimeout(() => {
            this.props.history.replace(url);
        }, 1);
    }

    render() {
        const {searchParams} = this.state;
        
        return (
          <section className="Search">
            <form onSubmit={this.handleSubmit}>
              <p>
                  <input type="search" onChange={this.searchChangeHandler} value={searchParams}/>
              </p>
               <p>
                  <button className="PostButton">Search</button>
              </p>
            </form>
          </section>
        )
    }
}

export default Search;
