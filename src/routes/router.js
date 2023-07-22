import { Router } from 'express';

import controller from '../controllers/controller.js';
import postController from '../controllers/postController.js';
import profileController from '../controllers/profileController.js';
import voteRouter from './voteRouter.js';

const router = Router();
// Home Routes
router.get(["/", "/home", "/homepage"], controller.getHome);

// Profile Routes
router.get("/edit-profile", profileController.getEditProfile);
router.get("/profile/:username", profileController.getProfile);

// TODO: Redirect to login if logged in is guest!
// postRouter.get("/post") 
// Get a Post ( add /:username?/ if possible)
router.get("/posts/:postID", postController.getPost);
router.post("/post", postController.createPost);

// Comment Routes
router.delete("/comment", postController.deleteComment);
router.post("/comment", postController.postComment);
router.post("/reply",);

// Login Routes
router.get("/login", controller.getLogin);

router.use(voteRouter);

// TODO: Error 404 Page
router.use((req, res) => {
    res.send("error");
});

export default router;