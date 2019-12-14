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
import RecipesCategoryList from './RecipesCategoryList/RecipesCategoryList';

class Recipes extends React.Component {
  constructor (props) {
    super(props) 
        this.state = {
          recipes: [],
          isSearchHidden: false,
          hideRecipeElements: Boolean,
        }
  }

  componentDidMount () {    
    recipeService.getAllRecipes().then(recipes => {
      this.setState({ 
        recipes: recipes,
        hideRecipeElements: true 
      });
    });
  }

  showHideSearch = (e) => {this.setState({ isSearchHidden: this.state.isSearchHidden ? false : true })}

  render() {
    const { recipes, isSearchHidden, hideRecipeElements } = this.state;
    const isLogged = this.props.isLogged;
    return (
      <div className="RecipesWrapper">
        <RecipeNavigation {...this.props}/>
        <SideNav isSearchHidden={isSearchHidden} showHideSearch={this.showHideSearch}/>
         { isSearchHidden && <Search  {...this.props} handleSearchParams={this.handleSearchParams} />}
        <Route exact path="/recipes/likes" render={(props) => (<RecipesCategoryList {...this.props} />)} />
        <Route exact path="/recipes/createdDate" render={(props) => (<RecipesCategoryList {...this.props} />)} />
        <Route exact path="/recipes/salad" render={(props) => (<RecipesCategoryList {...this.props} />)} />
        <Route exact path="/recipes/meat" render={(props) => (<RecipesCategoryList {...this.props} />)} />
        <Route exact path="/recipes/soup" render={(props) => (<RecipesCategoryList {...this.props} />)} />
        <Route exact path="/recipes/fish" render={(props) => (<RecipesCategoryList {...this.props} />)} />
        <Route exact path="/recipes/pasta" render={(props) => (<RecipesCategoryList {...this.props} />)} />
        <Route exact path="/recipes/dessert" render={(props) => (<RecipesCategoryList {...this.props} />)} />
        <Route exact path="/recipes/search" render={(props) => (<RecipesCategoryList {...this.props} />)} />
        <section className="All-recipes-wrapper">
          <header>
            <h2>ALL RECIPES</h2>
          </header>
          <div className="Recipes-container">
          {recipes.map((recipe, index) => 
              <Recipe key={index}
                recipeId={recipe._id}
                imageUrl={recipe.imageUrl}
                title={recipe.title}
                ingredients={recipe.ingredients}
                preparation={recipe.preparation}
                likes={recipe.likes}
                category={recipe.category}
                createdDate={recipe.createdDate}
                isLogged={isLogged}
                hideRecipeElements={hideRecipeElements}
              ></Recipe>)}
          </div>
        </section>
      </div>
    )
  }
}

export default Recipes;