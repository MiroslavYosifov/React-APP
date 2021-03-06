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
    const imagePublicId = `recipe-prod/${this.props.imageUrl.split('/recipe-prod/').reverse()[0].split('.')[0]}`;
    const recipeId = this.props.recipeId;
    const data = { recipeId, imagePublicId };

    recipeService.deleteMyRecipe(data).then(() => {
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

  handleEditCmp = (e) => {
    e.preventDefault();
    this.props.showHideEdit();
  }

  render() {
    const {recipeId, title, imageUrl, ingredients, preparation, category, createdDate, recipeCreator, isCreator, isFavorite, hideRecipeElements, likes, isLogged, isEditHidden } = this.props;
    let formatedDate = "";
    if(createdDate) { formatedDate = createdDate.slice(0,10) + ' ' + createdDate.slice(11,19); }
 
    return (
      <section className="Recipe">
        <section className="Recipe-media">
            <img src={imageUrl} alt=""/>
        </section>
        <section className="Recipe-content-container">
          <section className="Recipe-title-content">
            { hideRecipeElements && <h6>{formatedDate}</h6>}
            { hideRecipeElements && <h4>{title}</h4>}
            { hideRecipeElements && <h5>category: {category}</h5> }
          </section>
          {!hideRecipeElements && <RecipeContent {...this.props}/>}
          <section className="Recipe-title-content">
            { !hideRecipeElements && <p>Created on: {formatedDate}</p> }
            { !hideRecipeElements && isLogged && <p>Created by: <Link to={`/userProfile/${recipeCreator}`} > {recipeCreator} </Link> </p> }
          </section>
          <section className="RecipeButtonsWrapper">
          { hideRecipeElements ? <Link className="DetailButton" to={`/recipe/details/${recipeId}`}>Details</Link> : '' }
          { hideRecipeElements ? <p className="Favorites"><i className="fas fa-star"></i><span>{likes}</span></p> : ''}
          { !hideRecipeElements && !isFavorite && isLogged && <button onClick={this.handleLike} className="LikeButton" >Add to Favorites</button>}
          { !hideRecipeElements && isFavorite && isLogged && <button onClick={this.handleDisLike} className="LikeButton" > Remove from Favorites</button>}
          { !hideRecipeElements && isLogged && isCreator ? <button onClick={this.handleEditCmp} className="EditButton">Edit</button> : ''}
          { !hideRecipeElements && isLogged && isCreator ? <button onClick={this.handleDelete} className="DeleteButton" >Delete</button> : ''}
          </section>
        </section>
      </section>
    )
  }
}

export default Recipe;
