import React from 'react';
import './PostRecipe.css';
import recipeService from '../../../services/recipe-service';

class PostRecipe extends React.Component {
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
        recipeService.addRecipe(data).then(() => {
            this.props.history.push('/recipe');
        });
    }

    render() {
        const  { title, product, imageUrl } = this.state;

        return (
            <section className="PostRecipeWrapper">
                <header>
                    <h2>Post Recipe</h2>
                </header>
                <form className="PostRecipe" onSubmit={this.handleSubmit}>
                    <p>
                        <label htmlFor="title">Title</label>
                        <input type="text" onChange={this.changeTitle} value={title} id="title"/>
                    </p>
                    <p>
                        <label htmlFor="products">Products</label>
                        <input type="text" onChange={this.changeProduct} value={product} id="products"/>
                    </p>
                    <p>
                        <label htmlFor="imageUrl">Image URL</label>
                        <input type="text" onChange={this.changeImageUrl} value={imageUrl} id="imageUrl"/>
                    </p>
                    <button type="submit">Add Recipe</button>
                </form>
            </section>
        )
    }
};

export default PostRecipe;