import React from 'react';
import './PostRecipe.css';

import imageCompression from '../../../hocs/imageCompression';
import convertImageToBase64 from '../../../hocs/convertImageToBase64';
import * as yup from 'yup';

import recipeService from '../../../services/recipe-service';


class PostRecipe extends React.Component {
    constructor (props) {
        super(props) 
            this.state = {
                title: '',
                ingredients: '',
                preparation: '',
                category: '',
                inputError: '',
                fileInputState: '',
                compressedImage: '',
                uploadedFileName: 'uploded file',
            }
    }

    changeTitle = (e) => { this.setState({ title: e.target.value })}
    changeIngredients = (e) => {this.setState({ ingredients: e.target.value })}
    changepPreparation = (e) => { this.setState({ preparation: e.target.value })}
    changeCategory = (e) => { this.setState({ category: e.target.value })}

    changeUploudImage = (e) => {
        var imageFile = e.target.files[0];
        if(imageFile.size / 1024 / 1024 > 9) {
            imageCompression(imageFile)
            .then(compressedFile=> {
                convertImageToBase64(compressedFile).then(convertedImage => {
                    this.setState({ compressedImage: convertedImage, uploadedFileName: imageFile.name })
                });
            })
            .catch(err => {
                console.log(err);
            })
        } else {
            convertImageToBase64(imageFile).then(convertedImage => {
                this.setState({ compressedImage: convertedImage,  uploadedFileName: imageFile.name })
            });
        }       
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if(!this.state.compressedImage) return;

        const data = this.state;
        const reader = new FileReader();

        reader.onerror = () => {
            console.error('Something is wrong!');
        };   

        schema.validate({...data}).then(() => {
            recipeService.addRecipe(data).then((res) => {
                this.props.history.replace(`/reload`);
                this.props.history.replace('/myRecipes');
            });
        }).catch((err) => {
            this.setState({inputError: err});
        });
       
    }


    render() {
        const  { title, ingredients, preparation, inputError, fileInputState, compressedImage, uploadedFileName } = this.state;
        const titleError = inputError.path === 'title';
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
                    <p className="file-wrapper">
                        <input type="file" onChange={this.changeUploudImage} value={fileInputState} id="fileInputState"/>
                        <label htmlFor="fileInputState">{uploadedFileName}</label>
                    </p>
                    <p className="file-input">
                        {compressedImage ? <img src={compressedImage} alt="chosen" style={{width: '100%'}}/> : ''}
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
        category: yup.string('Category should be string!').required('Category is required!'),
        ingredients: yup.string('Ingredients should be string!').required('Ingredients is required!').min(10, 'Ingredients should be more than 10 characters!').max(1000, 'Ingredients should be smaller than 1000 characters!'),
        preparation: yup.string('Preparation should be string!').required('Preparation is required!').min(10, 'Preparation should be more than 10 characters!').max(1000, 'Preparation should be smaller than 1000 characters!'),
    });

export default PostRecipe;