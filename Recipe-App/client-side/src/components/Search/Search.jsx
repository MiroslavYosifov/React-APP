import React from 'react';
import './Search.css';
import { Link } from 'react-router-dom';
import recipeService from '../../services/recipe-service';

class Search extends React.Component {
  constructor (props) {
    super(props) 
        this.state = {
            
        }
  }

//   handleDelete = (e) => {
//     const recipeId = this.props.recipeId;  
//     recipeService.deleteMyRecipe(recipeId).then(() => {
//       this.props.history.push('/myRecipes');
//     });
//   }

  render() {
    return (
      <section className="Search">
        <i class="fas fa-search"></i>
      </section>
    )
  }
}

export default Search;
