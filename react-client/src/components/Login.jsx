import React from 'react';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signOrLog: 'sign',
      username: '',
      user_email: ''
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.logout = this.logout.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.conditionalRender = this.conditionalRender.bind(this);
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
      e.target.user_email.value = '';
      e.target.password.value = '';
    } else {
      this.setState({message: 'Please input both a username and password.'});
    }
  }

  logout() {
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

  handleChange(e) {
    this.setState({message: ''});
    if (e.target.name === 'username') {
      this.setState({username: e.target.value});
    } else if (e.target.name === 'user_email') {
      this.setState({user_email: e.target.value});
    }
  }

  conditionalRender() {
    if (this.state.isLoggedIn) {
      return (
        <div>
          <button onClick={this.logout}>Logout</button>
          <p>
            {this.state.username ? 'Username: ' + this.state.username: ''}
          </p>
          <p>
            {this.state.user_email ? 'Email: ' + this.state.user_email: ''}
          </p>
          {/* <form className='hidden' onSubmit={this.handleSignup}>
            <input type='text' name='username' value={this.state.username} onChange={this.handleChange} />
            <input type='text' name='user_email' value={this.state.user_email} onChange={this.handleChange} />
            <input type='text' name='password' />
            <input type='submit'></input>
          </form> */}
        </div>
      );
    } else if (this.state.signOrLog === 'sign') {
      return (
      <div>
        <form className='checkout-form' onSubmit={this.handleSignup}>
          Username: <input type='text' name='username' value={this.state.username} onChange={this.handleChange} />
          Email: <input type='text' name='user_email' value={this.state.user_email} onChange={this.handleChange} />
          Password: <input type='text' name='password' />
          <input type='submit'></input>
        </form>
        <div>Already have an account? <button onClick={() => {this.setState({signOrLog: 'log'});}}>Login</button></div>
      </div>
      );
    } else if (this.state.signOrLog === 'log') {
      return (
      <div>
        <form className='checkout-form' onSubmit={this.handleLogin}>
          Username: <input type='text' name='username' value={this.state.username} onChange={this.handleChange} />
          <input className='hidden' type='text' name='user_email' value={this.state.user_email} onChange={this.handleChange} />
          Password: <input type='text' name='password' />
          <input type='submit'></input>
        </form>
        <div>Don't have an account yet? <button onClick={() => {this.setState({signOrLog: 'sign'});}}>Sign up</button></div>
      </div>
      );
    }
  }

  handleSignup(e) {
    e.preventDefault();
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
      <div className='checkout'>
        {
          this.conditionalRender()
        }
        <p>{this.state.message}</p>
      </div>
    )
  }
}

export default Checkout;