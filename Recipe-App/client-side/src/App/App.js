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

class App extends React.Component {
  constructor (props) {
    super(props) 
    this.state = { 
      isLogged: false,
      currentUser: localStorage.getItem('username'),
    }; 
  }

  onLoginSubmit = () => {
    if(document.cookie) {
      this.setState({ isLogged: true })
    }
  }

  onLogoutSubmit = () => {
    if(!document.cookie) {
      this.setState({ isLogged: false })
    }
  }

  componentDidMount () {
    if(document.cookie) {
      this.setState({ isLogged: true })
    } else {
      localStorage.removeItem('username');
      this.setState({ isLogged: false });
    }
  }

  componentDidUpdate = () => {
    //console.log('Updtavam se1', 'this.state.currentUser =>', this.state.currentUser, 'localStorage.getItem =>', localStorage.getItem('username'));
    if(this.state.currentUser !== localStorage.getItem('username')) {
      this.setState({ currentUser: localStorage.getItem('username') });
    }
    
  }

  render () {
    const { isLogged, currentUser } = this.state;
    return (
      <BrowserRouter>
        <div className="App">
          <Navigation isLogged={isLogged} username={currentUser} />
          <div className="Container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/recipe/details/:id"  render={(props) => (<RecipeDetails {...props} isLogged={isLogged}/>)} />
              <Route path="/recipes" render={(props) => (<Recipes {...props} isLogged={isLogged}/>)} />
              <Route path="/myRecipes" render={(props) => (<MyRecipes {...props} isLogged={isLogged}/>)} />
              <Route path="/contacts" component={Contacts} /> 
              { isLogged && <Route exact path="/myProfile" render={(props) => (<MyProfile {...props} isLogged={isLogged}/>)} />}
              { isLogged && <Route exact path="/userProfile/:id" render={(props) => (<UserProfile {...props} isLogged={isLogged}/>)} />}
              { !isLogged && <Route path="/login" render={(props) => (<Login  onLoginSubmit={this.onLoginSubmit} {...props} isLogged={isLogged}/>) } />} 
              { !isLogged && <Route path="/register" render={(props) => (<Register {...props} isLogged={isLogged}/>)}/>}
              { isLogged && <Route path="/logout" render={(props) => (<Logout onLogoutSubmit={this.onLogoutSubmit} {...props} isLogged={isLogged}/>)} />}
            </Switch>
          </div>
          <Footer /> 
        </div>
      </BrowserRouter >
    );
  }
}

export default App;



  // constructor(props) {
  //   super(props);
  //   const cookies = parseCookies();
  //   const isLogged = document.cookie ? true : false;
  //   this.state = { 
  //     isLogged,
  //     currentUser: ''
  //   };  
  // }
  
  // logout = (history) => {
  //   userService.logout().then(() => {
  //     this.setState({ 
  //       isLogged: false,
  //       currentUser: ''
  //     });
  //     history.push('/');
  //     return null;
  //   });
  // }

  // login = (history, data) => {
  //   console.log(data);    
  //   userService.login(data).then((data) => {
  //     if(data === 'notlogged') return;
  //     this.setState({ 
  //       isLogged: true,
  //       currentUser: data
  //     });
  //     history.push('/');
  //   });
  // }
