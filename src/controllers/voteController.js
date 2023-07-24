import { getDb } from '../models/db.js';

const db = getDb();

const users = db.collection("users");
const posts = db.collection("posts");
const comments = db.collection("comments");

const voteController = {
    
    postVote: async function (req, res) {
        //const { postId, votes } = req.body;
        console.log("votecontroller called");
        const { type } = req.body;
        console.log("type is:",type);
        /*
        const { action } = req.body;
        console.log("action is:",action);
        */
        const { number } = req.body;
        console.log("number is",number);
        const { votes } = req.body;
        console.log("votes are:",votes);
        try {
			
			// Find the post by its ID
			//const post = await posts.findOne({ num: parseInt(postId)});
			//checks if id belongs to a comment or post
			//let element = id.slice(0,-1);
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

          
      

          //req.body.postId
        
      
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
		const user = await users.findOne({username: curr});

		const votes = { 
			upvoteComments: user.upvoteComments,  
			downvoteComments: user.downvoteComments,
			upvotePosts: user.upvotePosts,
			downvotePosts: user.downvotePosts
		}
		
		console.log("sending this as user's votes': " + votes);

		try {

            console.log("sending this as user's votes': " + votes);
            res.send(votes);

        } catch (error) {
            console.error(error);
            res.sendStatus(500); // fix
        }
	}
}

export default voteController;