const User = require('../models/User.js');
const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');

const getDropdownLinks = require('../middleware/navDropdown.js');

async function findReplies(comment) {
    let replies = await Comment.find({parent_id: comment._id})
    .populate({path: 'user_id'})
    .lean().exec();

    if (replies.length > 0) {
        comment.replies = replies;
        for (const reply of comment.replies) {
            await findReplies(reply);
        }
    }
  }

const postController = {
    /*
            This function checks if the post exists.
    */
    getCheckPost: async function (req, res) {
        const postNum = req.query.postNum;

        const foundData = await Post.findOne({postNum: postNum}).exec();

        // console.log(foundData);

        if (foundData) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    },

    /*
            This displays 'view_post.hbs' with the post clicked.
    */
    getViewPost: async function (req, res) {
        const postNum = req.query.postNum;
        const loggedInUser = req.session.user;
        loggedInUser.pfp.data = Buffer.from(req.session.user.pfp.data, 'base64');

        // Get Current User
        const foundData = await Post.findOne({postNum: postNum}).lean().exec();
        // console.log(foundData);

        if (foundData) {
            // Display Post
            console.log("Post Exists");

            const author = await User.findOne({_id: foundData.user_id}).lean().exec();
            
            // Get Comments Level 1
            const comments = await Comment.find({post_id: foundData._id, parent_id: null})
            .populate({ path: 'user_id'})
            .lean().exec();

            for(const comment of comments) {
                await findReplies(comment);
            }

            /*
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
            */

            // Dropdown links for navbar
            const dropdowns = getDropdownLinks(loggedInUser);

            res.render("view_post", {
                pagetitle: "View Post",
                user: loggedInUser,
                author: author,
                post: foundData,
                comments: comments,
                dropdownLinks: dropdowns
            });
        } else {
            res.status(404).json("Post does not exist");
        }
    },

    /*
            This function adds a post to the database
    */
    createPost: async function (req, res) {
        const loggedIn = req.session.user;
        loggedIn.pfp.data = Buffer.from(req.session.user.pfp.data, 'base64');

        // console.log(req.body);

        const postNums = await Post.find({}).distinct("postNum").exec();
        const newPost = new Post ({
            postNum: postNums[postNums.length - 1] + 1,
            user_id: loggedIn._id,
            title: req.body.title,
            description: req.body.description,
            image: 
            {
                data: req.body.imagedata,
                contentType: req.body.imagetype
            }
        });
        
        if (loggedIn) {
            try {
                const result = await newPost.save();
                console.log("Post Successful");
                // console.log(result);
                res.sendStatus(200);
            } catch (error) {
                console.log("Post Unsuccessful");
                console.error(error);
                res.sendStatus(500);
            }
        } else {
            console.log("User logged in does not exist");
            res.status(404).json("User Not Found");
        }
    },

    /*
            This function edits a post in the database
    */
    editPost: async function (req, res) {
        //console.log(req.body);
        
        const foundData = await Post.findOne({postNum: req.body.postNum}).exec();
        //console.log(foundData);
        console.log("found");
    
        if (foundData) {
            try {
                const edited_title = req.body.title;
                const edited_description = req.body.description;
                const edited_image = {
                    data: req.body.imagedata,
                    contentType: req.body.imagetype
                }
                
                if (edited_image.data === undefined) {
                    // No image
                    if(edited_title === foundData.title && edited_description === foundData.description) {
                        // No change
                        console.log("No change in title and description");
                    } else {
                        const result = await Post.updateOne({postNum: req.body.postNum},
                            {title: edited_title, 
                                description: edited_description,
                                edited: true});
                        const result2 = await Post.updateOne({postNum: req.body.postNum},
                            {$unset: { "image": ""}});
                        console.log("Update Successful");
                        // console.log(result);
                    }
                } else {
                    // TODO: add image
                    const result = await Post.updateOne({postNum: req.body.postNum},
                            {title: edited_title, 
                                description: edited_description, 
                                image: edited_image,
                                edited: true});
                    console.log("Update Successful");
                    // console.log(result);
                }
                res.sendStatus(200);
            } catch (error) {
                console.error(error);
                res.sendStatus(500);
            }
        } else {
            res.status(404).json("Post Not Found");
        }
    },
    
    /*
            This function deletes a post in the database
    */
    deletePost: async function (req, res) {
        const postNum = req.body.postNum;
        console.log(req.body);
        
        try {
            const result = await Post.deleteOne({postNum: postNum}).exec();
            console.log("Delete Successful.");
            console.log(result);
            res.sendStatus(200);
        } catch (err) {
            console.log("Delete Unsuccessful.");
            console.error(err);
            res.sendStatus(500);
        }
        
    },

    /*
            This function adds a comment to the database and updates
            the post document's number of comments
    */
    createComment: async function (req, res) {
        console.log(req.body);
        // const postNum = req.body.id;

        const loggedIn = req.session.user;
        loggedIn.pfp.data = Buffer.from(req.session.user.pfp.data, 'base64');
        console.log(loggedIn);

        const post = await Post.findOne({postNum: req.body.postNum}).exec();
        
        // Could remove this with the session thing
        if (loggedIn && post) {
            try {
                const commentNums = await Comment.find({}).distinct("commentNum");
                const newComment = new Comment ({
                    commentNum: commentNums[commentNums.length - 1] + 1,
                    user_id: loggedIn._id,
                    post_id: post._id,
                    comment: req.body.comment
                });

                const result = await newComment.save();
                // update num of comments count
                await Post.updateOne({postNum: req.body.postNum}, {$inc: {num_comments: 1}}).exec();
                console.log("Comment Successful");
                console.log(result);
                res.sendStatus(200);
            } catch (error) {
                console.log("Comment Unsuccessful");
                console.error(error);
                res.sendStatus(500);
            }
        } else {
            console.log("User logged in does not exist");
            res.status(404).json("User Not Found");
        }
    },

    /*
            This function edits a comment in the database
    */
    editComment: async function (req, res) {
        console.log(req.body);
        
        const foundData = await Comment.findOne({commentNum: req.body.commentNum}).exec();
        console.log(foundData);
    
        if (foundData) {
            try {
                const edited_comment = req.body.comment;

                if(edited_comment === foundData.comment) {
                    // No change in comment
                    console.log("No change in comment");
                } else {
                    const result = await Comment.updateOne({commentNum: req.body.commentNum},
                        {comment: edited_comment, edited: true}).exec();
                    
                    console.log("Update Successful");
                    console.log(result);
                }
                res.sendStatus(200);
            } catch (error) {
                console.error(error);
                res.sendStatus(500);
            }
        } else {
            res.status(404).json("Comment Not Found");
        }
    },
            
    /*
            This function deletes a comment in the database
    */
    deleteComment: async function (req, res) {
        console.log(req.body);
        const commentNum = req.body.commentNum;
        
        try {
            const comment = await Comment.findOne({commentNum: commentNum});
            const result = await Comment.deleteOne({commentNum: commentNum});

            if (comment.parent_id == null) {
                // updates count of post
                await Post.updateOne({_id: comment.post_id}, {$inc: {num_comments: -1}}).exec();
            } else {
                // updates count of comment
                await Comment.updateOne({_id: comment.parent_id}, {$inc: {num_comments: -1}}).exec();
            }
            console.log("Delete Successful");
            console.log(result);
            res.sendStatus(200);
    
        } catch (err) {
            console.log("Delete Unsuccessful");
            console.error(err);
            res.sendStatus(500);
        }
    },

    /*
            This function adds a comment to the database and updates
            the replied to comment document's number of comments
    */
    createReply: async function (req, res) {
        console.log(req.body);

        const loggedIn = req.session.user;
        loggedIn.pfp.data = Buffer.from(req.session.user.pfp.data, 'base64');
        console.log(loggedIn);

        const post = await Post.findOne({postNum: req.body.postNum}).exec();
        const comment = await Comment.findOne({commentNum: req.body.commentNum}).exec();
        
        // Could remove this with the session thing
        if (loggedIn && post && comment) {
            try {
                const commentNums = await Comment.find({}).distinct("commentNum");
                const newComment = new Comment ({
                    commentNum: commentNums[commentNums.length - 1] + 1,
                    user_id: loggedIn._id,
                    post_id: post._id,
                    parent_id: comment._id,
                    comment: req.body.comment
                });

                const result = await newComment.save();
                // update num of comments count
                await Comment.updateOne({commentNum: req.body.commentNum}, {$inc: {num_comments: 1}}).exec();
                console.log("Reply Successful");
                console.log(result);
                res.sendStatus(200);
            } catch (error) {
                console.log("Reply Unsuccessful");
                console.error(error);
                res.sendStatus(500);
            }
        } else {
            console.log("User logged in does not exist");
            res.status(404).json("User does not exist");
        }
    },

    getCommentPostNum: async function (req, res) {
        console.log(req.body);

        const comment = await Comment.findOne({commentNum: req.query.commentNum}).exec();
        const post = await Post.findOne({_id: comment.post_id}).exec();

        if (comment && post) {
            const data = {
                postNum: post.postNum
            }

            res.json(data);
        } else {
            res.status(404).json("Does not exist");
        }
    }
}

module.exports = postController;