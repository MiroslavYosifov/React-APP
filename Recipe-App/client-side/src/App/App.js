import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Main from './Main/Main';
import Navigation from './Navigation/Navigation';
import Footer from './Footer/Footer';
import Recipes from '../components/recipes/Recipes/Recipes';
import RecipeDetails from '../components/recipes/RecipeDetails/RecipeDetails';
import Home from '../components/Home/Home';
import About from '../components/About/About';
import Contacts from '../components/Contacts/Contacts';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Logout from '../components/Logout/Logout';
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
    const isLogged = false;
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
    userService.login(data).then((data) => {
      if(data === 'notlogged') return;
      this.setState({ isLogged: true });
      history.push('/');
    });
  }

  render () {
    const { isLogged } = this.state;
    console.log(isLogged);
    return (
      <BrowserRouter>
        <div className="App">
          <Navigation isLogged ={isLogged} />
          <div className="Container">
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/recipe/details/:id" render={render('RecipeDetails', RecipeDetails, { isLogged })} />
              <Route path="/recipe" render={render('Recipes', Recipes, { isLogged })} />
              <Route path="/contacts" component={Contacts} />
              { !isLogged && <Route path="/login" render={render('Login', Login, { isLogged, login: this.login })} />} 
              { !isLogged && <Route path="/register" render={render('Register', Register, { isLogged })} />}
              { isLogged && <Route path="/logout" render={render('Logout', Logout, { isLogged, logout: this.logout })} />}
            </Switch>
          </div>
          <Footer /> 
        </div>
      </BrowserRouter >
    );
  }
}

export default App;
