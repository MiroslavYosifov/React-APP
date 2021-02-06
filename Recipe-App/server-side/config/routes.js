const router = require('../routes/');
const auth = require('../utils/auth');

module.exports = (app) => {
    app.use('/', (req, res) => {
        res.send('Hello');
    });
    app.use('/api/user', router.user);
    app.use('/api/recipe', router.recipe);
    app.use('/api/comment', router.comment);
    app.use('*', (req, res, next) => res.send('<h1> Something went wrong. Try again. :thumbsup: </h1>'))
};