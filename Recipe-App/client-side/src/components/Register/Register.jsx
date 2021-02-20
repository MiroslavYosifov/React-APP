
import React from 'react';
import './Register.css';
import * as yup from 'yup';
import userService from '../../services/user-service';
import Spinner from '../../UI/Spinner/Spinner';

class Register extends React.Component {
  constructor (props) {
    super(props) 
        this.state = {
            username: '',
            password: '',
            rePassword: '',
            inputError: '',
            isLoading: false,
        }
  }

  usernameChangeHandler = (e) => { this.setState({ username: e.target.value })}
  passwordChangeHandler = (e) => { this.setState({ password: e.target.value })}
  rePasswordChangeHandler = (e) => { this.setState({ rePassword: e.target.value })}

  handleSubmit = (e) => {
    e.preventDefault();
    const data = this.state;
    
    schema.validate({...data}).then(() => {
        this.setState({isLoading: true});
        userService.register(data).then((res) => {
          console.log('Register', res);
          this.setState({isLoading: false});
          this.props.history.push('/login');
          
        }).catch(err=> {
          console.log(err);
        });
      }).catch((err) => {
          this.setState({inputError: err});
      });  
  }

  render() {
    const  { username, password, rePassword, inputError, isLoading } = this.state;
    const usernameError = inputError.path === 'username';
    const passwordError = inputError.path === 'password';
    const rePasswordError = inputError.path === 'rePassword';

    return (
      <section className="Register-wrapper">
        {isLoading && <Spinner/>}
        <header>
          <h2>Register</h2>
        </header>
        <form className="Register" onSubmit={this.handleSubmit}>
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
             <label>Re-Password</label>
             <input type="password" onChange={this.rePasswordChangeHandler} value={rePassword}/>
             {rePasswordError && <span>{inputError.message}</span>}
         </p>
         <p>
           <button className="PostButton" type="Submit">Register</button>
         </p>
        </form>
      </section>
    )
  }
}

const schema = yup.object({
    username: yup.string('Username should be string!').required('Username is required!').min(4, 'Username should be more than 4 characters!'),
    password: yup.string('Password should be string!').required('Password is required!').min(6, 'Password should be more than 4 characters!'),
    rePassword: yup.string('Repeat Password should be string!').required('Repeat Password is required!').min(6, 'Password should be more than 4 characters!'),
});

export default Register;