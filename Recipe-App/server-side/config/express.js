const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const secret = 'secret';

module.exports = (app) => {
    // for development
        // app.use(cors({
        //     origin: 'http://localhost:3000',
        //     mode: 'no-cors',
        //     credentials: true,
        // }));
    
    //for production
      app.all('*', function(req, res,next) {
        /**
         * Response settings
         * @type {Object}
         */

        let responseSettings = {
            "AccessControlAllowOrigin": req.headers.origin,
            "AccessControlAllowHeaders": "Origin, Content-Type, X-Auth-Token",
            "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
            "AccessControlAllowCredentials": true
        };
        console.log(req.headers.origin);
        /**
         * Headers
         */

        res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
        res.header("Access-Control-Allow-Headers", responseSettings.AccessControlAllowHeaders);
        res.header("Access-Control-Allow-Methods", responseSettings.AccessControlAllowMethods);
        res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
        
        if ('OPTIONS' == req.method) {
            res.sendStatus(200);
        }
        else {
            next();
        }
    });
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(cookieParser(secret));
};