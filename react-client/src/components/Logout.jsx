import React from 'react';
import {withRouter} from 'react-router-dom';

const Logout = withRouter(({handleLogout, username, history}) => (
  <div>
    <button onClick={(e) => {handleLogout(e); history.push('/')}}>Logout</button>
    <p>
      {username ? 'Username: ' + username: ''}
    </p>
  </div>
));

export default Logout;