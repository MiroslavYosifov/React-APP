const models = require('../models');
const config = require('../config/config');
const utils = require('../utils');

module.exports = {
  get: {
    getAllComments: (req, res, next) => {
        models.Comment.find()
        .then((comment) => {
            console.log(comment);
            res.send(comment)
        })
        .catch(next)
    },
  },

  post: {
    addComment: (req, res, next) => {
        const { title, content } = req.body;
        const userId = req.user._id;
        const username = req.user.username;
        const recipeId = req.params.id;

        models.Comment.create({ title, content, user: userId, creator: username, recipe: recipeId }).then((createdComment) => {
          models.User.updateOne({ _id: userId }, { "$push": { "comments": createdComment._id } }).then(updateUser => {
            models.Recipe.updateOne({ _id: recipeId }, { "$push": { "comments": createdComment._id } }).then(updateRecipe => {
              res.send(createdComment);
            }).catch(next);
          }).catch(next);
        }).catch(next);
    },
  },

  put: (req, res, next) => {
      
  },

  delete: (req, res, next) => {

  }
};