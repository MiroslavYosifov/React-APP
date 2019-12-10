import React from 'react';
import './Recipes.css';
import queryString from 'query-string'
import { Link, Route } from 'react-router-dom';
import Recipe from '../Recipe/Recipe';
import PostRecipe from '../PostRecipe/PostRecipe';
import recipeService from '../../../services/recipe-service';
import RecipeNavigation from '../RecipeNavigation/RecipeNavigation';
import Search from '../../Search/Search';
import SideNav from '../../SideNav/SideNav';

class Recipes extends React.Component {
  constructor (props) {
    super(props) 
        this.state = {
          recipes: [],
          hideRecipeElements: Boolean,
          isSearchHidden: false,
        }
  }

  componentDidMount () {
    const searchQuery = this.props.location.search;
    const searchParams = queryString.parse(searchQuery);

    if(searchParams.search !== undefined) {
      recipeService.searchRecipes(searchQuery).then(recipes => {
        this.setState({ 
          recipes: recipes,
          hideRecipeElements: true,
        });
      });
    } else {
      recipeService.getAllRecipes().then(recipes => {
        this.setState({ 
          recipes: recipes,
          hideRecipeElements: true 
        });
      });
    }
  }

  handleSearchParams = (data) => {
    this.setState({ searchParams: data})
  }

  showHideSearch = (e) => { 
     this.setState({ isSearchHidden: this.state.isSearchHidden ? false : true });
  }

  render() {
    const { recipes, isSearchHidden } = this.state;
    const hideRecipeElements = this.state.hideRecipeElements;
    const isLogged = this.props.isLogged;
    
    return (
      <div className="RecipesWrapper">
        <RecipeNavigation {...this.props}/>
        <SideNav isSearchHidden={isSearchHidden} showHideSearch={this.showHideSearch}/>
        { isSearchHidden && <Search  {...this.props} handleSearchParams={this.handleSearchParams} />}
        <header>
          <h2>ALL RECIPES</h2>
        </header>
        <div className="RecipesContainer">
        {recipes.map((recipe, index) => 
            <Recipe key={index}
              recipeId={recipe._id}
              imageUrl={recipe.imageUrl}
              title={recipe.title}
              products={recipe.products}
              hideRecipeElements={hideRecipeElements}
            ></Recipe>)}
        </div>
      </div>
    )
  }
}

export default Recipes;