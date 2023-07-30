const User = require('../models/User.js');
const Post = require('../models/Post.js');
// const Comment = require('../models/Comment.js');

const controller = {
    getHome: async function (req, res) {
        console.log('getHome received');

        let loggedIn = await User.findOne({username: req.query.loggedIn}).lean().exec();
        
        if(loggedIn === null) {
            // only guest (does not include if the username doesnt exist)
            loggedIn = await User.findOne({username: "guest"}).lean().exec();
        }
        
        const posts = await Post.find({}).populate({
            path: 'user_id'
        }).lean().exec();

        console.log(posts);

        res.render('index', {
            pagetitle: "Home",
            user: loggedIn,
            posts: posts,
            //dropdownLinks: dropdowns, // Navbar links 
            //searchDetails: searchDetails
        });

        /*

        console.log("Request to home received.");
    
        let currentUser = req.query.loggedIn;
        console.log("Current User: " + currentUser);

        try {
            if(currentUser == null || currentUser === "guest" || currentUser == undefined) {
                currentUser = await users.findOne({username: "guest"});
            } else {
                currentUser = await users.findOne({username: req.query.loggedIn});
            }

            console.log("Current User: " + currentUser);
        
            // Get Posts For Display
            const postsArray = await posts.aggregate(
                [
                    {
                        '$lookup': {
                        'from': 'users', 
                        'localField': 'user_id', 
                        'foreignField': '_id', 
                        'as': 'user_details'
                        }
                    },
                    {
                        '$unwind': '$user_details'
                    }
                ]
            ).toArray();
            
            // Filter posts if there is a search
            let searchTerms = req.query.search;
            let searchPosts;
        
            if(!(searchTerms == undefined || searchTerms === "")){
                searchPosts = postsArray.filter((post) => {
                    let titleMatch = post.title.toLowerCase().includes(searchTerms.toLowerCase());
                    let descriptionMatch = post.description.toLowerCase().includes(searchTerms.toLowerCase());
        
                    return titleMatch || descriptionMatch;
                });
            } else {
                searchPosts = postsArray;
            }
            
            const searchDetails = { numPosts : searchPosts.length, search : searchTerms };
            console.log("search Detials: " + searchDetails);
        
            // Get dropdown links based on if user is logged in
            const dropdowns = getDropdownLinks(currentUser.username); 
            console.log("dropdown links: " + dropdowns);
        
            res.render("index", {
                pagetitle: "Home",
                user: currentUser,
                posts: searchPosts,
                dropdownLinks: dropdowns, // Navbar links 
                searchDetails: searchDetails
            });
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
        */
    }
}


module.exports = controller;
/*

import { getDb } from '../models/db.js';
import { getDropdownLinks } from '../middleware/navDropdown.js';

const db = getDb();

const users = db.collection("users");
const posts = db.collection("posts");
const comments = db.collection("comments");

const controller = {
    getDeletedPage: async function(req, res) {
        try {
            const user = await users.findOne({username: req.query.loggedIn});
            
            // Dropdown links for navbar
            let dropdowns = getDropdownLinks(user.username);
            res.render("deleted_post", {
                user: user,
                dropdownLinks: dropdowns
            });
        } catch (error) {
            console.error(error);
            res.status(500);
        }
    },

    getHome: async function(req, res) {
        console.log("Request to home received.");
    
        let currentUser = req.query.loggedIn;
        console.log("Current User: " + currentUser);

        try {
            if(currentUser == null || currentUser === "guest" || currentUser == undefined) {
                currentUser = await users.findOne({username: "guest"});
            } else {
                currentUser = await users.findOne({username: req.query.loggedIn});
            }

            console.log("Current User: " + currentUser);
        
            // Get Posts For Display
            const postsArray = await posts.aggregate(
                [
                    {
                        '$lookup': {
                        'from': 'users', 
                        'localField': 'user_id', 
                        'foreignField': '_id', 
                        'as': 'user_details'
                        }
                    },
                    {
                        '$unwind': '$user_details'
                    }
                ]
            ).toArray();
            
            // Filter posts if there is a search
            let searchTerms = req.query.search;
            let searchPosts;
        
            if(!(searchTerms == undefined || searchTerms === "")){
                searchPosts = postsArray.filter((post) => {
                    let titleMatch = post.title.toLowerCase().includes(searchTerms.toLowerCase());
                    let descriptionMatch = post.description.toLowerCase().includes(searchTerms.toLowerCase());
        
                    return titleMatch || descriptionMatch;
                });
            } else {
                searchPosts = postsArray;
            }
            
            const searchDetails = { numPosts : searchPosts.length, search : searchTerms };
            console.log("search Detials: " + searchDetails);
        
            // Get dropdown links based on if user is logged in
            const dropdowns = getDropdownLinks(currentUser.username); 
            console.log("dropdown links: " + dropdowns);
        
            res.render("index", {
                pagetitle: "Home",
                user: currentUser,
                posts: searchPosts,
                dropdownLinks: dropdowns, // Navbar links 
                searchDetails: searchDetails
            });
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    },
    
    getLogin: async function (req, res) {
        // Dropdown links for navbar
        let currentUser = req.query.loggedIn;
        if(currentUser == null || currentUser === "" || currentUser == undefined) currentUser = "guest";
        const dropdowns = getDropdownLinks(currentUser);
        
        res.render("login", {
            pagetitle: "Login",
            dropdownLinks: dropdowns
        });

        console.log("page does not exist");
    }
}

export default controller;
*/