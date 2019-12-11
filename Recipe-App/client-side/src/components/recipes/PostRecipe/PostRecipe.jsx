import React from 'react';
import './PostRecipe.css';
import recipeService from '../../../services/recipe-service';
import * as yup from 'yup';

class PostRecipe extends React.Component {
    constructor (props) {
        super(props) 
            this.state = {
                title: '',
                imageUrl: '',
                ingredients: '',
                preparation: '',
                category: '',
                inputError: '',
            }
    }

    changeTitle = (e) => { this.setState({ title: e.target.value })}
    changeImageUrl = (e) => { this.setState({ imageUrl: e.target.value })}
    changeIngredients = (e) => {this.setState({ ingredients: e.target.value })}
    changepPreparation = (e) => { this.setState({ preparation: e.target.value })}
    changeCategory = (e) => { this.setState({ category: e.target.value })}

    handleSubmit = (e) => {
        e.preventDefault();
        const data = this.state;
        schema.validate({...data}).then(() => {
            console.log(data);
            
            recipeService.addRecipe(data).then((res) => {
                this.props.history.replace(`/reload`);
                this.props.history.replace('/myRecipes');
            });
        }).catch((err) => {
            this.setState({inputError: err});
        });
    }

    render() {
        const  { title, imageUrl, category, ingredients, preparation, inputError } = this.state;
        const titleError = inputError.path === 'title';
        const imageUrlError = inputError.path === 'imageUrl';
        const categoryError = inputError.path === 'category';
        const ingredientsError = inputError.path === 'ingredients';
        const preparationError = inputError.path === 'preparation';

        return (
            <section className="PostRecipeWrapper">
                <form className="PostRecipe" onSubmit={this.handleSubmit}>
                    <header>
                        <h2>Add Recipe</h2>
                    </header>
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
                        <label htmlFor="category">Category</label>
                        <select onChange={this.changeCategory} name="category" id="category">
                            <option value="default">Select category...</option>
                            <option value="salad">Salad</option>
                            <option value="meat">Meat</option>
                            <option value="soup">Soup</option>
                            <option value="fish">Fish</option>
                            <option value="pasta">Pasta</option>
                            <option value="dessert">Dessert</option>
                        </select>
                        {categoryError && <span>{inputError.message}</span>}
                    </p>
                    <p>
                        <label htmlFor="ingredients">Ingredients</label>
                        <textarea type="text" onChange={this.changeIngredients} value={ingredients} id="ingredients" id="" rows="4"/>
                        {ingredientsError && <span>{inputError.message}</span>}
                    </p>
                    <p>
                        <label htmlFor="preparation">Preparation</label>
                        <textarea type="text" onChange={this.changepPreparation} value={preparation} id="preparation" id="" rows="4"/>
                        {preparationError && <span>{inputError.message}</span>}
                    </p>
                    <button className="PostButton" type="submit">Add Recipe</button>
                </form>
            </section>
        )
    }
};

const schema = yup.object({
        title: yup.string('Title should be string!').required('Title is required!').min(3, 'Title should be more than 4 characters!'),
        imageUrl: yup.string('Image URL should be string!').required('Image URL is required!'),
        category: yup.string('Category should be string!').required('Category is required!'),
        ingredients: yup.string('Ingredients should be string!').required('Ingredients is required!').min(10, 'Ingredients should be more than 10 characters!').max(300, 'Ingredients should be smaller than 100 characters!'),
        preparation: yup.string('Preparation should be string!').required('Preparation is required!').min(10, 'Preparation should be more than 10 characters!').max(300, 'Preparation should be smaller than 100 characters!'),
    });

export default PostRecipe;