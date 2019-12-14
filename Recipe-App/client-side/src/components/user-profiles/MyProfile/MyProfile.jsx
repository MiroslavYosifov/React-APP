import React from 'react';
import './MyProfile.css';
import { Link } from 'react-router-dom';
import userService from '../../../services/user-service';
import PostImageProfile from './PostImageProfile/PostImageProfile'

class MyProfile extends React.Component {
    constructor (props) {
        super(props) 
            this.state = {
                userData: '',
                recipes: [],
                likedRecipes: [],
            }
    }

    componentDidMount () {
        userService.getmyProfile().then(user => {
            this.setState({
                userData: user,
                likedRecipes: user.likedRecipes,
                recipes: user.recipes
            });
        });
    }

    render() {
        const { userData, recipes, likedRecipes } = this.state
        const { isLogged } = this.props;    
        return (
          <section className="User-profile">
            <section className="User-profile">
                <section className="User-profile-media">
                    <img src={userData.profileImage} />
                </section>
                <header>
                    <h2>username: {userData.username}</h2>
                </header>
                {isLogged && userData.isCurrentLoggedUser && <PostImageProfile {...this.props} />}
            </section>
            <section className="User-profile-content">
                <p>Posted Recipes: {recipes.length}</p>
                <p>Favorite Recipes: {likedRecipes.length}</p>
            </section>
          </section>
        )
    }
}

export default MyProfile;
