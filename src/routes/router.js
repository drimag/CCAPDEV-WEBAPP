import { Router } from 'express';

import controller from '../controllers/controller.js';
import postController from '../controllers/postController.js';
import profileController from '../controllers/profileController.js';
import voteController from '../controllers/voteController.js';
import registerController from '../controllers/registerController.js';
const router = Router();

// Home Routes
router.get(["/", "/home", "/homepage"], controller.getHome);

// Profile Routes
router.get("/edit-profile", profileController.getEditProfile);
router.post("/edit-profile", profileController.editProfile);
router.get("/profile/:username", profileController.getProfile);

// Post Routes
// TODO: Redirect to login if logged in is guest!
// postRouter.get("/post") 
// Get a Post ( add /:username?/ if possible)
router.get(["/posts/:postID"], postController.getPost);
router.post("/post", postController.createPost);
router.put("/post/addedcomment", postController.updatePostCommentList);
router.put("/post/removecomment", postController.updateRemovedComment);
router.delete("/post", postController.deletePost);
router.put("/post", postController.editPost);

// Comment Routes
router.delete("/comment", postController.deleteComment);
router.post("/comment", postController.postComment);
router.put("/comment", postController.editComment);

// Reply Routes
router.post("/reply",);

// Login Routes
router.get("/login", controller.getLogin);

// Register Routes
router.get("/register", registerController.registerAccount);

// Vote Routes
router.post('/posts/_id/votes', voteController.postVote);

// TODO: Error 404 Page
router.use((req, res) => {
    res.send("error");
});

export default router;
