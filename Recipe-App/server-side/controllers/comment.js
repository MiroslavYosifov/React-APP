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
        models.Comment.create({ title, content })
            .then((createdComment) => res.send(createdComment))
            .catch(next)
    },
  },

  put: (req, res, next) => {
      
  },

  delete: (req, res, next) => {

  }
};