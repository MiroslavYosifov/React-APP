const mongoose = require('mongoose');
const config = require('./config');

module.exports = () => {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    return mongoose.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
};