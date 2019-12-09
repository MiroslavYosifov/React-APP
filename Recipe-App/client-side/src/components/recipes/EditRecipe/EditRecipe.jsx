import React from 'react';
import './EditRecipe.css';
import recipeService from '../../../services/recipe-service';
import { Redirect } from 'react-router-dom';
import * as yup from 'yup'; // for everything

class EditRecipe extends React.Component {
    constructor (props) {
        super(props) 
            this.state = {
                title: '',
                imageUrl: '',
                ingredients: '',
                preparation: '',
                inputError: ''
            }
    }

    changeTitle = (e) => {
        this.setState({
            title: e.target.value
        });
    }

    changeImageUrl = (e) => {
        this.setState({
            imageUrl: e.target.value
        });
    }

    changeIngredients = (e) => {
        this.setState({
            ingredients: e.target.value
        });
    }

    changepPreparation = (e) => {
        this.setState({
            preparation: e.target.value
        });
    }
    

    handleSubmit = (e) => {
        e.preventDefault();
        const data = this.state;
        const recipeId = this.props.match.params.id;

        schema.validate({ title: this.state.title, imageUrl: this.state.imageUrl})
        .then(() => {
            recipeService.editMyRecipe(data,recipeId).then(() => {
                this.props.history.push('/myRecipes');
            });
        }).catch((err) => {
            this.setState({inputError: err});
        });
        
    }

    componentDidMount() {
        const recipeId = this.props.match.params.id;
        recipeService.getRecipe(recipeId).then(recipe => {
            // console.log('I AM 1', recipe);
            this.setState({
                title: recipe.title,
                imageUrl: recipe.imageUrl,
                ingredients: recipe.ingredients,
                preparation: recipe.preparation,
            });
        });
    }


    render() {
        const  { title, imageUrl, ingredients, preparation, inputError} = this.state;
        const titleError = inputError.path === 'title';
        const imageUrlError = inputError.path === 'imageUrl';
        // console.log('titleError', titleError)
        // console.log('imageUrlError', imageUrlError);
        return (
            <section className="EditRecipeWrapper">
                <header>
                    <h2>Edit Recipe</h2>
                </header>
                <form className="EditRecipe" onSubmit={this.handleSubmit}>
                    <p>
                        <label htmlFor="title">Title</label>
                        <input type="text" onChange={this.changeTitle} value={title} id="title"/>
                        {titleError && <span>{inputError.message}</span>}
                    </p>
                    <p>
                        <label htmlFor="imageUrl">Image URL</label>
                        <input type="text" onChange={this.changeImageUrl} value={imageUrl} id="imageUrl"/>
                        {imageUrlError && <span>{inputError.message}</span>}
                    </p>
                    <p>
                        <label htmlFor="ingredients">Ingredients</label>
                        <textarea type="text" onChange={this.changeIngredients} value={ingredients} id="ingredients" id="" rows="4"/>
                    </p>
                    <p>
                        <label htmlFor="preparation">Preparation</label>
                        <textarea type="text" onChange={this.changepPreparation} value={preparation} id="preparation" id="" rows="4"/>
                    </p>
                    <p>
                        <button className="EditButton" type="submit">Edit Recipe</button>
                    </p>
                  
                </form>
            </section>
        )
    }
};

const schema = yup.object({
    title: yup.string('Title should be string!').required('Title is required!').min(4, 'Title should be more than 4 characters!'),
    imageUrl: yup.string('Image URL should be string!').required('Image URL is required!'),
});

export default EditRecipe;