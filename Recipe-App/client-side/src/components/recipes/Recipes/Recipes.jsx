import React from 'react';
import './Recipes.css';
import { Link, Route } from 'react-router-dom';
import Recipe from '../Recipe/Recipe';
import PostRecipe from '../PostRecipe/PostRecipe';
import recipeService from '../../../services/recipe-service';
import RecipeNavigation from '../RecipeNavigation/RecipeNavigation';


class Recipes extends React.Component {
  constructor (props) {
    super(props) 
        this.state = {
            recipes: [],
            hideRecipeElements: Boolean
        }
  }

  componentDidMount() {
    recipeService.getAllRecipes().then(recipes => {
      this.setState({ 
        recipes: recipes,
        hideRecipeElements: true 
      });
    });
  }

  render() {
    const { recipes } = this.state;
    const hideRecipeElements = this.state.hideRecipeElements;
    const isLogged = this.props.isLogged;
    //console.log(hideRecipeElements);
    
    return (
      <div className="RecipesWrapper">
        <RecipeNavigation isLogged={isLogged}/>
        {isLogged && <Route path={this.props.match.url + '/post'} component={PostRecipe} />}
        <header>
          <h2>RECIPES</h2>
        </header>
        <div className="RecipesContainer">
        {recipes.map((recipe, index) => 
            <Recipe key={index}
              recipeId={recipe._id}
              imageUrl={recipe.imageUrl}
              title={recipe.title}
              products={recipe.products}
              hideRecipeElements={hideRecipeElements}
              {...this.props}
            ></Recipe>)}
        </div>
      </div>
    )
  }
}

export default Recipes;