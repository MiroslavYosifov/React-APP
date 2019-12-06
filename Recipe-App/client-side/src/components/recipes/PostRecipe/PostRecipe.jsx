import React from 'react';
import './PostRecipe.css';
import recipeService from '../../../services/recipe-service';
import * as yup from 'yup'; // for everything

class PostRecipe extends React.Component {
    constructor (props) {
        super(props) 
            this.state = {
                title: '',
                products: '',
                imageUrl: '',
                inputError: ''
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
        schema.validate({ title: this.state.title, products: this.state.products, imageUrl: this.state.imageUrl})
        .then(() => {
            const data = this.state;
            recipeService.addRecipe(data).then(() => {
                this.props.history.push('/recipe');
            });
        }).catch((err) => {
            this.setState({inputError: err});
        });
    }

    render() {
        const  { title, product, imageUrl, inputError } = this.state;
        const titleError = inputError.path === 'title';
        const productsError = inputError.path === 'products';
        const imageUrlError = inputError.path === 'imageUrl';

        return (
            <section className="PostRecipeWrapper">
                <header>
                    <h2>Post Recipe</h2>
                </header>
                <form className="PostRecipe" onSubmit={this.handleSubmit}>
                    <p>
                        <label htmlFor="title">Title</label>
                        <input type="text" onChange={this.changeTitle} value={title} id="title"/>
                        {titleError && <span>{inputError.message}</span>}
                    </p>
                    <p>
                        <label htmlFor="products">Products</label>
                        <input type="text" onChange={this.changeProduct} value={product} id="products"/>
                        {productsError && <span>{inputError.message}</span>}
                    </p>
                    <p>
                        <label htmlFor="imageUrl">Image URL</label>
                        <input type="text" onChange={this.changeImageUrl} value={imageUrl} id="imageUrl"/>
                        {imageUrlError && <span>{inputError.message}</span>}
                    </p>
                    <button className="PostButton" type="submit">Add Recipe</button>
                </form>
            </section>
        )
    }
};

const schema = yup.object({
    title: yup.string('Title should be string!').required('Title is required!').min(4, 'Title should be more than 4 characters!'),
    products: yup.string('Products should be string!').required('Product is required!'),
    imageUrl: yup.string('Image URL should be string!').required('Image URL is required!'),
});

export default PostRecipe;