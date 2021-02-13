import React from 'react';
import './EditRecipe.css';

import * as yup from 'yup'; // for everything
import imageCompression from '../../../hocs/imageCompression';
import convertImageToBase64 from '../../../hocs/convertImageToBase64';

import recipeService from '../../../services/recipe-service';


class EditRecipe extends React.Component {
    constructor (props) {
        super(props) 
            this.state = {
                title: '',
                category: '',
                ingredients: '',
                preparation: '',
                inputError: '',
                fileInputState: '',
                compressedImage: '',
                currentImageId: '',
                uploadedFileName: 'uploded file',
            }
    }

    componentDidMount() {
      const recipeId = this.props.match.params.id;
      recipeService.getRecipe(recipeId).then(recipe => {
          const imagePublicId = `recipe-prod/${recipe.imageUrl.split('/recipe-prod/').reverse()[0].split('.')[0]}`
          this.setState({
              title: recipe.title,
              currentImageId: imagePublicId,
              ingredients: recipe.ingredients,
              preparation: recipe.preparation,
          });
      }).catch(err => {console.log(err)});
    }

    changeTitle = (e) => { this.setState({ title: e.target.value })}
    changeIngredients = (e) => { this.setState({ ingredients: e.target.value })}
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
                this.setState({ compressedImage: convertedImage, uploadedFileName: imageFile.name })
            });
        }       
    };
    
    handleSubmit = (e) => {
        e.preventDefault();
        const recipeId = this.props.match.params.id;
        const data = this.state;
        schema.validate({...data}).then(() => {
            recipeService.editMyRecipe(data, recipeId).then((res) => {
                this.props.history.replace(`/reload`);
                this.props.history.replace(this.props.location.pathname);
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
                    {/* <p>
                        <label htmlFor="imageUrl">Image URL</label>
                        <input type="text" onChange={this.changeImageUrl} value={imageUrl} id="imageUrl"/>
                        {imageUrlError && <span>{inputError.message}</span>}
                    </p> */}
                    <p className="file-wrapper">
                        <input type="file" onChange={this.changeUploudImage} value={fileInputState} id="fileInputState"/>
                        <label htmlFor="fileInputState">{uploadedFileName}</label>
                    </p>
                    <p>
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
    category: yup.string('Category should be string!').required('Category is required!'),
    ingredients: yup.string('Ingredients should be string!').required('Ingredients is required!').min(10, 'Ingredients should be more than 10 characters!').max(1000, 'Ingredients should be smaller than 1000 characters!'),
    preparation: yup.string('Preparation should be string!').required('Preparation is required!').min(10, 'Preparation should be more than 10 characters!').max(1000, 'Preparation should be smaller than 1000 characters!'),
});

export default EditRecipe;