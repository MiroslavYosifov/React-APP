const recipeService = {
    addRecipe: async function (data) {   
      const res = await fetch(`http://localhost:3333/api/recipe/addRecipe`, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      credentials: 'include'
    });
    return await res.text();
    },

    getAllRecipes: async function () {
        const res = await fetch(`http://localhost:3333/api/recipe/getAllRecipes`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      });
      return await res.json();
    },

    getRecipe: async function (id) {
        const res = await fetch(`http://localhost:3333/api/recipe/getRecipe/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      });
      return await res.json();
    },

    getMyRecipes: async function () {
        const res = await fetch(`http://localhost:3333/api/recipe/getMyRecipes`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        },
        credentials: 'include'
      });
      return await res.json();
    },
    
    editMyRecipe: async function (data, id) {
        const res = await fetch(`http://localhost:3333/api/recipe/editMyRecipe/${id}`, {
        body: JSON.stringify(data),
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        credentials: 'include'
      });
      return await res.json();
    },

    deleteMyRecipe: async function (id) {
      const res = await fetch(`http://localhost:3333/api/recipe/deleteMyRecipe/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
      credentials: 'include'
    });
    return await res.json();
  },
};
  
export default recipeService;