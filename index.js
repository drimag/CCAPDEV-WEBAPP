//var time = 1000 * 60 * 60 * 24;
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const exphbs = require('express-handlebars');
const connect = require('./src/models/db.js');
const addSampleData = require('./sampledata.js');
const router = require('./src/routes/router.js');
const handlebars = require('handlebars');
const User = require('./src/models/User.js');

/* Server */
const bcrypt = require('bcrypt');
// const passport = require('passport');
const session = require('express-session');
const localStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');

async function main () {
    const app = express();
    
    app.use("/static", express.static("./public"));
    app.engine("hbs", exphbs.engine({
        extname: 'hbs',
        helpers: {
            formatDate: function(date) {
                return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
            }
        }
    }));
    app.set("view engine", "hbs");
    app.set("views", "./src/views");

    handlebars.registerHelper('ifEqual', function (arg1, arg2, options) {
        return arg1 === arg2 ? options.fn(this) : options.inverse(this);
    });

    // for file transfer
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ limit: '10mb', extended: true }));

    ////////////////////////////////////////////////////////////////
    // Session Middleware
    app.use(cookieParser());
    app.use(session({
        secret: "verysecret",
        cookie: {
            maxAge: null//,
            //secure: false // nope I added this just now have u tried setting this to false apparently it should be false for local testing? idk
        },
        resave: false,
        saveUninitialized: false
    }));

    app.post('/login', async (req, res) => {
        console.log("login");
        // this works but req.session cant be accessed in controller
        if(req.body.username && req.body.password) {
            console.log(req.body);
            let user = await User.findOne({username: req.body.username});
            console.log("finding user");
            if (user) {
                console.log("found user");

                const result = await bcrypt.compare(req.body.password, user.password);
                if (!result) {
                    console.log("wrong pass");
                    res.sendStatus(400);
                } else {
                    console.log("correct pass");
                    req.session.user = user;
                    req.session.authorized = true;
                    req.session.cookie.maxAge = 1000 * 60 * 60 * 24;
                    console.log(req.session.user.username);
                    res.sendStatus(200);
                }
            } else {
                res.sendStatus(400);
            }
        }
    });

    app.post('/login-d', async (req, res) => {
        console.log("login dont remember");
        // this works but req.session cant be accessed in controller
        if(req.body.username && req.body.password) {
            console.log(req.body);
            let user = await User.findOne({username: req.body.username});
            console.log("finding user");
            if (user) {
                console.log("found user");

                const result = await bcrypt.compare(req.body.password, user.password);
                if (!result) {
                    console.log("wrong pass");
                    res.sendStatus(400);
                } else {
                    console.log("correct pass");
                    req.session.user = user;
                    req.session.authorized = true;
                    //how do i make it forget the user after closing ;-;
                    req.session.cookie.maxAge = null;
                    //console.log(req.session.user.username);
                    res.sendStatus(200);
                }
            } else {
                res.sendStatus(400);
            }
        }
    });
    app.use(router);

    // Activate the app
    app.listen(process.env.SERVER_PORT, async function() {
        console.log("Express app is now listening...");
        
        try {
            await connect();
            console.log("Now connected to MongoDB");

            await addSampleData();
            console.log("Sample Data Added");
        } catch (err) {
            console.log("Connection to MongoDB failed: ");;
            console.error(err);
        }
    });
}

main();