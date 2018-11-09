import React from 'react';
import {withRouter} from 'react-router-dom';

const Menu = withRouter(({history}) => (
  <div className='menu'>
      <div className='menu-option' onClick={() => {history.push('/')}}>Home</div>
      <div className='menu-option' onClick={() => {history.push('/aboutme')}}>About Me</div>
      <div className='menu-option' onClick={() => {history.push('/login')}}>Login</div>
      <div className='menu-option' onClick={() => {history.push('/signup')}}>Signup</div>
  </div>
));

export default Menu;