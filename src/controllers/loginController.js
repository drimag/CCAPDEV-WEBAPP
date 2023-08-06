const User = require('../models/User.js');

const loginController = {

    checkCredentials: async function (req,res){
        console.log("checkCredential");
        console.log(req.body);
        
        try{
        const user = await User.findOne({username: req.body.username}).exec();
        //add checkPassword with hash
        const foundUser = await user.comparePassword(req.body.password);
        // Checks if credentials are in db
        if (foundUser) {
            console.log("user is:",user);
            console.log('Login successful:', user);

            // Transport user to home
                res.sendStatus(200);
            } else {
                console.log("INVALID USERNAME/PASSWORD");
                res.sendStatus(400);
            }
        }catch(err){
            console.log(err);
            res.sendStatus(400);
        }
    },

    // getLogin: async function (req, res) {
    //     // Dropdown links for navbar
    //     let currentUser = req.query.loggedIn;
    //     if(currentUser == null || currentUser === "" || currentUser == undefined || currentUser == "guest") currentUser = await users.findOne({username: "guest"});
    //     const dropdowns = getDropdownLinks(currentUser.username);
        
    //     res.render("login", {
    //         pagetitle: "Login",
    //         dropdownLinks: dropdowns,
    //         user: currentUser
    //     });
    // }
    getLogin: async function (req, res) {
        let currentUser = await User.findOne({username: req.query.loggedIn}).lean().exec();

        if (!currentUser) {
            currentUser = await User.findOne({username: "guest"}).lean().exec();
        }

        res.render("login", {
            pagetitle: "Login",
            //TODO: dropdownLinks: dropdowns,
            user: currentUser
        });
    }
}

module.exports = loginController;

/*

const LocalStrategy = require('passport-local').LocalStrategy

function initialize(passport) {
    const authenticateUser = (email, password, done) =>
    {
        const user = getUserById(id)
        if(user == null) {
            return done(null, false, { message: "Username does not exist" })
        }
    }
}

passport

 */