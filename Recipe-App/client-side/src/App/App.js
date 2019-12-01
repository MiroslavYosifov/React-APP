import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Main from './Main/Main';
import Navigation from './Navigation/Navigation';
import Footer from './Footer/Footer';
import Recipes from '../recipes/Recipes/Recipes';
import RecipeDetails from '../recipes/RecipeDetails/RecipeDetails';
import Home from '../Home/Home';
import Contacts from '../Contacts/Contacts';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Logout from '../Logout/Logout';
import userService from '../services/user-service';

function render(title, Cmp, otherProps) {
  return function (props) {
    return <Main title={title} ><Cmp {...props} {...otherProps} /></Main>
  };
}

function parseCookeis() {
  return document.cookie.split('; ').reduce((acc, cookie) => {
    const [cookieName, cookieValue] = cookie.split('=');
    acc[cookieName] = cookieValue;
    return acc;
  }, {})
}

class App extends React.Component {
  constructor(props) {
    super(props);
    const cookies = parseCookeis();
    const isLogged = !!cookies['x-auth-token'];
    this.state = { isLogged };
  }

  logout = (history) => {
    //console.log(history);
    userService.logout().then(() => {
      this.setState({ isLogged: false });
      history.push('/');
      return null;
    });
  }

  login = (history, data) => {
    userService.login(data).then(() => {
      this.setState({ isLogged: true });
      history.push('/');
    });
  }

  render () {
    const { isLogged } = this.state;

    return (
      <BrowserRouter>
        <div className="App">
          <Navigation isLogged ={isLogged} />
          <div className="Container">
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/recipe/details/:id" component={RecipeDetails} />
              <Route path="/recipe" render={render('Recipes', Recipes, { isLogged })} />
              <Route path="/contacts" component={Contacts} />
              <Route path="/login" render={render('Login', Login, { isLogged, login: this.login })} />
              <Route path="/register" render={render('Register', Register, { isLogged })} />
              <Route path="/logout" render={render('Logout', Logout, { isLogged, logout: this.logout })} />
            </Switch>
            
          </div>
          <Footer />
        </div>
      </BrowserRouter >
    );
  }
}
export default App;
