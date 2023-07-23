import { getDb } from '../models/db.js';

const db = getDb();

const users = db.collection("users");
const posts = db.collection("posts");
const comments = db.collection("comments");

const profileController = {
    
    // Edit Profile
    getEditProfile: async function (req, res) {
        console.log("Request to edit profile received.");
        let curr = req.query.loggedIn;
    
        try {
            if(curr == null) {
                curr = {username: "guest"};
            } else {
                curr = await users.findOne({username: curr});
            }

            const user = await users.findOne(req.params);
            res.render("edit_profile", {
                pagetitle: "Edit Profile",
                user: user
            })
        } catch (error) {
            console.error(err);
            res.sendStatus(500); // fix
        }
    },

    editProfile: async function (req,res) {
        console.log("Request to edit profile received.");
        // const { user, newUsername, newBio, newPFP } = req.body;
        const editData = req.body;

        try {
            db.collection('users').updateOne(
                { username: editData.currentUser },
                {
                  $set: {
                    username: editData.newUsername,
                    bio: editData.newBio,
                    // pfp: newPFP
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
                curr = {username: "guest"};
            } else {
                curr = await users.findOne({username: curr});
            }

            const currentUser = curr;
            const view_user = await users.findOne(req.params);
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
        
            console.log(postsArray);
            
            res.render("profile", {
                pagetitle: req.params.username + "'s Profile",
                user: currentUser,
                view_user: view_user,
                posts: postsArray,
                comments: commentsArray
            })
        } catch (error) {
            console.error(error);
            res.sendStatus(500); // fix
        }
    },

    /*
    profileRouter.get(["/profile", "/myprofile"], async (req, res) => { 
        // Current User's Profile
        
    });
    */
   ////////////////////////////////////////////////////////////


}

export default profileController;
