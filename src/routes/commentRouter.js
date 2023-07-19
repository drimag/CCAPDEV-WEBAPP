import { Router } from 'express';
import { getDb } from '../models/conn.js';

const commentRouter = Router();
const db = getDb();
const users = db.collection("users");
const posts = db.collection("posts");
const comments = db.collection("comments");

commentRouter.post("/comment", async (req, res) => {
    console.log("POST request received for /comment");
    console.log(req.body);

    const user = await users.findOne({username: req.query.loggedIn});
    console.log(user);
    const post = await posts.findOne({num: parseInt(req.body.id)});
    console.log(post);

    const size = await comments.countDocuments({});
    console.log("Number of Comments " + size);
    try {
        const result = await comments.insertOne({
            num: 1 + size,
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

export default commentRouter;