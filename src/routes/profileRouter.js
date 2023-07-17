import { Router } from 'express';
import { getDb } from '../models/conn.js';

const profileRouter = Router();
const db = getDb();
const users = db.collection("users");
const posts = db.collection("posts");

// Profile
/*
profileRouter.get("/profile", async (req, res) => { 
// Current User's Profile
    console.log("Request to profile received.");

    const user = await users.findOne(req.params);
    const postsArray = await posts.find({user: user._id}).toArray();
    
    res.render("profile", {
        user: currentUser?, // current user (seems redundant)
        posts: postsArray
    });
});

profileRouter.get("/myprofile", (req, res) => {
    res.redirect("/profile");
})
*/

// Edit Profile
profileRouter.get("/edit-profile", async (req, res) => {
    console.log("Request to edit profile received.");
    const user = await users.findOne({username: "manchae"}); // Just For Testing

    res.render("edit_profile", {
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
    const user = await users.findOne(req.params);
    const postsArray = await posts.aggregate(
        [
            { 
                $match: { user_id : user._id }
            },
            {
                '$lookup': {
                'from': 'users', 
                'localField': 'user_id ', 
                'foreignField': '_id', 
                'as': 'user_details'
                }
            }
        ]
    ).toArray();

    console.log(postsArray)
    
    res.render("profile", {
        user: user,
        posts: postsArray
    });
});


export default profileRouter;