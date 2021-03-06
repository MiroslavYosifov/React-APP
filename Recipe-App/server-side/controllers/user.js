const env = process.env.NODE_ENV || 'development';
const models = require('../models');
const config = require('../config/config');
const utils = require('../utils');
const jwt = require('../utils/jwt');
const { cloudinary } = require('../utils/cloudinary');

module.exports = {
  get: {
    getmyProfile: (req, res, next) => {
      const userId = req.user._id;

      models.User.findOne({ _id: userId })
        .populate('likedRecipes recipes')
        .exec( function( err, user ) {
          if(err){ console.log(err); return; }
          user.isCurrentLoggedUser = true;
          res.send(user);
        });
    },

    userProfile: (req, res, next) => {
      const userId = req.user._id;
      let username = req.params.id;

      models.User.findOne({ username })
        .populate('likedRecipes recipes')
        .exec( function( err, user ) {

          if(err){ console.log(err); return; }
          if(user === null) { console.log(user); return }

          const userProfileId = user._id.toString();
          user.isCurrentLoggedUser = userProfileId === userId.toString();
          res.send(user);
        });
    }
  },

  post: {
    register: (req, res, next) => {
      const { username, password, rePassword } = req.body;

      if(password !== rePassword) { console.log('password must be equael'); return; }

      models.User.create({ username, password })
        .then((createdUser) => res.send(createdUser))
        .catch(next)
    },
    
    login: (req, res, next) => {
      const { username, password } = req.body;
      
      models.User.findOne({ username })
        .then((user) => !!user ? Promise.all([user, user.matchPassword(password)]) : [null, null])
        .then(([user, match]) => {
          if (!match) {
            res.status(401).send('Invalid username or password');
            return;
          }
          const token = utils.jwt.createToken({ id: user._id });
          console.log(env);
          // for development
          // res.cookie(config.authCookieName, token).send({ username: user.username, token: token });

          // for production
          res.cookie(config.authCookieName, token, { 
            sameSite: 'None', 
            secure: true,  
            httpOnly: true,
            httspOnly: true
           }).send({ username: user.username, token: `x-auth-token=${token}` });
         
        })
        .catch(next);
    },

    logout: (req, res, next) => {
      const { token } = req.body;
      console.log('-'.repeat(100));
      console.log(token);
      console.log('-'.repeat(100));
      models.TokenBlacklist.create({ token })
        .then(() => {
          res.clearCookie(config.authCookieName).send('Logout successfully!');
        })
        .catch(next);
    },

    changeUserProfileImage: (req, res, next) => {
      const userId = req.user._id;
      const { compressedImage } = req.body;

      cloudinary.uploader.upload(compressedImage, {
        upload_preset: 'recipe-prod',
      })
      .then(res => {
        console.log(res);
         return res.url;
      })
      .then(uploadedImageUrl => {
        models.User.updateOne({ _id: userId }, { profileImage: uploadedImageUrl }).then(user => {
          res.send(user);
        }).catch(next)
      });
    }
  },

  put: {
  
  },

  delete: (req, res, next) => {
    // const id = req.params.id;
    // models.User.deleteOne({ _id: id })
    //   .then((removedUser) => res.send(removedUser))
    //   .catch(next)
  }
};