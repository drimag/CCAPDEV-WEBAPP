import { getDb } from '../models/db.js';

const db = getDb();

const users = db.collection("users");
const posts = db.collection("posts");
const comments = db.collection("comments");

const postController = {
    //////////////////////////////////////////
    // Delete Comment
    deleteComment: async function (req, res) {
        console.log("DELETE request received for /comment");
        console.log(req.body);
    
        try {
            const result = await comments.deleteOne({num: parseInt(req.body.id)});
    
            console.log(result);
            res.sendStatus(200);
    
        } catch (err) {
            console.error(err);
            res.sendStatus(500); // fix
        }
    },

    // Post Comment
    postComment: async function (req, res) {
        console.log("POST request received for /comment");
        console.log(req.body);
    
        try {
            const user = await users.findOne({username: req.query.loggedIn});
            console.log(user);
            const post = await posts.findOne({num: parseInt(req.body.id)});
            const size = await comments.countDocuments();
            console.log(post.comments_id);
        
            console.log("Number of Comments " + size);
            const result = await comments.insertOne({
                num: 1 + size,
                user_id: user._id,
                comment: req.body.comment,
                votes: 0,
                comments_id: [],
                edited: false
            });
    
            console.log(result);
            res.sendStatus(200);
        } catch (err) {
            console.error(err);
            res.sendStatus(500); // fix
        }
    },
   ////////////////////////////////////////////////////////////

    getPost: async function (req, res) {
        console.log("Request to post number " + req.params.postID + " received.");

        try {
            const post = await posts.findOne({ 
                num: { $eq: parseInt(req.params.postID) }
            });
    
            const author = await users.findOne({_id: post.user_id});
            const currentUser = await users.findOne({username: req.query.loggedIn});
            //const comment_list = await comments.find({_id: { $in: post }}).toArray();

            const commentsArray = await comments.aggregate(
                [
                    {
                        '$match': {
                            '_id': { '$in': post.comments_id }
                        }
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

            // view comments (nested) (prolly just store the replies itself inside instead of ids)

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
    },

    createPost: async function (req, res) {
        console.log("POST request received for /post");

        try {
            const user = await users.findOne({username: req.query.loggedIn}); // For Testing
            const size = await posts.countDocuments({});
            
            const result = await posts.insertOne({
                num: 1 + size,
                user_id: user._id,
                title: req.body.title,
                description: req.body.description,
                votes: 0,
                comments_id: [],
                edited: false
            });

            console.log(result);
            res.sendStatus(200);
        } catch (err) {
            console.error(err);
            res.sendStatus(500); // fix
        }
    },
    //////////////////////////////////////////

}

export default postController;