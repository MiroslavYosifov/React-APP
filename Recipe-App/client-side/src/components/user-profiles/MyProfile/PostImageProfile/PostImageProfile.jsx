import React from 'react';
import './PostImageProfile.css';
import { Link } from 'react-router-dom';
import userService from '../../../../services/user-service';
import * as yup from 'yup';

import imageCompression from '../../../../hocs/imageCompression'
import convertImageToBase64 from '../../../../hocs/convertImageToBase64';

class PostImageProfile extends React.Component {
    constructor (props) {
        super(props) 
            this.state = {
                profileImage: '',
                inputError: '',
                fileInputState: '',
                compressedImage: '',
                uploadedFileName: 'uploded file',
                isLoading: false,
            }
    }

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

    changeProfileImageChangeHandler = (e) => {
        e.preventDefault();
        const data = this.state;
        userService.changeUserProfileImage(data).then(user => {
            console.log(user);
            this.props.history.replace(`/reload`);
            this.props.history.replace(this.props.location.pathname);
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        const { inputError, fileInputState, compressedImage, uploadedFileName } = this.state;   
        return (
           <section className="User-profile-form">
                <form onSubmit={this.changeProfileImageChangeHandler} >
                    {/* <p>
                        <label htmlFor="profileImage">Profile Image</label>
                        <input onChange={this.profileImageChangeHandler} value={profileImage} type="text" id="profileImage"/>
                         {profileImageError && <span>{inputError.message}</span>}
                    </p> */}
                    <p className="file-wrapper">
                        <input type="file" onChange={this.changeUploudImage} value={fileInputState} id="fileInputState"/>
                        <label htmlFor="fileInputState">{uploadedFileName}</label>
                    </p>
                    <p className="file-input">
                        {compressedImage ? <img src={compressedImage} alt="chosen" style={{width: '100%'}}/> : ''}
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
