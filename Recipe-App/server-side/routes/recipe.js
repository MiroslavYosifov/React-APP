const controllers = require('../controllers/');
const router = require('express').Router();

router.get('/getAllRecipes', controllers.recipe.get.getAllRecipes);
router.get('/getRecipe/:id', controllers.recipe.get.getRecipe);
router.post('/addRecipe', controllers.recipe.post.addRecipe);

module.exports = router;