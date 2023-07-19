import { Router } from 'express';
import { getDb } from '../models/conn.js';

const profileRouter = Router();
const db = getDb();
const users = db.collection("users");
const posts = db.collection("posts");
const comments = db.collection("comments");


/*
profileRouter.get(["/profile", "/myprofile"], async (req, res) => { 
    // Current User's Profile
    
});
*/

// Edit Profile
profileRouter.get("/edit-profile", async (req, res) => {
    console.log("Request to edit profile received.");
    const user = await users.findOne({username: "manchae"}); // Just For Testing

    res.render("edit_profile", {
        pagetitle: "Edit Profile",
        user: user
    });
});

/*
// Update Profile
// put and patch do the same thing I think
profileRouter.put("/idkidk/:postId", async (req, res) => {
    const { postId } = req.params;
    const editedPostData = req.body;

    const editedPost = await posts.findOneAndUpdate(
      { _id: ObjectId(postId) },
      { $set: editedPostData },
      { returnOriginal: false }
    );

    res.json(updatedPost.value);
});
*/

profileRouter.get("/profile/:username", async (req, res) => {
    console.log("Request to " + req.params.username + "'s profile received.");
    
    let curr = req.query.loggedIn;

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
    });
});

export default profileRouter;