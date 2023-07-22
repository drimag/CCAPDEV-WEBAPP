import { Router } from 'express';
import { getDb } from '../models/db.js';

const voteRouter = Router();
const db = getDb();
const users = db.collection("users");
const posts = db.collection("posts");
const comments = db.collection("comments");



// Route to handle vote updates

voteRouter.post('/posts/_id/votes', async (req, res) => {
    //const { postId, votes } = req.body;
 
    const { postId } = req.body;
    console.log("post id is:",postId);
    /*
    const { action } = req.body;
    console.log("action is:",action);
    */
    const { votes } = req.body;
    console.log("votes are:",votes);
    try {
     
      // Find the post by its ID
      const post = await posts.findOne({ num: parseInt(req.body.postId)});
      console.log("post is:",post);
  
      // Update the vote count in the post document
      post.votes = votes;
  
      // Save the updated post back to the database
      await posts.updateOne({num: parseInt(req.body.postId) }, { $set: { votes } });
  
      // Respond with success status (200) indicating the update was successful
      res.status(200).json({ message: 'Vote updated successfully' });


    } catch (error) {
      console.error('Failed to update vote:', error);
      
      res.status(500).json({ message: 'Failed to update vote' });
    }
  });




voteRouter.get("/posts/:postID", async(req, res) => {
    console.log("Request to post number " + req.params.postID + " received.");

    const post = await posts.findOne({ 
        num: { $eq: parseInt(req.params.postID) }
    });

});
  
  export default voteRouter;