import React from 'react';
import './UserProfile.css';
import { Link } from 'react-router-dom';
import userService from '../../services/user-service';

class UserProfile extends React.Component {
    constructor (props) {
        super(props) 
            this.state = {
                userData: '',
                recipes: [],
                likedRecipes: [],
                profileImage: ''
            }
    }

    componentDidMount () {
       userService.getUserProfile().then(user => {
           this.setState({
                userData: user,
                likedRecipes: user.likedRecipes,
                recipes: user.recipes
           });
       });
    }

    profileImageChangeHandler = (e) => { this.setState({profileImage: e.target.value })}

    changeProfileImageChangeHandler = (e) => {
        e.preventDefault();
        const data = this.state;
        userService.changeUserProfileImage(data).then(user => {
            this.props.history.replace(`/reload`);
            this.props.history.replace(this.props.location.pathname);
        });
    }


    render() {
        const { userData, recipes, likedRecipes, profileImage } = this.state        
        return (
          <section className="User-profile">
            <section className="User-profile">
                <section className="User-profile-media">
                    <img src={userData.profileImage} />
                </section>
                <header>
                    <h2>username: {userData.username}</h2>
                </header>
                <section className="User-profile-form">
                    <form onSubmit={this.changeProfileImageChangeHandler} >
                        <p>
                            <label htmlFor="profileImage">Profile Image</label>
                            <input onChange={this.profileImageChangeHandler} value={profileImage} type="text" id="profileImage"/>
                        </p>
                        <p>
                            <button className="PostButton">Change Profile Image</button>
                        </p>
                    </form>
                </section>
            </section>
            <section className="User-profile-content">
                <p>Posted Recipes: {recipes.length}</p>
                <p>Favorite Recipes: {likedRecipes.length}</p>
            </section>
          </section>
        )
    }
}

export default UserProfile;
