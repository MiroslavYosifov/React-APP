const controllers = require('../controllers/');
const router = require('express').Router();

router.get('/getAllComments', controllers.comment.get.getAllComments);
router.post('/addComment', controllers.comment.post.addComment);

module.exports = router;