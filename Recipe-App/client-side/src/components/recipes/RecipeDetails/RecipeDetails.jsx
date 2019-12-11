import React from 'react';
import './RecipeDetails.css';
import Recipe from '../Recipe/Recipe'
import Comments from '../../comments/Comments/Comments'
import PostComment from '../../comments/PostComment/PostComment';
import EditRecipe from '../EditRecipe/EditRecipe';
import recipeService from '../../../services/recipe-service';
import commentService from '../../../services/comment-service';
import { Link, Route } from 'react-router-dom';

class RecipeDetails extends React.Component {
    constructor (props) {
        super(props)
            this.state = {
                recipe: {},
                comments: [],
                hideRecipeElements: Boolean,
                isEditHidden: true
            }  
    }

    componentDidMount() {
        const recipeId = this.props.match.params.id;
        recipeService.getRecipe(recipeId).then(recipe => {
            this.setState({
                recipe: recipe,
                comments: recipe.comments,
                recipeId: recipeId,
                hideRecipeElements: false,
            });
        });
    }

    showHideEdit = (e) => { 
        this.setState({ isEditHidden: this.state.isEditHidden ? false : true });
    }


    render() {
        const recipe = this.state.recipe;
        const isEditHidden = this.state.isEditHidden;
        console.log('g4g4',isEditHidden);
        
        const recipeId = this.state.recipeId;
        const hideRecipeElements = this.state.hideRecipeElements;
        const comments = this.state.comments
        const isLogged = this.props.isLogged;
        return (
            <div className="RecipeDetails">
                <div className="MainContentRecipeDetails">
                    <Recipe recipeId={recipe._id}
                            title={recipe.title}
                            imageUrl={recipe.imageUrl}
                            ingredients={recipe.ingredients}
                            preparation={recipe.preparation}
                            createdDate={recipe.createdDate}
                            hideRecipeElements={hideRecipeElements}
                            isCreator={recipe.isCreator}
                            isFavorite={recipe.isFavorite}
                            isEditHidden={isEditHidden}
                            showHideEdit={this.showHideEdit}
                            {...this.props}/>
                    <section className="ContentComments">
                        { !isEditHidden && <EditRecipe {...this.props}  />}
                        { isLogged && <PostComment  {...this.props}/> }
                        <Comments comments={comments}/>
                    </section>
                </div>
            </div>
    )
   } 
};

export default RecipeDetails;