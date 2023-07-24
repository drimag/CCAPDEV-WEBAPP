import { Router } from 'express';

import controller from '../controllers/controller.js';
import postController from '../controllers/postController.js';
import profileController from '../controllers/profileController.js';
import voteController from '../controllers/voteController.js';
import registerController from '../controllers/registerController.js';
import loginController from '../controllers/loginController.js';
import changepasswordController from '../controllers/changepasswordController.js';
const router = Router();

// Home Routes
router.get(["/", "/home", "/homepage"], controller.getHome);

// Profile Routes
router.get("/edit-profile", profileController.getEditProfile);
router.post("/edit-profile", profileController.editProfile);
router.get("/profile", profileController.getMyProfile);
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

router.get("/deleted", controller.getDeletedPage);

// Comment Routes
router.delete("/comment", postController.deleteComment);
router.post("/comment", postController.postComment);
router.put("/comment", postController.editComment);

// Reply Routes
router.post("/reply",);

// Login Routes
router.get("/login", loginController.getLogin);
router.post("/login", loginController.checkCredentials);


// Register Routes
router.get("/register", registerController.getRegister);
router.post("/register", registerController.registerAccount);

// Vote Routes
router.post('/posts/_id/votes', voteController.postVote);
router.get("/votes", voteController.getUserVotes);
router.put("/votes", voteController.updateVotes);

// Change Password Routes
router.get("/change-password", changepasswordController.getChangePassword);
router.get("/get-password", changepasswordController.getCurrentPassword);
router.put("/change-password", changepasswordController.changePassword);



// TODO: Error 404 Page
router.use((req, res) => {
    res.send("error");
});

export default router;
