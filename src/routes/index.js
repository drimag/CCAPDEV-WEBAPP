import { Router } from 'express';
import { getDb } from '../models/conn.js';

const router = Router();
const db = getDb();
const users = db.collection("users");
const posts = db.collection("posts");

// HomePage
router.get("/", async (req, res) => {
    console.log("Request to home received.");

    try {
        // Just for Testing
        const user = await users.findOne({username: "manchae"});

        // TODO: How to get the object ids of each post?
        const postsArray = await posts.aggregate(
            [
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
        
        res.render("index", {
            pagetitle: "Home",
            user: user,
            posts: postsArray
        });
        
    } catch (err) {
        console.log("An error has occured: ");
        console.log(err);
    }
});


// HomePage
router.get("/home", (req, res) => {
    res.redirect("/");
});


// Profile
// router.get("/profile", async (req, res) => { }) // Current User's Profile

router.get("/profile/:username", async (req, res) => {
    console.log("Request to " + req.params.username + "'s profile received.");
    try {
        const user = await users.findOne(req.params);
        const postsArray = await posts.find({user: user._id}).toArray();

        res.render("profile", {
            user: user,
            posts: postsArray
        });
    } catch (err) {
        console.log("An error has occured: ");
        console.log(err);
    }

});


export default router;