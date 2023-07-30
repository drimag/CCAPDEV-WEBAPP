const User = require('../models/User.js');
const Post = require('../models/Post.js');

const postController = {
    /*
            This function checks if the post exists.
    */
    getCheckPost: async function (req, res) {
        const postNum = req.query.postNum;

        const foundData = Post.findOne({postNum: postNum});

        console.log(foundData);

        if (foundData) {
            res.sendStatus(200);
        } else {
            res.sendStatus(400);
        }
    },

    /*
            This displays 'view_post.hbs' with the post clicked.
    */
    getViewPost: async function (req, res) {
        const postNum = req.query.postNum;
        const loggedInUser = req.query.loggedIn;

        // Get Current User
        const loggedIn = await User.findOne({username: loggedInUser}).lean().exec();
        
        // Populate Comments
        const foundData = await Post.findOne({postNum: postNum}).lean().exec();

        if (foundData) {
            // Display Post
            console.log("Post Exists");

            const author = await User.findOne({_id: foundData.user_id}).lean().exec();

            res.render("view_post", {
                pagetitle: "View Post",
                user: loggedIn,
                author: author,
                post: foundData,
                //comments: updatedArray,
                //dropdownLinks: dropdowns
            });
        } else {
            // Post not found
        }
    },


    /*
            This function adds a post to the database
    */
    createPost: async function (req, res) {
        const loggedIn = req.query.loggedIn;
        const loggedInUser = await User.findOne({username: loggedIn}).exec();

        console.log(req.body);

        const postNums = await Post.find({}).distinct("postNum");
        const newPost = new Post ({
            postNum: postNums[postNums.length - 1] + 1,
            user_id: loggedInUser._id,
            title: req.body.title,
            description: req.body.description
        });

        // Could remove this with the session thing
        if (loggedInUser) {
            try {
                const result = await newPost.save()
                console.log("Post Successful");
                console.log(result);
                res.sendStatus(200);
            } catch (error) {
                console.log("Post Unsuccessful");
                console.error(error);
                res.sendStatus(500);
            }
        } else {
            console.log("User logged in does not exist");
        }
    },

    /*
            This function edits a post in the database
    */
    editPost: async function (req, res) {

    },
    
    /*
            This function deletes a post in the database
    */
    deletePost: async function (req, res) {

    },
}

module.exports = postController;

