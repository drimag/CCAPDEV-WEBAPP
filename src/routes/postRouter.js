import { Router } from 'express';
import { getDb } from '../models/conn.js';

const postRouter = Router();
const db = getDb();
const users = db.collection("users");
const posts = db.collection("posts");
const comments = db.collection("comments");


// TODO: Redirect to login if logged in is guest!

// TODO: Fix Status Codes

// postRouter.get("/post") 

// Get a Post ( add /:username?/ if possible)
postRouter.get("/posts/:postID", async(req, res) => {
    console.log("Request to post number " + req.params.postID + " received.");

    const post = await posts.findOne({ 
        num: { $eq: parseInt(req.params.postID) }
    });

    const author = await users.findOne({_id: post.user_id});
    const currentUser = await users.findOne({username: req.query.loggedIn});

    try {
        const commentsArray = await comments.aggregate(
            [
                { 
                    $match: {post_id: post._id}
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

        console.log(commentsArray);

        // view comments (nested)

        let data = {
            pagetitle: "View Post",
            user: currentUser,
            author: author,
            post: post,
            comments: commentsArray
        }
    
        res.render("view_post", data);

    } catch (err) {
        console.error(err);
        res.status(404); // fix
    }
});

postRouter.post("/post", async (req, res) => {
    console.log("POST request received for /post");

    const user = await users.findOne({username: req.query.loggedIn}); // For Testing
    const size = await posts.countDocuments({});

    try {
        const result = await posts.insertOne({
            num: 1 + size,
            user_id: user._id,
            title: req.body.title,
            description: req.body.description,
            votes: 0,
            num_comments: 0,
            edited: false
        });

        console.log(result);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500); // fix
    }
});


postRouter.post("/posts/:postID/comment", async (req, res) => {
    console.log("POST request received for /comment");
    console.log(req.body);

    const user = await users.findOne({username: req.query.loggedIn});
    console.log(user);
    const post = await posts.findOne({num: parseInt(req.body.id)});
    console.log(post);
    
    try {
        const result = await comments.insertOne({
            user_id: user._id,
            post_id: post._id,
            comment: req.body.comment,
            votes: 0,
            num_comments: 0,
            comments_id: [],
            edited: false
        });


        // update post document

        console.log(result);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500); // fix
    }
});

export default postRouter;