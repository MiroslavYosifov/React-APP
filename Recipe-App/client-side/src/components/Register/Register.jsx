
import React from 'react';
import './Register.css';
import * as yup from 'yup';
import withForm from '../../shared/hocs/withForm';
import userService from '../../services/user-service';


class Register extends React.Component {
  constructor (props) {
    super(props) 
        this.state = {
            username: '',
            password: '',
            rePassword: ''
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

  rePasswordChangeHandler = (e) => {
    this.setState({ rePassword: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = this.state;
    console.log(data);
    
    userService.register(data).then(() => {
      this.props.history.push('/login');
    });
  }

  render() {
    const  { username, password, rePassword } = this.state;
    return (
      <section className="Register-wrapper">
        <header>
          <h2>Register</h2>
        </header>
        <form className="Register" onSubmit={this.handleSubmit}>
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
             <label>Re-Password</label>
             <input type="password" onChange={this.rePasswordChangeHandler} value={rePassword}/>
             {/* {productsError && <span>{inputError.message}</span>} */}
         </p>
         <p>
           <button className="PostButton" type="Submit">Register</button>
         </p>
        </form>
      </section>
    )
  }
}

export default Register;