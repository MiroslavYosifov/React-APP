import React from 'react';
import './PostComment.css';
import commentService from '../../../services/comment-service';

class PostComment extends React.Component {
    constructor (props) {
        super(props) 
            this.state = {
            title: '',
            content: ''
            }
    }

    changeTitle = (e) => {
        this.setState({
              title: e.target.value
        });
    }

    changeContent = (e) => {
        this.setState({
            content: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(document.cookie['x-auth-token']);
        const data = this.state;  
        commentService.addComment(data).then(() => {
        this.props.parentData.history.push(this.props.parentData.location.pathname);          
    });
  }

    render() {
        const  { title, content } = this.state;

        return (
              <div className="RecipePostComment">
                <header>
                    <h2>Post comment:</h2>
                </header>
                <form className="RecipePostComment" onSubmit={this.handleSubmit}>
                    <p>
                        <label htmlFor="title">Title</label>
                        <input type="text" onChange={this.changeTitle} value={title} id="title"/>
                    </p>
                    <p>
                        <label htmlFor="products">Comment</label>
                        <textarea type="text" onChange={this.changeContent} value={content} id="products" id="" cols="30" rows="10"/>
                    </p>
                    <button type="submit">Add Recipe</button>
                </form>
              </div> 
        )
    }
};

export default PostComment;