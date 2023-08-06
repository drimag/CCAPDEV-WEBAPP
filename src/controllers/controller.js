const User = require('../models/User.js');
const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');
const getDropdownLinks = require('../middleware/navDropdown.js');

const controller = {

    getCheckUser: async function (req, res) {
        const username = req.query.username;

        const foundData = await User.findOne({username: username}).exec();

        if (foundData) {
            res.sendStatus(200);
        } else {
            res.sendStatus(400);
        }
    },
    /*
            This displays 'index.hbs' with all posts in the database.
    */
    getHome: async function (req, res) {
        console.log('getHome received');

        let loggedIn = await User.findOne({username: req.query.loggedIn}).lean().exec();
        
        if(!loggedIn) {
            // only guest (does not include if the username doesnt exist)
            loggedIn = await User.findOne({username: "guest"}).lean().exec();
        }
        
        const posts = await Post.find({}).populate({
            path: 'user_id'
        }).lean().exec();

        // Filter posts if there is a search
            let searchTerms = req.query.search;
            let searchPosts;
        
            if(!(searchTerms == undefined || searchTerms === "")){
                searchPosts = posts.filter((post) => {
                    let titleMatch = post.title.toLowerCase().includes(searchTerms.toLowerCase());
                    let descriptionMatch = post.description.toLowerCase().includes(searchTerms.toLowerCase());
        
                    return titleMatch || descriptionMatch;
                });
            } else {
                searchPosts = posts;
            }
            
            const searchDetails = { numPosts : searchPosts.length, search : searchTerms };
            console.log("search Detials: " + searchDetails);
        
        // Get dropdown links based on if user is logged in
        const dropdowns = getDropdownLinks(loggedIn.username); 

        res.render('index', {
            pagetitle: "Home",
            user: loggedIn,
            posts: searchPosts,
            dropdownLinks: dropdowns, // Navbar links 
            searchDetails: searchDetails
        });
    },

    /*
            This displays 'profile.hbs' of a user.
    */
    getProfile: async function (req, res) {
        let loggedIn = await User.findOne({username: req.query.loggedIn}).lean().exec();
        const view_user = await User.findOne({username: req.params.username}).lean().exec();

        if (!loggedIn) {
            loggedIn = await User.findOne({username: "guest"}).lean().exec();
        } 

        if (view_user) {
            // User Exists
            try {
                const posts = await Post.find({user_id: view_user._id}).populate({
                    path: 'user_id'
                }).lean().exec();
    
                const comments = await Comment.find({user_id: view_user._id}).populate({
                    path: 'user_id'
                }).lean().exec();

                // Dropdown links for navbar
                const dropdowns = getDropdownLinks(loggedIn.username);

                res.render("profile", {
                    pagetitle: req.params.username + "'s Profile",
                    user: loggedIn,
                    view_user: view_user,
                    posts: posts,
                    comments: comments,
                    dropdownLinks: dropdowns
                });
            } catch (error) {
                console.error(error);
                res.sendStatus(500);
            }

        } else {
            // No user found
            res.status(404).json("User Not Found");
        }
    },

    /*
            TODO: This displays 'edit_profile.hbs' of a user.
    */
    getEditProfile: async function(req, res) {
        const loggedIn = await User.findOne({username: req.query.loggedIn}).lean().exec();

        if (loggedIn && loggedIn.username != "guest") {
            // Dropdown links for navbar
            const dropdowns = getDropdownLinks(loggedIn.username); 

            res.render("edit_profile", {
                pagetitle: "Edit Profile",
                user: loggedIn,
                dropdownLinks: dropdowns
            });
        } else {
            // User does not exist
            res.status(404).json("User Not Found");
        }
    },

    /*
            This function edits a user profile in the database
    */
    editProfile: async function (req, res) {
        console.log("Request to edit profile contents received.");
        const editData = req.body;

        if( !((editData.newUsername.length < 20) && (editData.newUsername.length > 0)) ||
            editData.newBio.length > 160 ){
            res.sendStatus(403);
        } else {
            try {
                const result = await User.updateOne({
                    username: editData.currentUser
                },
                {
                    username: editData.newUsername,
                    bio: editData.newBio,
                    pfp: 
                    {
                        data: editData.newPFPdata,
                        contentType: editData.newPFPtype
                    }
                    
                }).exec();

                console.log("Edit Profile Update Successful");
                res.sendStatus(200);
            } catch (err) {
                console.log("Edit Profile Update Unsuccessful");
                console.error(err);
                res.sendStatus(500);
            }
        }
    }
}

module.exports = controller;
