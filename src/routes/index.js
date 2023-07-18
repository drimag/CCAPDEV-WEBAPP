import { Router } from 'express';
import { getDb } from '../models/conn.js';
import profileRouter from '../routes/profileRouter.js';
import postRouter from '../routes/postRouter.js';

const router = Router();
const db = getDb();
const users = db.collection("users");
const posts = db.collection("posts");

// HomePage
router.get(["/", "/home", "/homepage"], async (req, res) => {
    console.log("Request to home received.");

    let currentUser = req.query.loggedIn;
    console.log("Current User: " + currentUser);

    if(currentUser == null || currentUser === "guest") {
        currentUser = { username: "guest" };
    } else {
        currentUser = await users.findOne({username: req.query.loggedIn});
    }

    console.log("Current User: " + currentUser);

    // Get Posts For Display
    // TODO: Limit Posts to 15-20 for guest and for users add a show more button
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
        user: currentUser,
        posts: postsArray
    });
});

router.use(profileRouter);
router.use(postRouter);


// TODO: Error 404 Page
router.use((req, res) => {
    res.send("error");
});

export default router;