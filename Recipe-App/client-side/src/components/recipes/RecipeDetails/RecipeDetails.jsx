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
                recipeCreator: '',
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
                recipeCreator: recipe.creator.username,
                recipeId: recipeId,
                hideRecipeElements: false,
            });
        });
    }

    showHideEdit = (e) => { this.setState({ isEditHidden: this.state.isEditHidden ? false : true })}

    render() {
        const { recipe, recipeId, hideRecipeElements, comments, recipeCreator, isEditHidden } = this.state;
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
                            category={recipe.category}
                            recipeCreator={recipeCreator}
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