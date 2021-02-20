import React from 'react';
import userService from '../../services/user-service';

function Logout (props) {
  userService.logout().then(res => {
    localStorage.removeItem('username');
    document.cookie = "x-auth-token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    props.onLogoutSubmit()
  });
  return null;
}

export default Logout;