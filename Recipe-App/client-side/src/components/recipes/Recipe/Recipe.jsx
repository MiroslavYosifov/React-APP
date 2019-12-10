import React from 'react';
import './Recipe.css';
import RecipeContent from './RecipeContent/RecipeContent';
import { Link } from 'react-router-dom';
import recipeService from '../../../services/recipe-service';

class Recipe extends React.Component {
  constructor (props) {
    super(props) 
        this.state = {
            
        }
  }

  handleDelete = (e) => {
    const recipeId = this.props.recipeId;  
    recipeService.deleteMyRecipe(recipeId).then(() => {
      this.props.history.push('/myRecipes');
    });
  }

  handleLike = (e) => {
    const recipeId = this.props.recipeId;  
    recipeService.likeRecipe(recipeId).then(() => {
      this.props.history.push('/myRecipes');
    });
  }

  handleDisLike = (e) => {
    const recipeId = this.props.recipeId;  
    recipeService.disLikeRecipe(recipeId).then(() => {
      this.props.history.push('/myRecipes');
    });
  }

  render() {
    const {recipeId, title, imageUrl, ingredients, preparation, isCreator, isFavorite, hideRecipeElements, likes, isLogged} = this.props;
    console.log(isFavorite);
  
    return (
      <section className="Recipe">
        <section className="Recipe-media">
            <img src={imageUrl} alt=""/>
        </section>
        <section className="Recipe-content-container">
          { hideRecipeElements && <h4>{title}</h4>}
          {!hideRecipeElements && <RecipeContent {...this.props}/>}
          <section className="RecipeButtonsWrapper">
          { hideRecipeElements ? <p className="Favorites"><i className="fas fa-star"></i><span>{likes}</span></p> : ''}
          { hideRecipeElements ? <Link className="DetailButton" to={"/recipe/details/" + recipeId}>Details</Link> : '' }
          { !hideRecipeElements && !isFavorite && isLogged && <button onClick={this.handleLike} className="LikeButton" >Add to Favorites</button>}
          { !hideRecipeElements && isFavorite && isLogged && <button onClick={this.handleDisLike} className="LikeButton" >Remove from Favorites</button>}
          { !hideRecipeElements && isCreator ? <Link className="EditButton" to={"/recipe/edit/" + recipeId}>Edit</Link> : ''}
          { !hideRecipeElements && isCreator ? <button onClick={this.handleDelete} className="DeleteButton" >Delete</button> : ''}
          </section>
        </section>
      </section>
    )
  }
}

export default Recipe;
