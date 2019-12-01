import React from 'react';
import './Recipes.css';
import { Link, Route } from 'react-router-dom';
import Recipe from '../Recipe/Recipe';
import PostRecipe from '../PostRecipe/PostRecipe';
import recipeService from '../../services/recipe-service';


class Recipes extends React.Component {
  constructor (props) {
    super(props) 
        this.state = {
            recipes: ['1']
        }
  }

  componentDidMount() {
    recipeService.getAllRecipes().then(recipes => {
      this.setState({ recipes });
    });
  }

  render() {
    const { recipes } = this.state;
    return (
      <div key={'32453'} className="RecipesWrapper">
        {this.props.isLogged && <Link to="/recipe/post">Post Recipe</Link>}
        <Route path={this.props.match.url + '/post'} component={PostRecipe} />
        <header>
          <h1>LIST RECIPES</h1>
        </header>
        <div className="RecipesContainer">
        {recipes.map((recipes, index) => 
            <Recipe key={index}
              recipeId={recipes._id}
              imageUrl={recipes.imageUrl}
              title={recipes.title}
              products={recipes.products}
            ></Recipe>)}
        </div>
      </div>
    )
  }
}

export default Recipes;