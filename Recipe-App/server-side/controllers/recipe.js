const models = require('../models');
const config = require('../config/config');
const jwt = require('../utils/jwt');

module.exports = {
  get: {
    searchRecipes: (req, res, next) => {
      const { search, category, criterion } =  req.query;

      if(category !== undefined) {
        models.Recipe.find({'category': {'$regex': category, $options:'i'}}).then(recipes => {
          res.send(recipes);
        }).catch(next);
      }

      if (criterion !== undefined) {
        if (criterion === "likes" ) {
          models.Recipe.find().sort({ likes: -1}).then(recipes => {
            res.send(recipes);
          }).catch(next);
        }
        if(criterion === "createdDate") {
           models.Recipe.find().sort({ createdDate: -1}).then(recipes => {
            res.send(recipes);
          }).catch(next);
        }
      } 

      if (search !== undefined) {
        models.Recipe.find({'title': {'$regex': search, $options:'i'}}).then(recipes => {
          res.send(recipes);
        }).catch(next);
      }
    },
    getAllRecipes: (req, res, next) => {
        models.Recipe.find().then((recipes) => {
          res.send(recipes);
        }).catch(next);
    },
    getMyRecipes: (req, res, next) => {
        const userId = req.user._id;
        models.User.findById(userId)
          .populate('likedRecipes recipes')
          .exec( function( err, user ) {
            if(err){ console.log(err); return; }
            res.send(user);
          });
    },
    getRecipe: (req, res, next) => {
        const id = req.params.id;
        const token = req.cookies[config.authCookieName];

        models.Recipe.findById(id).populate('creator comments').exec( function( err, recipe ) {
          if(err){ console.log(err); return; }
          if(token) {
            jwt.verifyToken(token).then(data => {
              const currentdUserId = data.id;
              const recipeCreatorId = recipe.creator._id.toString();
              models.User.findById(currentdUserId).then(user => {
                recipe.isCreator = currentdUserId === recipeCreatorId;
                recipe.isFavorite = user.likedRecipes.includes(recipe._id);
                res.send(recipe);
              }).catch(next);
            }).catch(next);  
          } else {
            res.send(recipe);
          }
      });
    }
  },

  post: {
    addRecipe: (req, res, next) => {
        const { title, imageUrl, preparation, ingredients, category } = req.body;
        console.log(category);
        const userId = req.user._id;
        models.Recipe.create({ title, imageUrl, preparation, ingredients, category, creator: userId }).then((createdRecipe) => {
          models.User.updateOne({ _id: userId }, { "$push": { "recipes": createdRecipe._id } }).then(updateUser => {
            res.send(createdRecipe)
          }).catch(next);
        }).catch(next)
    },
  },

  put: {
    editMyRecipe: (req, res, next) => {
      const { title, imageUrl, preparation, ingredients, category } = req.body;
      console.log(category);
      const recipId = req.params.id;
      const userId = req.user._id;
      models.Recipe.findOneAndUpdate({ _id: recipId }, { title, imageUrl, preparation, ingredients, category })
        .exec( function( err, updatedRecipe ) {
          if(err){ console.log(err); return; }
          res.send(updatedRecipe);
        });
    },

    likeRecipe: (req, res, next) => {
      const recipId = req.params.id;
      const userId = req.user._id;
      models.User.updateOne({ _id: userId }, { "$addToSet": { "likedRecipes": recipId } }).then(user => {
        models.Recipe.updateOne({ _id: recipId }, { "$inc": { "likes": 1 } }).then(recipe => {
          res.send(recipe);
        }).catch(next);  
      }).catch(next);
    },

    disLikeRecipe: (req, res, next) => {
      const recipId = req.params.id;
      const userId = req.user._id;
      models.User.updateOne({ _id: userId }, { "$pull": { "likedRecipes": recipId } }).then(recipe => {
        models.Recipe.updateOne({ _id: recipId }, { "$inc": { "likes": -1 } }).then(recipe => {
          res.send(recipe);
        }).catch(next);  
      }).catch(next);
    },
  },
  delete: {
    deleteMyRecipe: (req, res, next) => {
      const recipId = req.params.id;
      const userId = req.user._id;
      models.Recipe.findOneAndDelete({ _id: recipId }).then(updatedRecipe => {
        models.Comment.deleteMany({ recipe: recipId }).then(comments => {
          models.User.updateOne({ _id: userId }, { '$pull': { recipes : recipId }}).then(user => {
            res.send(updatedRecipe);
          }).catch(next);
        }).catch(next);
      }).catch(next);
    },
  }
};