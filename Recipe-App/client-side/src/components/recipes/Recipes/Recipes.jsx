import React from 'react';
import './Recipes.css';
import { Link, Route } from 'react-router-dom';
import Recipe from '../Recipe/Recipe';
import PostRecipe from '../PostRecipe/PostRecipe';
import recipeService from '../../../services/recipe-service';


class Recipes extends React.Component {
  constructor (props) {
    super(props) 
        this.state = {
            recipes: [],
            showDetailsButton: Boolean
        }
  }

  componentDidMount() {
    recipeService.getAllRecipes().then(recipes => {
      this.setState({ 
        recipes: recipes,
        showDetailsButton: true 
      });
    });
  }

  render() {
    const { recipes } = this.state;
    const showDetailsButton = this.state.showDetailsButton;
    const isLogged = this.props.isLogged;

    return (
      <div className="RecipesWrapper">
        {isLogged && <Link to="/recipe/post">Post Recipe</Link>}
        {isLogged && <Route path={this.props.match.url + '/post'} component={PostRecipe} />}
        <header>
          <h1>LIST RECIPES</h1>
        </header>
        <div className="RecipesContainer">
        {recipes.map((recipe, index) => 
            <Recipe key={index}
              recipeId={recipe._id}
              imageUrl={recipe.imageUrl}
              title={recipe.title}
              products={recipe.products}
              showDetailsButton={showDetailsButton}
            ></Recipe>)}
        </div>
      </div>
    )
  }
}

export default Recipes;