const models = require('../models');
const config = require('../config/config');
const jwt = require('../utils/jwt');
const { cloudinary } = require('../utils/cloudinary');

// TO DO VALIDATIONS // TO DO VALIDATIONS // TO DO VALIDATIONS // TO DO VALIDATIONS

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
        const userId = req.user._id;
        const { title, compressedImage, preparation, ingredients, category} = req.body;

        cloudinary.uploader.upload(compressedImage, {
          upload_preset: 'recipe-prod',
        })
        .then(res => {
           return res.url;
        })
        .then( uploadedImageUrl => {
            models.Recipe.create({ title, imageUrl: uploadedImageUrl, preparation, ingredients, category, creator: userId })
            .then((resCreatedRecipe) => {
              console.log("resCreatedRecipe", resCreatedRecipe);
              return resCreatedRecipe
            })
            .then(createdRecipe => {
              models.User.updateOne({ _id: userId }, { "$push": { "recipes": createdRecipe._id } }).then(updateUser => {
                console.log("updateUser", updateUser);

                res.send(createdRecipe)
              })
            })
            .catch(err => {
              console.log(err);
            });

        })
        .catch(err => {
          console.log(err);
        })
        
        
    },
  },

  put: {
    editMyRecipe: (req, res, next) => {

      const recipId = req.params.id;
      const { title, preparation, ingredients, category, currentImageId, compressedImage } = req.body;
      
      cloudinary.uploader
      .destroy(currentImageId)
      .then(deleteResponse => {
        return Promise.all([res])
      })
      .then(res => {
        cloudinary.uploader.upload(compressedImage, {
          upload_preset: 'recipe-prod',
        })
        .then(res => {
           return res.url;
        })
        .then(uploadedImageUrl => {
            models.Recipe.findOneAndUpdate({ _id: recipId }, { title, imageUrl: uploadedImageUrl, preparation, ingredients, category })
            .exec( function( err, updatedRecipe ) {

              if(err){ console.log(err); return; }
              res[0].send(updatedRecipe);
            });
        })
        .catch(err => {
          console.log(err);
        })
      })
      .catch(err => {
          console.log(err);
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
      //const recipId = req.params.id;
      const { imagePublicId, recipeId } = req.body;
      const userId = req.user._id;
      console.log(imagePublicId);
      // TO DO VALIDATIONS
      cloudinary.uploader.destroy(imagePublicId)
      .then(res => {
        console.log('DELETED', res);
      });

      models.Recipe.findOneAndDelete({ _id: recipeId }).then(updatedRecipe => {
        models.Comment.deleteMany({ recipe: recipeId }).then(comments => {
          models.User.updateOne({ _id: userId }, { '$pull': { recipes : recipeId }}).then(user => {
            res.send(updatedRecipe);
          }).catch(next);
        }).catch(next);
      }).catch(next);
    },
  }
};