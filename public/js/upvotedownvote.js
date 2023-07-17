// similar to the mini challenge 2 I think

const upvoteBtn = document.getElementsByClassName("upvote");
const downvoteBtn = document.getElementsByClassName("downvote");

async function voteAction(postId, action){
    try {
        const response = await fetch(`/posts/${postId}/vote`, {
            method: 'PUT',
            //body: JSON.stringify({ action })
        });

        if(response.ok) {
            const { votes } = await response.json();
            
            if(action === "upvote") {
                // update image
    
            } else if(action === "downvote") {
                // update image
            }

        } else {
            console.error("asdadasdasdasd");
        }

    } catch(err) {
        console.error(err);
    }
}

/*
    Button Event Listeners
 */
upvoteBtn.addEventListener("click", () => {
    voteAction(postId, "upvote");
})

downvoteBtn.addEventListener("click", () => {
    voteAction(postId, "downvote");
})

/*
    Route handling
 */
const posts = db.collection("posts");

/*
    Upvote/downvote
 */
voteRouter.put("/posts/:postId/vote", async (req, res) => {
    const { postId } = req.params;
    const { action } = req.body;

    // Get post and its number of votes
    let post = await posts.findById(postId);
    //let votes = await sdasdadads;

    try {
        if(!post) {
            return res.status(404);
        }

        if(action === "upvote") {
            post.votes++;

        } else if(action === "downvote") {
            post.votes--;

        } else {
            return res.status(400);
        }

        await post.save();
        
    } catch(err) {
        console.error(err);
    }
});

voteRouter.listen(3000, () => {
    console.log("voting");
});

export default voteRouter;