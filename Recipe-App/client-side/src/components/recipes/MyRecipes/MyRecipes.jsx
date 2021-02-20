import React from 'react';
import './MyRecipes.css';
import queryString from 'query-string'
import { Link, Route } from 'react-router-dom';
import Recipe from '../Recipe/Recipe';
import PostRecipe from '../PostRecipe/PostRecipe';
import MyPostedRecipes from './MyPostedRecipes/MyPostedRecipes';
import MyFovoriteRecipes from './MyFovoriteRecipes/MyFovoriteRecipes';
import recipeService from '../../../services/recipe-service';
import RecipeNavigation from '../RecipeNavigation/RecipeNavigation';

class MyRecipes extends React.Component {
  constructor (props) {
    super(props) 
        this.state = {
            recipes: [],
            myFavoriteRecipes: [],
            hideRecipeElements: Boolean,
            isPostRecipeHidden: true,
            isFavoriteRecipesHidden: true
        }
  }

  componentDidMount() {
    const searchQuery = this.props.location.search;
    const searchParams = queryString.parse(searchQuery);
    if(searchParams.search !== undefined || searchParams.category !== undefined) {
      recipeService.searchRecipes(searchQuery).then(recipes => {
        this.setState({ 
          recipes: recipes,
          hideRecipeElements: true,
        });
      });
    } else {
      recipeService.getMyRecipes().then(user => {
        this.setState({ 
          recipes: user.recipes,
          myFavoriteRecipes: user.likedRecipes,
          hideRecipeElements: true 
        });
      });
    }
  }

  handleShowHidePostRecipe = (e) => {
    e.preventDefault();
    this.setState({ isPostRecipeHidden: this.state.isPostRecipeHidden ? false : true });
  }

  handleShowHideFavoriteRecipes = (e) => {
    e.preventDefault();
    this.setState({ isFavoriteRecipesHidden: this.state.isFavoriteRecipesHidden ? false : true });
  }
  
  render() {
    const { recipes, myFavoriteRecipes, hideRecipeElements, isPostRecipeHidden, isFavoriteRecipesHidden } = this.state;
    const isLogged = this.props.isLogged;
    
    return (
      <div className="My-recipes-wrapper">
        <section className="My-recipes-nav">
          {isLogged && <button onClick={this.handleShowHidePostRecipe} className="PostButton">Add Recipe</button>}
          {isLogged && <button onClick={this.handleShowHideFavoriteRecipes} className="LikeButton">{ isFavoriteRecipesHidden ? "Show Favorites Recipes" : "Hide Favorites Recipes"}</button>}
        </section>
        {isLogged && !isPostRecipeHidden && <PostRecipe {...this.props} />}
        {isLogged && !isFavoriteRecipesHidden && <MyFovoriteRecipes myFavoriteRecipes={myFavoriteRecipes} isLogged={isLogged}  hideRecipeElements={hideRecipeElements}/>}
        <MyPostedRecipes recipes={recipes} isLogged={isLogged}  hideRecipeElements={hideRecipeElements}/>
      </div>
    )
  }
}

export default MyRecipes;