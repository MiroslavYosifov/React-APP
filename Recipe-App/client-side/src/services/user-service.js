import url from './config';
const userService = {
    register: async function (data) {
      const res = await fetch(`${url}/api/user/register`, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      }
    });
    return await res.json();
    },
  
    login: async function (data) {
      const res = await fetch(`${url}/api/user/login`, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        credentials: 'include'
      });
      const text = await res.text();
      console.log(text);
      return res.status === 200 ? text : 'notlogged';
    },
  
    logout: async function () {
      const res = await fetch(`${url}/api/user/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      return await res.text();
    },

    changeUserProfileImage: async function (data) {
      const res = await fetch(`${url}/api/user/changeUserProfileImage`, {
      body: JSON.stringify(data),
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-type': 'application/json'
      }
    });
    return await res.json();
    },

    getmyProfile: async function () {
      const res = await fetch(`${url}/api/user/getmyProfile`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        },
        credentials: 'include'
      });
      return await res.json();
    },

    getUserProfile: async function (username) {
      const res = await fetch(`${url}/api/user/userProfile/${username}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        },
        credentials: 'include'
      });
      return await res.json();
    },
  
  };
  
  export default userService;