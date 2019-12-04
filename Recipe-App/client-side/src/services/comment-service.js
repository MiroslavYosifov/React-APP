const recipeService = {
    addComment: async function (data) {   
      const res = await fetch(`http://localhost:3333/api/comment/addComment`, {
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
        const res = await fetch(`http://localhost:3333/api/comment/getAllComments`, {
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