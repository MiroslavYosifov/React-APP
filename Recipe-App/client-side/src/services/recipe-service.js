import url from './config';

const recipeService = {
   searchRecipes: async function (searchQuery) {
      const res = await fetch(`${url}/api/recipe/searchRecipes${searchQuery}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      },
    });
    return await res.json();
    },
    addRecipe: async function (data) {   
      const res = await fetch(`${url}/api/recipe/addRecipe`, {
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
        const res = await fetch(`${url}/api/recipe/getAllRecipes`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      });
      return await res.json();
    },

    getRecipe: async function (id) {
        const res = await fetch(`${url}/api/recipe/getRecipe/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        },
        credentials: 'include'
      });
      return await res.json();
    },

    getMyRecipes: async function () {
        const res = await fetch(`${url}/api/recipe/getMyRecipes`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        },
        credentials: 'include'
      });
      return await res.json();
    },
    
    editMyRecipe: async function (data, id) {
        const res = await fetch(`${url}/api/recipe/editMyRecipe/${id}`, {
        body: JSON.stringify(data),
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        credentials: 'include'
      });
      return await res.json();
    },

    likeRecipe: async function (id) {
        const res = await fetch(`${url}/api/recipe/likeRecipe/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        credentials: 'include'
      });
      return await res.json();
    },

    disLikeRecipe: async function (id) {
        const res = await fetch(`${url}/api/recipe/disLikeRecipe/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        credentials: 'include'
      });
      return await res.json();
    },

    deleteMyRecipe: async function (data) {
      const res = await fetch(`${url}/api/recipe/deleteMyRecipe/${data.recipeId}`, {
      body: JSON.stringify(data),
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