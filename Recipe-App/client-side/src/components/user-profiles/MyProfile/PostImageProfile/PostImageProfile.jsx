import React from 'react';
import './PostImageProfile.css';
import { Link } from 'react-router-dom';
import userService from '../../../../services/user-service';

class PostImageProfile extends React.Component {
    constructor (props) {
        super(props) 
            this.state = {
                profileImage: ''
            }
    }

    profileImageChangeHandler = (e) => { this.setState({ profileImage: e.target.value })}

    changeProfileImageChangeHandler = (e) => {
        e.preventDefault();
        const data = this.state;
        userService.changeUserProfileImage(data).then(user => {
            this.props.history.replace(`/reload`);
            this.props.history.replace(this.props.location.pathname);
        });
    }

    render() {
        const { profileImage } = this.state        
        return (
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
        )
    }
}

export default PostImageProfile;
