const controllers = require('../controllers/');
const router = require('express').Router();
const auth = require('../utils/auth');

router.get('/getAllRecipes', controllers.recipe.get.getAllRecipes);
router.get('/getRecipe/:id', controllers.recipe.get.getRecipe);
router.post('/addRecipe', auth(), controllers.recipe.post.addRecipe);

module.exports = router;