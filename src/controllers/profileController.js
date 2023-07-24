import { getDb } from '../models/db.js';
import { getDropdownLinks } from '../middleware/navDropdown.js';

const db = getDb();

const users = db.collection("users");
const posts = db.collection("posts");
const comments = db.collection("comments");

const profileController = {
    
    // Edit Profile
    getEditProfile: async function (req, res) {
        console.log("Request to edit profile page received.");
        let curr = req.query.loggedIn;
        console.log(curr);
    
        try {
            // No login param in url
            if(!curr) return res.status(400).send("No logged in user");

            // Look for user with matching username
            const user = await users.findOne({username: curr});

            // User does not exist
            if(!user) return res.status(404).send("ERROR 404. User not found");

            // Dropdown links for navbar
            const dropdowns = getDropdownLinks(user.username); 

            res.render("edit_profile", {
                pagetitle: "Edit Profile",
                user: user,
                dropdownLinks: dropdowns
            });
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },

    editProfile: async function (req,res) {
        console.log("Request to edit profile contents received.");
        const editData = req.body;

        console.log("what " + editData.newUsername);
        console.log(editData.newBio);
        console.log(editData.newPFPdata);
        console.log(editData.newPFPtype);

        try {
            db.collection('users').updateOne(
                { username: editData.currentUser },
                {
                  $set: {
                    username: editData.newUsername,
                    bio: editData.newBio,
                    pfp: 
                    {
                        data: editData.newPFPdata,
                        contentType: editData.newPFPtype
                    }
                  },
                }
              )

            res.sendStatus(200);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    },

    getProfile: async function (req, res) {
        console.log("Request to " + req.params.username + "'s profile received.");
        
        let curr = req.query.loggedIn;
    
        try {

            if(curr == null) {
                curr = await users.findOne({username: "guest"});
            } else {
                curr = await users.findOne({username: curr});
            }
            
            const currentUser = curr;
            const view_user = await users.findOne(req.params);

            if(!view_user) return res.status(404).send("ERROR 404. Profile not found");

            const postsArray = await posts.aggregate(
                [
                    { 
                        $match: { user_id : view_user._id }
                    },
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
        
            const commentsArray = await comments.aggregate(
                [
                    { 
                        $match: { user_id : view_user._id }
                    },
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
            
            const updatedPostsArray = postsArray.map((element) => ({
                ...element,
                currentUser: currentUser.username
              }));
            console.log(updatedPostsArray);

            const updatedArray = commentsArray.map((element) => ({
                ...element,
                currentUser: currentUser.username
              }));
            console.log(updatedArray);

            console.log(postsArray);
            
            // Dropdown links for navbar
            const dropdowns = getDropdownLinks(currentUser.username);

            res.render("profile", {
                pagetitle: req.params.username + "'s Profile",
                user: currentUser,
                view_user: view_user,
                posts: updatedPostsArray,
                comments: updatedArray,
                dropdownLinks: dropdowns
            })
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },

    getMyProfile: async function (req, res) {
        console.log("Request to profile received.");
        
        let curr = req.query.loggedIn;
    
        try {
            if(curr == null) {
                curr = await users.findOne({username: "guest"});
            } else {
                curr = await users.findOne({username: curr});
            }

            const currentUser = curr;
            const view_user = curr;
            const postsArray = await posts.aggregate(
                [
                    { 
                        $match: { user_id : view_user._id }
                    },
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

            
            const updatedPostsArray = postsArray.map((element) => ({
                ...element,
                currentUser: currentUser.username
              }));
            console.log(updatedPostsArray);
        
            const commentsArray = await comments.aggregate(
                [
                    { 
                        $match: { user_id : view_user._id }
                    },
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
            const updatedArray = commentsArray.map((element) => ({
                ...element,
                currentUser: currentUser.username
              }));

            console.log(postsArray);
            
            // Dropdown links for navbar
            const dropdowns = getDropdownLinks(currentUser.username);
            
            res.render("profile", {
                pagetitle: currentUser.username + "'s Profile",
                user: currentUser,
                view_user: view_user,
                posts: updatedPostsArray,
                comments: updatedArray,
                dropdownLinks: dropdowns
            })
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }
}

export default profileController;