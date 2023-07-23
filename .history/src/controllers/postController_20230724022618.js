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
        console.log(req.query.params);
        try {
            let post = await posts.findOne({ 
                num: { $eq: parseInt(req.params.postID) }
            });

            if(req.query.title == null) {
                console.log('No Title Given');
            } else {
                console.log(decodeURIComponent(req.query.title));
                console.log("Title Given. Checking if correct");
                post = await posts.findOne({ 
                    num: { $eq: parseInt(req.params.postID) }, 
                    title: decodeURIComponent(req.query.title)
                });  
                
                // Title does not match postNum (post doesnt exist)
                if(post === null) {
                    res.sendStatus(500); // fix idk whats the status code for this
                }
            }
    
            const author = await users.findOne({_id: post.user_id});
            const currentUser = await users.findOne({username: req.query.loggedIn});

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
                    },
                    {
                        '$unwind': '$user_details'
                    }
                ]
            ).toArray();
            
            console.log(commentsArray);

            const updatedArray = commentsArray.map((element) => ({
                ...element,
                author: author.username,
                currentUser: currentUser.username
              }));
            console.log(updatedArray);

            // view comments (nested) (prolly just store the replies itself inside instead of ids)

            let data = {
                pagetitle: "View Post",
                user: currentUser,
                author: author,
                post: post,
                comments: updatedArray
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
                num_comments: 0,
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

    updatePostCommentList: async function(req, res) {
        console.log("PUT request received for /post/addedcomment");
        console.log(req.body);
        //req.params.postID
        // req.body

        try {
            console.log("Entered")
            const post = await posts.findOne({num: parseInt(req.body.id)});
            const comment = await comments.find().sort({num:1}).limit(2)
            console.log("POST");
            console.log(post);
            console.log("COMMENT");
            console.log(comment);
            
            const result = await posts.updateOne(post, 
                {
                    $set: {num_comments: post.num_comments + 1},
                    $push: {comments_id: comment._id}
                }
            )
            
            console.log(result);
            res.sendStatus(200);

        } catch(error) {
            console.error(error);
            // add status 
        }
    },

    updateRemovedComment: async function(req, res) {
        console.log("PUT request received for /post/removecomment");
        console.log(req.body);
        //req.params.postID
        // req.body

        try {
            console.log("Entered")
            const post = await posts.findOne({num: parseInt(req.body.postNum)});
            const comment = await comments.findOne({num: parseInt(req.body.id)});

            const result = await posts.updateOne(post, 
                {
                    $set: {num_comments: post.num_comments - 1},
                    $pull: {comments_id: comment._id}
                }
            )
        
            console.log(result);
            res.sendStatus(200);

        } catch(error) {
            console.error(error);
            // add status 
        }
    },

    editComment: async function (req, res) {
        console.log("PUT Request received for /comment");
        console.log(req.body);

        const loggedIn = req.body.loggedIn;
        const commentNum = req.body.num;
        const edited_comment = req.body.comment;
        console.log("commentNum" + commentNum);

        try {
            const comment = await comments.findOne({num: parseInt(commentNum)});
            console.log("Comment Found");
            console.log(comment);
            const result = await comments.updateOne(comment, 
                {
                    $set: {comment: edited_comment, edited: true}
                })
            
            console.log("Result:" + result);
            res.sendStatus(200);
        } catch (error) {

        }
    }
}

export default postController;