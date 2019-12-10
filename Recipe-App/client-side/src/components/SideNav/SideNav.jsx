import React from 'react';
import './SideNav.css';
import { Link } from 'react-router-dom';
import recipeService from '../../services/recipe-service';

class SideNav extends React.Component {
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
      <section className="SideNav">
        <ul>
          
        </ul>
      </section>
    )
  }
}

export default SideNav;
