import React from 'react';
import './RecipeDetails.css';
import Recipe from '../Recipe/Recipe'
import Comments from '../../comments/Comments/Comments'
import PostComment from '../../comments/PostComment/PostComment';
import EditRecipe from '../EditRecipe/EditRecipe';
import Spinner from '../../../UI/Spinner/Spinner';
import recipeService from '../../../services/recipe-service';

class RecipeDetails extends React.Component {
    constructor (props) {
        super(props)
            this.state = {
                recipe: {},
                comments: [],
                recipeCreator: '',
                hideRecipeElements: Boolean,
                isEditHidden: true,
                isLoading: false
            }  
    }

    componentDidMount() {
        const recipeId = this.props.match.params.id;
        this.setState({ isLoading: true });
        recipeService.getRecipe(recipeId).then(recipe => {
            this.setState({
                recipe: recipe,
                comments: recipe.comments,
                recipeCreator: recipe.creator.username,
                recipeId: recipeId,
                hideRecipeElements: false,
                isLoading: false,
            });
        });
    }

    showHideEdit = (e) => { this.setState({ isEditHidden: this.state.isEditHidden ? false : true })}

    render() {
        const { recipe, recipeId, hideRecipeElements, comments, recipeCreator, isEditHidden, isLoading } = this.state;
        const isLogged = this.props.isLogged;

        return (
            <div className="RecipeDetails">
                {isLoading && <Spinner/>}
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