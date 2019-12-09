import React from 'react';
import './RecipeDetails.css';
import Recipe from '../Recipe/Recipe'
import Comments from '../../comments/Comments/Comments'
import PostComment from '../../comments/PostComment/PostComment';
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
        const hideRecipeElements = this.state.hideRecipeElements;
        const comments = this.state.comments
        const isLogged = this.props.isLogged;
        return (
            <div className="RecipeDetails">
                {/* <header>
                    <h2>{recipe.title}</h2>
                </header> */}
                <div className="MainContentRecipeDetails">
                    <Recipe recipeId={recipe._id}
                            title={recipe.title}
                            imageUrl={recipe.imageUrl}
                            ingredients={recipe.ingredients}
                            preparation={recipe.preparation}
                            isCreator={recipe.isCreator}
                            hideRecipeElements={hideRecipeElements}
                            {...this.props}/>
                    <section className="ContentComments">
                        { isLogged && <PostComment  {...this.props}/> }
                        <Comments comments={comments}/>
                    </section>
                </div>
            </div>
    )
   } 
};

export default RecipeDetails;