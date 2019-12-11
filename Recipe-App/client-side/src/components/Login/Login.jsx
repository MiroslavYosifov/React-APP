import React from 'react';
import './Login.css';
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
      <section className="Login-wrapper">
        <header>
          <h2>Login</h2>
        </header>
        <form className="Login" onSubmit={this.handleSubmit}>
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
          <p>
            <button className="PostButton" type="Submit">Login</button>
          </p>
        </form>
      </section>
    )
  }
}

export default Login;