/*
import { getDb } from '../models/db.js';
import { getDropdownLinks } from '../middleware/navDropdown.js';

const db = getDb();

const users = db.collection("users");
const posts = db.collection("posts");
const comments = db.collection("comments");

const postController = {
    
    postReply: async function (req, res) {
        console.log("PUT request received for /comment/reply");
        console.log(req.body);

        const loggedIn = req.body.loggedIn;
        const commentNum = req.body.num;
        const reply = req.body.reply;
        console.log("commentNum" + commentNum);

        try {
            const user = await users.findOne({username: loggedIn});
            const data = {
                user_details: {
                    _id: user._id,
                    username: user.username,
                    pfp: user.pfp
                },
                comment: reply,
                votes: 0,
                edited: false
            }

            const comment = await comments.findOne({num: parseInt(commentNum)});
            console.log("Comment Found");
            console.log(comment);
            const result = await comments.updateOne(comment, 
                {
                    $inc: {num_comments: 1},
                    $push: {comments_id: data}
                })
            
            // Dropdown links for navbar
            if(loggedIn == null || loggedIn === "" || loggedIn == undefined) loggedIn = "guest";
            let dropdowns = getDropdownLinks(loggedIn);
            
            console.log("Result:" + result);
            res.render("view_post", { dropdownLinks: dropdowns });
            res.sendStatus(200);
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
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
            console.log(post.comments_id);
            
            // Get all "nums" in comments
            const num_array = await comments.distinct("num");
            const last_num = num_array[num_array.length - 1];
            console.log(last_num);
            
            const result = await comments.insertOne({
                num: last_num + 1,
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
            res.sendStatus(500);
        }
    },

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
            res.sendStatus(500);
        }
    },

    // Edit Comment
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
            
            // Dropdown links for navbar
            if(loggedIn == null || loggedIn === "" || loggedIn == undefined) loggedIn = "guest";
            let dropdowns = getDropdownLinks(loggedIn);
            
            console.log("Result:" + result);
            res.render("view_post", { dropdownLinks: dropdowns });
            res.sendStatus(200);
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },
    

    findPostNum: async function (req, res) {
        console.log("Request to find Post Num received.");
        console.log(req.params);
        try {
            const comment = await comments.findOne({num: parseInt(req.params.commentNum)});
            console.log(comment);
            const post = await posts.findOne({comments_id: comment._id});
            const postNum = post.num;
            
            res.json({postNum});
            //res.sendStatus(200);
        } catch(error) {
            console.error(error);
            //res.sendStatus(404);
        }
    },

    getPost: async function (req, res) {
        console.log("Request to post number " + req.params.postID + " received.");
        console.log(req.query.params);
        try {
            let post = await posts.findOne({ 
                num: { $eq: parseInt(req.params.postID) }
            });

            // Post does not exist
            if(!post) return res.status(404).send("ERROR 404. Post not found");
            
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
                    res.sendStatus(404);
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
            
            // Dropdown links for navbar
            let dropdowns = getDropdownLinks(currentUser.username);

            let data = {
                pagetitle: "View Post",
                user: currentUser,
                author: author,
                post: post,
                comments: updatedArray,
                dropdownLinks: dropdowns
            }
        
            res.render("view_post", data);

        } catch (err) {
            console.error(err);
            res.status(404);
        }
    },

    createPost: async function (req, res) {
        console.log("POST request received for /post");

        try {
            const user = await users.findOne({username: req.query.loggedIn});

            // Get all "nums" in posts
            const num_array = await posts.distinct("num");
            const last_num = num_array[num_array.length - 1];
            console.log(last_num);

            const result = await posts.insertOne({
                num: last_num + 1,
                user_id: user._id,
                title: req.body.title,
                description: req.body.description,
                num_comments: 0,
                votes: 0,
                comments_id: [],
                edited: false
            });

            console.log(result);
            res.sendStatus(200);
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    },

    editPost: async function (req, res) {
        console.log("PUT Request received for /post");
        console.log(req.body);

        const loggedIn = req.body.loggedIn;
        const postNum = req.body.num;
        const edited_title = req.body.title;
        const edited_description = req.body.description;
        console.log("postNum" + postNum);

        try {
            const post = await posts.findOne({num: parseInt(postNum)});
            console.log("Post Found");
            console.log(post);
            const result = await posts.updateOne(post, 
                {
                    $set: {title: edited_title, description: edited_description, edited: true}
                });

            // Dropdown links for navbar
            if(loggedIn == null || loggedIn === "" || loggedIn == undefined) loggedIn = "guest";
            let dropdowns = getDropdownLinks(loggedIn);
            
            console.log("Result:" + result);
            res.render("view_post", { dropdownLinks: dropdowns });
            res.sendStatus(200);
        } catch (error) {
            console.error(err);
            res.sendStatus(500);
        }
    },

    deletePost: async function (req, res) {
        console.log("DELETE request received for /post");
        console.log(req.body);
    
        try {
            const result = await posts.deleteOne({num: parseInt(req.body.id)});
    
            console.log(result);
            res.sendStatus(200);
    
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    },


    updatePostCommentList: async function(req, res) {
        console.log("PUT request received for /post/addedcomment");
        console.log(req.body);

        try {
            console.log("Entered")
            const post = await posts.findOne({num: parseInt(req.body.id)});
            const comment = await comments.findOne({}, {sort:{$natural:-1}})
            
            console.log("POST");
            console.log(post);
            console.log("COMMENT");
            console.log(comment);
            
            const result = await posts.updateOne(post, 
                {
                    $inc: {num_comments: 1},
                    $push: {comments_id: comment._id}
                }
            )
                
            console.log(result);
            res.sendStatus(200);

        } catch(error) {
            console.error(error);
            res.status(500);
        }
    },

    updateRemovedComment: async function(req, res) {
        console.log("PUT request received for /post/removecomment");
        console.log(req.body);

        try {
            console.log("Entered")
            const post = await posts.findOne({num: parseInt(req.body.postNum)});
            const comment = await comments.findOne({num: parseInt(req.body.id)});

            const result = await posts.updateOne(post, 
                {
                    $inc: {num_comments: -1},
                    $pull: {comments_id: comment._id}
                }
            )
        
            console.log(result);
            res.sendStatus(200);

        } catch(error) {
            console.error(error);
            res.status(500);
        }
    }
}

export default postController;
*/