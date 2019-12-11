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
                category: '',
                ingredients: '',
                preparation: '',
                inputError: ''
            }
    }

    componentDidMount() {
      const recipeId = this.props.match.params.id;
      recipeService.getRecipe(recipeId).then(recipe => {
          this.setState({
              title: recipe.title,
              imageUrl: recipe.imageUrl,
              ingredients: recipe.ingredients,
              preparation: recipe.preparation,
          });
      }).catch(err => {console.log(err)});
    }

    changeTitle = (e) => { this.setState({ title: e.target.value })}
    changeImageUrl = (e) => { this.setState({ imageUrl: e.target.value })}
    changeIngredients = (e) => { this.setState({ ingredients: e.target.value })}
    changepPreparation = (e) => { this.setState({ preparation: e.target.value })}
    changeCategory = (e) => { this.setState({ category: e.target.value })}
    
    handleSubmit = (e) => {
        e.preventDefault();
        const recipeId = this.props.match.params.id;
        const data = this.state;

        schema.validate({...data}).then(() => {
            recipeService.editMyRecipe(data, recipeId).then(() => {
                this.props.history.replace(`/reload`);
                this.props.history.replace(this.props.location.pathname);
            });
        }).catch((err) => {
            this.setState({inputError: err});
        });     
    }

    render() {
        const  { title, imageUrl, ingredients, preparation, inputError} = this.state;
        const titleError = inputError.path === 'title';
        const imageUrlError = inputError.path === 'imageUrl';
        const categoryError = inputError.path === 'category';
        const ingredientsError = inputError.path === 'ingredients';
        const preparationError = inputError.path === 'preparation';

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
                    <p>
                        <button className="EditButton" type="submit">Edit Recipe</button>
                    </p>
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

export default EditRecipe;