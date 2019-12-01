import React from 'react';
import './RecipeDetails.css';
import Recipe from '../Recipe/Recipe'
import RecipeComments from '../RecipeComments/RecipeComments'
import recipeService from '../../services/recipe-service';


class RecipeDetails extends React.Component {
    constructor (props) {
        super(props)
            this.state = {
                recipe: {}
            }  
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        recipeService.getRecipe(id).then(recipe => {
            this.setState(recipe);
        });
    }

    render() {
        const recipe = this.state;
        return (
            <div className="RecipeDetails">
                <header>
                    <h1>RECIPE DETAILS</h1>
                </header>
                <Recipe recipeId={recipe._id}
                        imageUrl={recipe.imageUrl}
                        title={recipe.title}
                        products={recipe.products}/>
                <RecipeComments />
            </div>
    )
   } 
};

export default RecipeDetails;