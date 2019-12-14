import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import Footer from './Footer/Footer';
import Recipes from '../components/recipes/Recipes/Recipes';
import MyRecipes from '../components/recipes/MyRecipes/MyRecipes';
import RecipeDetails from '../components/recipes/RecipeDetails/RecipeDetails';
import Home from '../components/Home/Home';
import UserProfile from '../components/user-profiles/UserProfile/UserProfile';
import MyProfile from '../components/user-profiles/MyProfile/MyProfile';
import About from '../components/About/About';
import Contacts from '../components/Contacts/Contacts';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Logout from '../components/Logout/Logout';
import userService from '../services/user-service';

function parseCookies() {
  return document.cookie.split('; ').reduce((acc, cookie) => {
    const [cookieName, cookieValue] = cookie.split('=');
    acc[cookieName] = cookieValue;
    return acc;
  }, {})
}

class App extends React.Component {
  constructor(props) {
    super(props);
    const cookies = parseCookies();
    const isLogged = document.cookie ? true : false;
    let currentUser: ''
    this.state = { 
      isLogged,
      currentUser: ''
    };  
  }
  
  logout = (history) => {
    userService.logout().then(() => {
      this.setState({ 
        isLogged: false,
        currentUser: ''
      });
      history.push('/');
      return null;
    });
  }

  login = (history, data) => {        
    userService.login(data).then((data) => {
      if(data === 'notlogged') return;
      this.setState({ 
        isLogged: true,
        currentUser: data
      });
      history.push('/');
    });
  }

  render () {
    const { isLogged, currentUser } = this.state;
    console.log('IsLogged => ', isLogged);
    console.log('CurrentUser => ', currentUser);
    return (
      <BrowserRouter>
        <div className="App">
          <Navigation props={this.props} isLogged ={isLogged} currentUser={currentUser}/>
          <div className="Container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/recipe/details/:id"  render={(props) => (<RecipeDetails {...props} isLogged={isLogged}/>)} />
              <Route exact path="/recipe" render={(props) => (<Recipes {...props} isLogged={isLogged}/>)} />
              <Route path="/myRecipes" render={(props) => (<MyRecipes {...props} isLogged={isLogged}/>)} />
              <Route path="/contacts" component={Contacts} /> 
              { isLogged && <Route exact path="/myProfile" render={(props) => (<MyProfile {...props} isLogged={isLogged}/>)} />}
              { isLogged && <Route exact path="/userProfile/:id" render={(props) => (<UserProfile {...props} isLogged={isLogged}/>)} />}
              { !isLogged && <Route path="/login" render={(props) => (<Login {...props} isLogged={isLogged} login={this.login}/>)} />} 
              { !isLogged && <Route path="/register" render={(props) => (<Register {...props} isLogged={isLogged}/>)}/>}
              { isLogged && <Route path="/logout" render={(props) => (<Logout {...props} isLogged={isLogged} logout={this.logout}/>)} />}  />}
            </Switch>
          </div>
          <Footer /> 
        </div>
      </BrowserRouter >
    );
  }
}

export default App;
