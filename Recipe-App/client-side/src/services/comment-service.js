import url from './config';

const recipeService = {
    addComment: async function (data, recipeId) {   
      const res = await fetch(`${url}/api/comment/addComment/${recipeId}`, {
            body: JSON.stringify(data),
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'include'
        });
        return await res.text();
    },

    getAllComments: async function () {
        const res = await fetch(`${url}/api/comment/getAllComments`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'include'
        });
        return await res.json();
    },
};
  
export default recipeService;