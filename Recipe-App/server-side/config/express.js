const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const secret = 'secret';
const env = process.env.NODE_ENV || 'development';

module.exports = (app) => {
    //for development
    if(env === "development") {
        app.use(cors({
            origin: 'http://localhost:3000',
            mode: 'no-cors',
            credentials: true,
        }));
    } else if (env === "production"){
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
    }
    

    //for production
     
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(cookieParser(secret));
};