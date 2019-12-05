const models = require('../models');
const config = require('../config/config');
const utils = require('../utils');

module.exports = {
  get: {
    getAllRecipes: (req, res, next) => {
        models.Recipe.find().then((recipes) =>{
          res.send(recipes);
        }).catch(next);
    },
    getMyRecipes: (req, res, next) => {
        const userId = req.user._id;
        models.Recipe.find({ creator: { $eq: userId } }).then((recipes) => {
          res.send(recipes)
        }).catch(next);
    },
    getRecipe: (req, res, next) => {    
        const id = req.params.id;
        models.Recipe.findById(id).populate('creator comments').exec( function( err, recipe ) {
          if(err){ console.log(err); return; }
          // console.log(recipe.comments[0]);
          // console.log(recipe.creator.username);
          res.send(recipe);
      });
    }
  },

  post: {
    addRecipe: (req, res, next) => {
        const { products, title, imageUrl } = req.body;
        const userId = req.user._id;
        models.Recipe.create({ products, title, imageUrl, creator: userId }).then((createdRecipe) => {
          models.User.updateOne({ _id: userId }, { "$push": { "recipes": createdRecipe._id } }).then(updateUser => {
            res.send(createdRecipe)
          }).catch(next);
        }).catch(next)
    },
  },

  put: {
    editMyRecipe: (req, res, next) => {
      const { products, title, imageUrl } = req.body;
      const recipId = req.params.id;
      const userId = req.user._id;
      
      models.Recipe.findOneAndUpdate({ _id: recipId }, { products, title, imageUrl }).exec( function( err, updatedRecipe ) {
        if(err){ console.log(err); return; }
        console.log(updatedRecipe);
        res.send(updatedRecipe);
      });

    },
  },

  delete: {
    
  }
};