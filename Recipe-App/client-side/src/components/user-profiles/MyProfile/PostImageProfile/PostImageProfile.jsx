import React from 'react';
import './PostImageProfile.css';
import { Link } from 'react-router-dom';
import userService from '../../../../services/user-service';
import * as yup from 'yup';

class PostImageProfile extends React.Component {
    constructor (props) {
        super(props) 
            this.state = {
                profileImage: '',
                inputError: ''
            }
    }

    profileImageChangeHandler = (e) => { this.setState({ profileImage: e.target.value })}

    changeProfileImageChangeHandler = (e) => {
        e.preventDefault();
        const data = this.state;
        schema.validate({...data}).then(() => {
            userService.changeUserProfileImage(data).then(user => {
                this.props.history.replace(`/reload`);
                this.props.history.replace(this.props.location.pathname);
            });
        }).catch((err) => {
            this.setState({inputError: err});
        });
    }

    render() {
        const { profileImage, inputError } = this.state;   
        const profileImageError = inputError.path === 'profileImage'; 
        return (
           <section className="User-profile-form">
                <form onSubmit={this.changeProfileImageChangeHandler} >
                    <p>
                        <label htmlFor="profileImage">Profile Image</label>
                        <input onChange={this.profileImageChangeHandler} value={profileImage} type="text" id="profileImage"/>
                         {profileImageError && <span>{inputError.message}</span>}
                    </p>
                    <p>
                        <button className="PostButton">Change Profile Image</button>
                    </p>
                </form>
            </section>
        )
    }
}

const schema = yup.object({
        profileImage: yup.string('Image URL should be string!').required('Image URL is required!'),
    });

export default PostImageProfile;
