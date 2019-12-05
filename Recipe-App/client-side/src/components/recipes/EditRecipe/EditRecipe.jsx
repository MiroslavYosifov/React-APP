import React from 'react';
import './EditRecipe.css';
import recipeService from '../../../services/recipe-service';
import { Redirect } from 'react-router-dom';

class EditRecipe extends React.Component {
    constructor (props) {
        super(props) 
            this.state = {
                title: '',
                products: '',
                imageUrl: '',
            }
    }

    changeTitle = (e) => {
        this.setState({
            title: e.target.value
        });
    }

    changeProduct = (e) => {
        this.setState({
            products: e.target.value
        });
    }

    changeImageUrl = (e) => {
        this.setState({
            imageUrl: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = this.state;
        const recipeId = this.props.match.params.id;
        recipeService.editMyRecipe(data,recipeId).then(() => {
            let url = '/recipe/details/' + recipeId;
            return <Redirect to={url} />
        });
    }

    componentDidMount() {
        const recipeId = this.props.match.params.id;
        recipeService.getRecipe(recipeId).then(recipe => {
            console.log('I AM 1',recipe);
            this.setState({
                title: recipe.title,
                products: recipe.products,
                imageUrl: recipe.imageUrl,
            });
        });
    }

    render() {
        const  { title, products, imageUrl } = this.state;
                
        return (
            <section className="EditRecipeWrapper">
                <header>
                    <h2>Edit Recipe</h2>
                </header>
                <form className="EditRecipe" onSubmit={this.handleSubmit}>
                    <p>
                        <label htmlFor="title">Title</label>
                        <input type="text" onChange={this.changeTitle} value={title} id="title"/>
                    </p>
                    <p>
                        <label htmlFor="products">Products</label>
                        <input type="text" onChange={this.changeProduct} value={products} id="products"/>
                    </p>
                    <p>
                        <label htmlFor="imageUrl">Image URL</label>
                        <input type="text" onChange={this.changeImageUrl} value={imageUrl} id="imageUrl"/>
                    </p>
                    <p>
                        <button className="EditButton" type="submit">Edit Recipe</button>
                    </p>
                  
                </form>
            </section>
        )
    }
};

export default EditRecipe;