import React from 'react';
import './RecipesCategoryList.css';
import queryString from 'query-string'
import { Link, Route } from 'react-router-dom';
import Recipe from '../../Recipe/Recipe';
import PostRecipe from '../../PostRecipe/PostRecipe';
import recipeService from '../../../../services/recipe-service';
import RecipeNavigation from '../../RecipeNavigation/RecipeNavigation';
import Search from '../../../Search/Search';
import SideNav from '../../../SideNav/SideNav';

class RecipesCategoryList extends React.Component {
  constructor (props) {
    super(props) 
        this.state = {
          recipes: [],
          hideRecipeElements: Boolean,
          searchCriterion: ''
        }
  }

  componentDidMount () {
    const searchQuery = this.props.location.search;
    const currentSearchCriterion = searchQuery.split('=')[1].toUpperCase();
    const searchParams = queryString.parse(searchQuery);

    if(searchParams.search !== undefined || searchParams.category !== undefined || searchParams.criterion !== undefined) {
      recipeService.searchRecipes(searchQuery).then(recipes => {
        this.setState({
            recipes: recipes,
            hideRecipeElements: true,
            searchCriterion: currentSearchCriterion
        });
      });
    }  
  }

//   handleSearchParams = (data) => { this.setState({ searchParams: data })}
 
  render() {
    const { recipes, isSearchHidden, hideRecipeElements, searchCriterion } = this.state;
    const isLogged = this.props.isLogged;
    return (
      <div className="Recipes-category-list-wrapper">
        <section className="All-recipes-wrapper">
          <header>
            <h2>{searchCriterion}</h2>
          </header>
          <div className="Recipes-container">
          {recipes.map((recipe, index) => 
              <Recipe key={index}
                recipeId={recipe._id}
                imageUrl={recipe.imageUrl}
                title={recipe.title}
                ingredients={recipe.ingredients}
                preparation={recipe.preparation}
                likes={recipe.likes}
                category={recipe.category}
                createdDate={recipe.createdDate}
                isLogged={isLogged}
                hideRecipeElements={hideRecipeElements}
              ></Recipe>)}
          </div>
        </section>
      </div>
    )
  }
}

export default RecipesCategoryList;