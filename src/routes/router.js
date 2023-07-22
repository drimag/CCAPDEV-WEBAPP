import { Router } from 'express';

import controller from '../controllers/controller.js';
import postController from '../controllers/postController.js';
import profileController from '../controllers/profileController.js';

const router = Router();

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
loginRouter.get("/login", controller.getLogin);

export default router;