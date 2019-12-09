import React from 'react';
import withForm from '../../shared/hocs/withForm';
import userService from '../../services/user-service';

class Login extends React.Component {
  constructor (props) {
    super(props) 
        this.state = {
            username: '',
            password: '',
        }
  }

  usernameChangeHandler = (e) => {
    this.setState({
      username: e.target.value
    });
  }

  passwordChangeHandler = (e) => {
    this.setState({ password: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = this.state;  
    this.props.login(this.props.history, data);
  }

  render() {
    const  { username, password } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="Login">
        <p>
            <label htmlFor="username">Username</label>
            <input type="text" onChange={this.usernameChangeHandler} value={username} id="username"/>
            {/* {productsError && <span>{inputError.message}</span>} */}
        </p>
        <p>
            <label htmlFor="password">Password</label>
            <input type="password" onChange={this.passwordChangeHandler} value={password} id="username"/>
            {/* {productsError && <span>{inputError.message}</span>} */}
        </p>
        <div className="form-control">
          <button type="Submit">Login</button>
        </div>
      </form>
    )
  }
}

export default Login;