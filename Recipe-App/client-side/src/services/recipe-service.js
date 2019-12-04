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
    }
    
};
  
export default recipeService;