import React from 'react';
import './RecipeDetails.css';
import Recipe from '../Recipe/Recipe'
import Comments from '../../comments/Comments/Comments'
import PostComment from '../../comments/PostComment/PostComment';
import recipeService from '../../../services/recipe-service';
import commentService from '../../../services/comment-service';
import { Link, Route } from 'react-router-dom';
import EditRecipe from '../EditRecipe/EditRecipe'

class RecipeDetails extends React.Component {
    constructor (props) {
        super(props)
            this.state = {
                recipe: {},
                comments: [],
                hideRecipeElements: Boolean,
            }  
    }

    componentDidMount() {
        const recipeId = this.props.match.params.id;
        recipeService.getRecipe(recipeId).then(recipe => {
            this.setState({
                recipe: recipe,
                comments: recipe.comments,
                hideRecipeElements: false,
            });
        });
    }

    

    render() {
        const recipe = this.state.recipe;
        const comments = this.state.comments;
        const hideRecipeElements = this.state.hideRecipeElements;
        const isLogged = this.props.isLogged;
        return (
            <div className="RecipeDetails">
                <header>
                    <h2>{recipe.title}</h2>
                </header>
                <Recipe recipeId={recipe._id}
                        imageUrl={recipe.imageUrl}
                        products={recipe.products}
                        hideRecipeElements={hideRecipeElements}/>
                { isLogged && <PostComment parentData={this.props}/> }
                <Comments comments={comments}/>
            </div>
    )
   } 
};

export default RecipeDetails;