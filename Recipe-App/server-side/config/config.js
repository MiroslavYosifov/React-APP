const env = process.env.NODE_ENV || 'development';

// const url = "mongodb+srv://miro:0EYtbLvbictfbVek@myfirstcluster.7bryi.mongodb.net/myFirstData?retryWrites=true&w=majority"

const config = {
    development: {
        port: process.env.PORT || 3333,
        dbURL: 'mongodb+srv://miro:0EYtbLvbictfbVek@myfirstcluster.7bryi.mongodb.net/myFirstData?retryWrites=true&w=majority',
        authCookieName: 'x-auth-token',
        domain: 'http://localhost:3000'
    },
    production: {
        port: process.env.PORT || 3333,
        dbURL: 'mongodb+srv://miro:0EYtbLvbictfbVek@myfirstcluster.7bryi.mongodb.net/myFirstData?retryWrites=true&w=majority',
        authCookieName: 'x-auth-token',
        domain: 'https://murmuring-tor-82797.herokuapp.com'
    },
};

module.exports = config[env];