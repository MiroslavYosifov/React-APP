import React from 'react';
import './PostComment.css';
import * as yup from 'yup';
import commentService from '../../../services/comment-service';

import Spinner from '../../../UI/Spinner/Spinner';

class PostComment extends React.Component {
    constructor (props) {
        super(props) 
            this.state = {
            title: '',
            content: '',
            inputError: '',
            isLoading: '',
        }
    }

    changeTitle = (e) => { this.setState({ title: e.target.value })}
    changeContent = (e) => { this.setState({ content: e.target.value })}

    handleSubmit = (e) => {
        e.preventDefault();
        const recipeId = this.props.match.params.id;
        const data = this.state;
        schema.validate({...data}).then(() => {
            this.setState({ isLoading: true });
            commentService.addComment(data,recipeId).then(() => {
            this.setState({ isLoading: false });
            this.props.history.replace(`/reload`);
            this.props.history.replace(this.props.location.pathname);
            });
          }).catch((err) => {
                this.setState({ isLoading: false });
                this.setState({inputError: err});
          });
        
    }

    render() {
        const  { title, content, inputError, isLoading } = this.state;
        const titleError = inputError.path === 'title';
        const contentError = inputError.path === 'content';

        return (
              <div className="RecipePostComment">
                {isLoading && <Spinner/>}
                <header>
                    <h3>Post comment</h3>
                </header>
                <form className="RecipePostCommentForm" onSubmit={this.handleSubmit}>
                    <p>
                        <label htmlFor="title">Title</label>
                        <input type="text" onChange={this.changeTitle} value={title} id="title"/>
                        {titleError && <span>{inputError.message}</span>}
                    </p>
                    <p>
                        <label htmlFor="products">Comment</label>
                        <textarea type="text" onChange={this.changeContent} value={content} id="products" id="" cols="30" rows="4"/>
                        {contentError && <span>{inputError.message}</span>}
                    </p>
                    <p>
                        <button className="PostButton" type="submit">Post comment</button>
                    </p>
                </form>
              </div> 
        )
    }
};

const schema = yup.object({
    title: yup.string('Title should be string!').required('Title is required!').min(4, 'Title should be more than 4 characters!').max(10, 'Title should be smaller than 10 characters!'),
    content: yup.string('Content should be string!').required('Content is required!').min(4, 'Content should be more than 4 characters!').max(50, 'Content should be smaller than 50 characters!'),
});

export default PostComment;