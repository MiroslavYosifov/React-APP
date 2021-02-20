import React from 'react';
import './Login.css';
import * as yup from 'yup';
import userService from '../../services/user-service';
import Spinner from '../../UI/Spinner/Spinner';

class Login extends React.Component {
  constructor (props) {
    super(props) 
        this.state = {
            username: '',
            password: '',
            inputError: '',
            resError: false,
            isLoading: false,
        }
  }

  usernameChangeHandler = (e) => { this.setState({ username: e.target.value })}
  passwordChangeHandler = (e) => { this.setState({ password: e.target.value })}

  handleSubmit = (e) => {
    e.preventDefault();
    const data = this.state;
    schema.validate({...data})
    .then(() => {
        this.setState({ isLoading: true });
        userService.login(data)
        .then(user => {
          this.setState({ isLoading: false });
          const parsedUserData = JSON.parse(user);
          document.cookie = parsedUserData.token;
          localStorage.setItem('username', parsedUserData.username);

          this.props.onLoginSubmit();
          this.props.history.push('/');
        })
        .catch((err) => {
          this.setState({resError: true, isLoading: false });
        });
    })
    .catch((err) => {
        console.log(err);
          this.setState({inputError: err});
    });
  }

  render() {
    const  { username, password, inputError, resError, isLoading } = this.state;
    const usernameError = inputError.path === 'username';
    const passwordError = inputError.path === 'password';
   
    return (
      <section className="Login-wrapper">
        {isLoading && <Spinner/>}
        <header>
          <h2>Login</h2>
        </header>
        <form className="Login" onSubmit={this.handleSubmit}>
          <p>
              <label htmlFor="username">Username</label>
              <input type="text" onChange={this.usernameChangeHandler} value={username} id="username"/>
              {usernameError && <span>{inputError.message}</span>}
          </p>
          <p>
              <label htmlFor="password">Password</label>
              <input type="password" onChange={this.passwordChangeHandler} value={password} id="username"/>
              {passwordError && <span>{inputError.message}</span>}
          </p>
          <p>
            <button className="PostButton" type="Submit">Login</button>
          </p>
        </form>
        {resError && <span className="Error">Invalid username or password</span>}
      </section>
    )
  }
}

const schema = yup.object({
    username: yup.string('Username should be string!').required('Username is required!').min(4, 'Username should be more than 4 characters!'),
    password: yup.string('Password should be string!').required('Password is required!').min(6, 'Password should be more than 4 characters!'),
});

export default Login;