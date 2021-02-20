import React from 'react';
import './SideNav.css';
import { Link } from 'react-router-dom';
import recipeService from '../../services/recipe-service';

class SideNav extends React.Component {
  constructor (props) {
    super(props) 
        this.state = {
            showHideSearch: false
        }
  }

  handleSearchCmp = (e) => {
    e.preventDefault();
    this.props.showHideSearch();
  }

  render() {
    const {isSearchHidden} = this.props;
    return (
      <section className="SideNav">
        <ul>
          <li onClick={this.handleSearchCmp}>
            { !isSearchHidden ? <i className="fas fa-search"></i> : <i className="fas fa-times"></i>}
          </li>
        </ul>
      </section>
    )
  }
}

export default SideNav;
