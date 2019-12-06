import React from 'react';
import './Recipe.css';
import { Link } from 'react-router-dom';
import recipeService from '../../../services/recipe-service'

// function Recipe({recipeId, title, imageUrl, products, hideRecipeElements}) {

// };

class Recipe extends React.Component {
  constructor (props) {
    super(props) 
        this.state = {
            
        }
  }

  handleDelete = (e) => {
    const recipeId = this.props.recipeId;  
    recipeService.deleteMyRecipe(recipeId).then(() => {
      this.props.history.push('/recipe');
    });
  }

  render() {
    const {recipeId, title, imageUrl, products, hideRecipeElements} = this.props;

    return (
      <section className="Recipe">
        <section className="Recipe-media">
            <img src={imageUrl} alt=""/>
        </section>
        <section className="Recipe-content">
            <section className="Products">
                <h4>{title}</h4>
                <ul>
                  { !hideRecipeElements ? <li>{products}</li> : ''}
                </ul>
            </section>
            <section className="RecipeButtonsWrapper">
            { hideRecipeElements ? <Link className="DetailButton" to={"/recipe/details/" + recipeId}>Details</Link> : '' }
            { !hideRecipeElements ? <Link className="EditButton" to={"/recipe/edit/" + recipeId}>Edit</Link> : ''}
            { !hideRecipeElements ? <button onClick={this.handleDelete} className="DeleteButton" >Delete</button> : ''}
            </section>
        </section>
      </section>
    )
  }
}

export default Recipe;
