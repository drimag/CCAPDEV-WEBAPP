import { getDb } from '../models/db.js';

const db = getDb();

const users = db.collection("users");
const posts = db.collection("posts");
const comments = db.collection("comments");

const voteController = {
    
    postVote: async function (req, res) {
        console.log("votecontroller called");
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
				const comment = await comments.findOne({ num: parseInt(number)});
				comment.votes = votes;
				await comments.updateOne({num: parseInt(number) }, { $set: { votes } });
			}else{
				console.log("This is a post");
				const post = await posts.findOne({ num: parseInt(number)});

				// Update the vote count in the post document
				post.votes = votes;

				// Save the updated post back to the database
				await posts.updateOne({num: parseInt(number) }, { $set: { votes } });
				
			}
      
       	   	res.status(200).json({ message: 'Vote updated successfully' });
    
        } catch (error) {
        	console.error('Failed to update vote:', error);
          
        	res.status(500).json({ message: 'Failed to update vote' });
        }
    },

    getUserVotes: async function (req, res) {
		console.log("user vote getter called");

		let curr = req.query.loggedIn;
		console.log(curr);

		try {
			if(curr === "null" || curr === "guest" || curr == undefined || curr === "") {
				curr = await users.findOne({username: "guest"});
			} else {
				curr = await users.findOne({username: curr});
			}

			const votes = { 
				upvoteComments: curr.upvoteComments,  
				downvoteComments: curr.downvoteComments,
				upvotePosts: curr.upvotePosts,
				downvotePosts: curr.downvotePosts
			}

			console.log("sending this as user's votes': " + votes);
            res.send(votes);

        } catch (error) {
            console.error(error);
            res.sendStatus(500); 
        }
	}, 

	updateVotes: async function (req, res) {
		console.log("call to update votes received")

		let curr = req.query.loggedIn;
		let newVotes = req.body;

		console.log(newVotes.toString());

		try {
			if(!curr) return res.status(400).send("No logged in user");

			if(curr === "null" || curr === "guest" || curr == undefined || curr === "") 
				return res.status(400).send("No logged in user");

            // Look for user with matching username
            const user = await users.findOne({username: curr});

            // User does not exist
            if(!user) return res.status(404).send("User not found");

			if(newVotes.type === "comment") {
				try {
					console.log("changing comment votes");
					comments.updateOne(
						{ num: newVotes.num },
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
				
			} else if(newVotes.type === "post") {
				try {
					console.log("changing post votes");
					posts.updateOne(
						{ num: newVotes.num },
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

			users.updateOne(
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

export default voteController;