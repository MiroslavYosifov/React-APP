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
        const recipeId = this.props.parentData.match.params.id;
        const data = this.state;  
        commentService.addComment(data,recipeId).then(() => {
        this.props.parentData.history.push(this.props.parentData.location.pathname);          
    });
  }

    render() {
        const  { title, content } = this.state;

        return (
              <div className="RecipePostComment">
                <header>
                    <h2>Post comment</h2>
                </header>
                <form className="RecipePostCommentForm" onSubmit={this.handleSubmit}>
                    <p>
                        <label htmlFor="title">Title</label>
                        <input type="text" onChange={this.changeTitle} value={title} id="title"/>
                    </p>
                    <p>
                        <label htmlFor="products">Comment</label>
                        <textarea type="text" onChange={this.changeContent} value={content} id="products" id="" cols="30" rows="4"/>
                    </p>
                    <p>
                        <button className="PostButton" type="submit">Post comment</button>
                    </p>
                </form>
              </div> 
        )
    }
};

export default PostComment;