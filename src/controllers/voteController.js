const User = require('../models/User.js');
const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');

const voteController = {

    getUserVotes: async function (req, res) {
		console.log("user vote getter called");

		let curr = req.session.user;
		console.log(curr);

		try {
			if(curr === null || curr === "guest" || curr == undefined || curr === "") {
				curr = await User.findOne({username: "guest"}).exec()
			}

			const votes = { 
				upvoteComments: curr.upvoteComments,  
				downvoteComments: curr.downvoteComments,
				upvotePosts: curr.upvotePosts,
				downvotePosts: curr.downvotePosts
			}

			console.log("sending this as user's votes': " + JSON.stringify(votes));
            res.send(votes);

        } catch (error) {
            console.error(error);
            res.sendStatus(500); 
        }
	}, 

	updateVotes: async function (req, res) {
		console.log("call to update votes received")

		let curr = req.session.user;
		let newVotes = req.body;

		console.log(newVotes.toString());

		try {
			if(!curr) return res.status(400).send("No logged in user");

			if(curr === null || curr.username === "guest" || curr == undefined || curr === "") 
				return res.status(400).send("No logged in user");

			if(newVotes.type === "comment") {
				try {
					console.log("changing comment votes");
					const response = await Comment.updateOne(
						{ commentNum: newVotes.num },
						{ votes: newVotes.votes }).exec();
						console.log(response);
					console.log("successful");
				} catch (error) { 
					console.error(error);
					res.sendStatus(500);
				}
				
			} else if(newVotes.type === "post") {
				try {
					console.log("changing post votes");
					await Post.updateOne(
						{ postNum: newVotes.num },
						{ votes: newVotes.votes }).exec();
						console.log("successful");
				} catch (error) { 
					console.error(error);
					res.sendStatus(500);
				}
			}

			await User.updateOne(
                {username: curr.username},
                {
					upvoteComments: newVotes.upvoteComments,
					downvoteComments: newVotes.downvoteComments,
					upvotePosts: newVotes.upvotePosts,
					downvotePosts: newVotes.downvotePosts
					
                }).exec();
			console.log("successful");
			const user = await User.findOne({username: curr.username});
			req.session.user = user;

		} catch (error) { 
			console.error(error);
            res.sendStatus(500);
		}
	}
}

module.exports = voteController;