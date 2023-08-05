/*
import { getDb } from '../models/db.js';


const db = getDb();

const users = db.collection("users");
const posts = db.collection("posts");
const comments = db.collection("comments");
*/

const User = require('../models/User.js');
const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');

const getDropdownLinks = require('../middleware/navDropdown.js');

// TODO: Adjust Functions to Mongoose
const changePasswordController = {

    getChangePassword: async function (req,res) {
        console.log("Request to change password page received.");
        let curr = req.query.loggedIn;

        try {
            // No login param in URL
            if(!curr) return res.status(400).send("No logged in user");

            // Look for user with matching username
            const user = await User.findOne({username: curr}).exec();

            // User does not exist
            if(!user) return res.status(404).send("User not found");
            
            const dropdowns = getDropdownLinks(user.username); 

            res.render("change_password", {
                pagetitle: "Change Password",
                user: user,
                dropdownLinks: dropdowns
            })
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },

    getCurrentPassword: async function (req,res) {
        console.log("Request to get current user's password received.");

        let curr = req.query.loggedIn;

        try {
            // No login param in url
            if(!curr) return res.status(400).send("No logged in user");

            // Look for user with matching username
            const currUser = await User.findOne({username: curr}).exec();

            // User does not exist
            if(!currUser) return res.status(404).send("User not found");

            // Send the password
            console.log("sending this as user password: " + currUser)
            res.send(currUser.password);

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },

    changePassword: async function (req, res) {
        console.log("Request to change current user's password received.");

        let currentUser = req.query.loggedIn;
        let newPassword = req.body;

        try {
            // No login param in url
            if(!currentUser) return res.status(400).send("No logged in user");

            // Look for user with matching username
            const currUser = await User.findOne({username: currentUser});

            // User does not exist
            if(!currUser) return res.status(404).send("User not found");

            // Change the password
            User.updateOne(
                {username: currentUser},
                {$set: 
                    { password: newPassword.password }
                }).then( val => {
                    res.status(200).send("Password changed successfully");
                    console.log("change password successful: " + val);
                    
                }).catch(err => {
                    res.status(500).send("Error changing password");
                    console.log("change password error: " + err);
            });

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    // post method change password
    
}
module.exports = changePasswordController;