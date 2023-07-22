import { Router } from 'express';

import controller from '../controllers/controller.js';
import postController from '../controllers/postController.js';
import profileController from '../controllers/profileController.js';
import voteController from '../controllers/voteController.js';

const router = Router();

// Home Routes
router.get(["/", "/home", "/homepage"], controller.getHome);

// Profile Routes
router.get("/edit-profile", profileController.getEditProfile);
router.get("/profile/:username", profileController.getProfile);

// Post Routes
// TODO: Redirect to login if logged in is guest!
// postRouter.get("/post") 
// Get a Post ( add /:username?/ if possible)
router.get("/posts/:postID", postController.getPost);
router.post("/post", postController.createPost);

// Comment Routes
router.delete("/comment", postController.deleteComment);
router.post("/comment", postController.postComment);

// Reply Routes
router.post("/reply",);

// Login Routes
router.get("/login", controller.getLogin);

// Vote Routes
router.post('/posts/_id/votes', voteController.postVote);

// TODO: Error 404 Page
router.use((req, res) => {
    res.send("error");
});

export default router;