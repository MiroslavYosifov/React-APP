const models = require('../models');
const config = require('../config/config');
const utils = require('../utils');

module.exports = {
  get: {
    getAllRecipes: (req, res, next) => {
        models.Recipe.find()
        .then((recipes) => res.send(recipes))
        .catch(next)
    },
    getRecipe: (req, res, next) => {    
        const id = req.params.id;
        models.Recipe.findById(id)
        .then((recipe) => res.send(recipe))
        .catch(next)
    }
  },

  post: {
    addRecipe: (req, res, next) => {
        const { products, title, imageUrl } = req.body;       
        models.Recipe.create({ products, title, imageUrl })
            .then((createdRecipe) => res.send(createdRecipe))
            .catch(next)
    },
  },

  put: (req, res, next) => {
      
  },

  delete: (req, res, next) => {

  }
};