import React from 'react';
import './RecipeDetails.css';
import Recipe from '../Recipe/Recipe'
import Comments from '../../comments/Comments/Comments'
import PostComment from '../../comments/PostComment/PostComment';
import recipeService from '../../../services/recipe-service';
import commentService from '../../../services/comment-service';


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
        const id = this.props.match.params.id;
        recipeService.getRecipe(id).then(recipe => {
            this.setState({
                recipe: recipe,
                comments: recipe.comments,
                hideRecipeElements: false,
            });
        });
    
    }

//    componentDidUpdate() {
//     commentService.getAllComments().then(comments => {
//         this.setState({
//             comments: comments,
//         });
//     });
//    }

    render() {
        const recipe = this.state.recipe;
        const comments = this.state.comments;
        const hideRecipeElements = this.state.hideRecipeElements;
        const isLogged = this.props.isLogged;
        return (
            <div className="RecipeDetails">
                <header>
                    <h1>{recipe.title}</h1>
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