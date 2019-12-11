import React from 'react';
import './PostRecipe.css';
import recipeService from '../../../services/recipe-service';
import * as yup from 'yup'; // for everything

class PostRecipe extends React.Component {
    constructor (props) {
        super(props) 
            this.state = {
                title: '',
                imageUrl: '',
                ingredients: '',
                preparation: '',
                inputError: '',
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
        schema.validate({ title: this.state.title, imageUrl: this.state.imageUrl})
        .then(() => {
            const data = this.state;
            console.log(data);
            
            recipeService.addRecipe(data).then((res) => {
                this.props.history.replace(`/reload`);
                this.props.history.replace('/myRecipes');
                // setTimeout(() => {
                //     this.props.history.push('/myRecipes');
                // }, 2000)
            });
        }).catch((err) => {
            this.setState({inputError: err});
        });
    }

    render() {
        const  { title, imageUrl, ingredients, inputError, preparation } = this.state;
        const titleError = inputError.path === 'title'
        const imageUrlError = inputError.path === 'imageUrl';

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
                        <label htmlFor="ingredients">Ingredients</label>
                        <textarea type="text" onChange={this.changeIngredients} value={ingredients} id="ingredients" id="" rows="4"/>
                    </p>
                    <p>
                        <label htmlFor="preparation">Preparation</label>
                        <textarea type="text" onChange={this.changepPreparation} value={preparation} id="preparation" id="" rows="4"/>
                    </p>
                    <button className="PostButton" type="submit">Add Recipe</button>
                </form>
            </section>
        )
    }
};

const schema = yup.object({
    title: yup.string('Title should be string!').required('Title is required!').min(4, 'Title should be more than 4 characters!'),
    imageUrl: yup.string('Image URL should be string!').required('Image URL is required!'),
});

export default PostRecipe;