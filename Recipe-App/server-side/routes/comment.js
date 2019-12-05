const controllers = require('../controllers/');
const router = require('express').Router();
const auth = require('../utils/auth');

router.get('/getAllComments', controllers.comment.get.getAllComments);
router.post('/addComment/:id', auth(), controllers.comment.post.addComment);

module.exports = router;