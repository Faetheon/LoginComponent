import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Logout from './Logout.jsx';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      user_email: '',
      message: '',
      isLoggedIn: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:3001/checkForCookie')
      .then(body => body.json())
      .then(parsedBody => {
        this.setState({isLoggedIn: parsedBody.isLoggedIn, message: parsedBody.message})
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  handleChange(e) {
    this.setState({message: ''});
    if (e.target.name === 'username') {
      this.setState({username: e.target.value});
    } else if (e.target.name === 'user_email') {
      this.setState({user_email: e.target.value});
    }
  }
  
  handleLogin(e) {
    e.preventDefault();
    if (e.target.username.value.length > 0 && e.target.password.value.length > 0) {
      this.setState({username: e.target.username.value});
      fetch(`http://localhost:3001/login/${e.target.username.value}/${e.target.password.value}`)
        .then(data => data.json())
        .then(data => {
          this.setState({isLoggedIn: data.isLoggedIn, message: data.message});
        })
        .catch(err => {
          return;
        });
      e.target.username.value = '';
      e.target.password.value = '';
    } else {
      this.setState({message: 'Please input both a username and password.'});
    }
  }
  
  handleLogout() {
    // Logs the user out and clears auth cookie
    fetch(`http://localhost:3001/logout/${this.state.username}`)
      .then(data => data.json())
      .then(data => {
        this.setState({username: undefined, user_email: undefined});
        this.setState({isLoggedIn: data.isLoggedIn, message: data.message});
      })
      .catch(err => {
        if (err) throw err;
      });
  }
  
  handleSignup(e) {
    e.preventDefault();
    // Checks to see if the email is a valid gmail account and that the password and username are longer than 0
    if (e.target.username.value.length > 0 && /\w*\w@gmail.com/.test(e.target.user_email.value) && e.target.password.value.length > 0) {
      fetch(`http://localhost:3001/signup/${e.target.username.value}/${e.target.user_email.value}/${e.target.password.value}`)
      .then(data => data.json())
      .then(data => {
        this.setState({isLoggedIn: data.isLoggedIn, message: data.message});
      }).catch(err => {
        console.log(err);
      });
    } else {
      this.setState({message: 'Not a valid email'});
    }
    e.target.username.value = '';
    e.target.user_email.value = '';
    e.target.password.value = '';
  }
  
  render() {
    return (
      <Router>
        <div>
          <Route path='/' exact render={() => (
            <div>
              Hello everyone!
              Login <Link to='/login'>here</Link>!
            </div>
          )} />
          <Route path='/login' render={() => (<Login handleLogin={this.handleLogin} handleChange={this.handleChange} username={this.state.username}/>)} />
          <Route path='/signup' render={() => (<Signup handleSignup={this.handleSignup} handleChange={this.handleChange}/>)} />
          <Route path='/logout' render={() => (<Logout handleLogout={this.handleLogout} username={this.state.username} user_email={this.state.user_email}/>)} />
          <p>{this.state.message}</p>
        </div>
      </Router>
    )
  }
}

export default App;