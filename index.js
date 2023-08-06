const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const exphbs = require('express-handlebars');
// import { addSampleData } from './src/models/sampledata.js';
const connect = require('./src/models/db.js');
const addSampleData = require('./src/models/sampledata.js');
const router = require('./src/routes/router.js');
// import handlebars from 'handlebars';
const handlebars = require('handlebars');

/* Server */

const bcrypt = require('bcrypt');
/*
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
*/

async function main () {
    const app = express(); //can I bring this out of this function

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
    
    app.use(router);

    // Session
    /*
    app.use(express.urlencoded({ extended: false }));
    app.use(flash());
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(methodOverride('_method'));
    */
    app.get("/", checkAuthenticated, (req, res) => {
        res.render("index.hbs");
    });

    app.get("/login", checkAuthenticated, (req, res) => {
        res.render("login.hbs");
    });

    /*
    app.post("/login", checkNotAuthenticated, passport.authenticate('local', {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    }));
    */

    app.get("/register", checkAuthenticated, (req, res) => {
        res.render("register.hbs")
    });

    app.get("/register", checkNotAuthenticated, async (req, res) => {
        
    });

    // Activate the app
    app.listen(process.env.SERVER_PORT, async function() {
        console.log("Express app is now listening on port " + process.env.SERVER_PORT);
        
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

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }

    res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return res.redirect("/");
    }
    next();
}

main();