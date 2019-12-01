import React from 'react';
import './RecipeDetails.css';
import Recipe from '../Recipe/Recipe'
import RecipeComments from '../RecipeComments/RecipeComments'
import RecipePostComment from '../RecipePostComment/RecipePostComment';
import recipeService from '../../services/recipe-service';
import commentService from '../../services/comment-service';


class RecipeDetails extends React.Component {
    constructor (props) {
        super(props)
            this.state = {
                recipe: {},
                comments: [],
                showDetailsButton: Boolean,
            }  
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        recipeService.getRecipe(id).then(recipe => {
            commentService.getAllComments().then(comments => {
                this.setState({
                    recipe: recipe,
                    comments: comments,
                    showDetailsButton: false,
                });
            });
        });
    
    }

   

    render() {
        const recipe = this.state.recipe;
        const comments = this.state.comments;
        const showDetailButton = this.state.showDetailsButton;

        return (
            <div className="RecipeDetails">
                <header>
                    <h1>{recipe.title}</h1>
                </header>
                <Recipe recipeId={recipe._id}
                        imageUrl={recipe.imageUrl}
                        products={recipe.products}
                        showDetailsButton={showDetailButton}/>
                <header>
                    <h2>Post comment:</h2>
                </header>
                <RecipePostComment parentData={this.props}/>
                <RecipeComments comments={comments}/>
            </div>
    )
   } 
};

export default RecipeDetails;