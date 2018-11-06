import React from 'react';
import {Link, withRouter} from 'react-router-dom';

const Login = withRouter(({handleLogin, handleChange, username, history}) => (
  <div className='login'>
    <div>
      <form className='login-form' onSubmit={(e) => {handleLogin(e); history.push('/logout')}}>
        Username: <input type='text' name='username' value={username} onChange={handleChange} />
        Password: <input type='text' name='password' />
        <input type='submit'></input>
      </form>
      <div>Don't have an account yet? <Link to='/signup'>Sign up</Link></div>
    </div>
  </div>
));

export default Login;