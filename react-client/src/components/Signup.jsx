import React from 'react';
import {Link, withRouter} from 'react-router-dom';

const Signup = withRouter(({handleChange, handleSignup, user_email, username, history}) => (
  <div className='signup'>
    <form className='signup-form' onSubmit={(e) => {handleSignup(e); history.push('/logout')}}>
      Username: <input type='text' name='username' value={username} onChange={handleChange} />
      Email: <input type='text' name='user_email' value={user_email} onChange={handleChange} />
      Password: <input type='text' name='password' />
      <input type='submit'></input>
    </form>
    <div>Already have an account? <Link to='/login'>Login</Link></div>
  </div>
));

export default Signup;