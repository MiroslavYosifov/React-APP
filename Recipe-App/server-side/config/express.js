const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const secret = 'secret';

module.exports = (app) => {
      app.all('*', function(req, res,next) {
        /**
         * Response settings
         * @type {Object}
         */
        var responseSettings = {
            "AccessControlAllowOrigin": req.headers.origin,
            "AccessControlAllowHeaders": "Content-Type,X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5,  Date, X-Api-Version, X-File-Name",
            "AccessControlAllowMethods": "POST, GET, PUT, DELETE, OPTIONS",
            "AccessControlAllowCredentials": true
        };
        /**
         * Headers
         */
        res.header("Access-Control-Allow-Credentials", responseSettings.AccessControlAllowCredentials);
        res.header("Access-Control-Allow-Origin",  responseSettings.AccessControlAllowOrigin);
        res.header("Access-Control-Allow-Headers", (req.headers['access-control-request-headers']) ? req.headers['access-control-request-headers'] : "x-requested-with");
        res.header("Access-Control-Allow-Methods", (req.headers['access-control-request-method']) ? req.headers['access-control-request-method'] : responseSettings.AccessControlAllowMethods);
        
        if ('OPTIONS' == req.method) {
            res.send(200);
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