
// Edit Profile

/*
// Update Profile
// put and patch do the same thing I think
profileRouter.put("/idkidk/:postId", async (req, res) => {
    const { postId } = req.params;
    const editedPostData = req.body;

    const editedPost = await posts.findOneAndUpdate(
      { _id: ObjectId(postId) },
      { $set: editedPostData },
      { returnOriginal: false }
    );

    res.json(updatedPost.value);
});
*/

/*
async function showMore() {
    posts.find().limit(5).forEach((post) => {
        console.log("Showing 5 more posts/comments");
    });
}

async function limitInitial() {
    posts.find().sort( {votes:-1} ).forEach((post) => {
        console.log("Showing 5 latest posts/comments");
    });
}
 */