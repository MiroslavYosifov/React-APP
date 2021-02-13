import React from 'react';
import userService from '../../services/user-service';

function Logout (props) {
  userService.logout().then(res => {
    localStorage.removeItem('username');
    props.onLogoutSubmit()
  });
  return null;
}

export default Logout;