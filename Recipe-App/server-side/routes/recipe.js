const controllers = require('../controllers/');
const router = require('express').Router();
const auth = require('../utils/auth');

router.post('/addRecipe', auth(), controllers.recipe.post.addRecipe);
router.get('/getAllRecipes', controllers.recipe.get.getAllRecipes);
router.get('/getMyRecipes',  auth(), controllers.recipe.get.getMyRecipes);
router.get('/getRecipe/:id', controllers.recipe.get.getRecipe);
router.put('/editMyRecipe/:id', auth(), controllers.recipe.put.editMyRecipe);
router.delete('/deleteMyRecipe/:id', auth(), controllers.recipe.delete.deleteMyRecipe);
 
module.exports = router;