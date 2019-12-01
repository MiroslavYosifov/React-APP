const userService = {
    register: async function (data) {
      const res = await fetch(`http://localhost:3333/api/user/register`, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      }
    });
    return await res.json();
    },
  
    login: async function (data) {
      const res = await fetch(`http://localhost:3333/api/user/login`, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        credentials: 'include'
      });
      const text = await res.text();
      return res.status === 200 ? text : 'notlogged';
    },
  
    logout: async function () {
      const res = await fetch(`http://localhost:3333/api/user/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      return await res.text();
    }
  
  };
  
  export default userService;