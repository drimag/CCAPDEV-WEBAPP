const User = require('../models/User.js');
const Post = require('../models/Post.js');
const Comment = require('../models/Comment.js');

const voteController = {
    
    postVote: async function (req, res) {
        console.log("postVote called");
        const { type } = req.body;
        console.log("type is:",type);
        const { number } = req.body;
        console.log("number is",number);
        const { votes } = req.body;
        console.log("votes are:",votes);
        try {
			
			// Find the post by its ID
			if (type === "comment"){
				console.log("This is a comment");
				const comment = await Comment.findOne({ num: parseInt(number)}).exec();
				comment.votes = votes;
				await Comment.updateOne({num: parseInt(number) }, { $set: { votes } }).exec();
			}else{
				console.log("This is a post");
				const post = await Post.findOne({ num: parseInt(number)}).exec();

				// Update the vote count in the post document
				post.votes = votes;

				// Save the updated post back to the database
				await Post.updateOne({num: parseInt(number) }, { $set: { votes } }).exec();
				
			}
      
       	   	res.status(200).json({ message: 'Vote updated successfully' });
    
        } catch (error) {
        	console.error('Failed to update vote:', error);
          
        	res.status(500).json({ message: 'Failed to update vote' });
        }
    },

    getUserVotes: async function (req, res) {
		console.log("user vote getter called");

		let curr = req.session.user;
		console.log(curr);

		try {
			if(curr === "null" || curr === "guest" || curr == undefined || curr === "") {
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

			if(curr === "null" || curr === "guest" || curr == undefined || curr === "") 
				return res.status(400).send("No logged in user");

			if(newVotes.type === "comment") {
				try {
					console.log("changing comment votes");
					await Comment.updateOne(
						{ commentNum: newVotes.num },
						{$set:
							{ votes: newVotes.votes }
						}).then( result => {
                   			console.log("voting successful: " + result);
						}).catch(err => {
							res.status(500).send("Error voting");
							console.log("voting error: " + err);
						});
				} catch (error) { 
					console.error(error);
					res.sendStatus(500);
				}
				
			} else if(newVotes.type === "post") {
				try {
					console.log("changing post votes");
					await Post.updateOne(
						{ postNum: newVotes.num },
						{$set:
							{ votes: newVotes.votes }
						}).then( val => {
                   			console.log("voting successful: " + val);
						}).catch(err => {
							res.status(500).send("Error voting");
							console.log("voting error: " + err);
						});
				} catch (error) { 
					console.error(error);
					res.sendStatus(500);
				}
			}

			await User.updateOne(
                {username: curr},
                {$set: 
                    { 
						upvoteComments: newVotes.upvoteComments,
						downvoteComments: newVotes.downvoteComments,
						upvotePosts: newVotes.upvotePosts,
						downvotePosts: newVotes.downvotePosts
					}
                }).then( val => {
                    res.status(200).send("Votes updated successfully");
                    console.log("voting successful: " + val);
                }).catch(err => {
                    res.status(500).send("Error voting");
                    console.log("voting error: " + err);
            	});

		} catch (error) { 
			console.error(error);
            res.sendStatus(500);
		}
	}
}

module.exports = voteController;