import { Router } from 'express';

import controller from '../controller/controller.js';

const router = Router();

// Profile Router
router.get("/edit-profile", controller.getEditProfile);
router.get("/profile/:username", controller.getProfile);
// TODO: Redirect to login if logged in is guest!
// postRouter.get("/post") 
// Get a Post ( add /:username?/ if possible)
postRouter.get("/posts/:postID", controller.getPost);
postRouter.post("/post", controller.createPost);

// Comment Router
router.delete("/comment", controller.deleteComment);
router.post("/comment", controller.postComment);
router.post("/reply",);

export default router;