const recipeService = {
    addRecipe: function (data) {   
      return fetch(`http://localhost:3333/api/recipe/addRecipe`, {    
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        }
      }).then(res => res.text());
    },

    getAllRecipes: function () {
        return fetch(`http://localhost:3333/api/recipe/getAllRecipes`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      }).then(res => res.json());
    },

    getRecipe: function (id) {
        return fetch(`http://localhost:3333/api/recipe/getRecipe/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      }).then(res => res.json());
    }
    
};
  
export default recipeService;