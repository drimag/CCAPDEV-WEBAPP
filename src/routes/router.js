const { Router } = require('express');

const router = Router();

const controller = require('../controllers/controller');
const postController = require('../controllers/postController');

// Home Route ✔️
router.get(["/", "/home", "/homepage"], controller.getHome);

// Post Routes ✔️
router.get("/post", postController.getCheckPost);
router.post("/post", postController.createPost);
router.delete("/post", postController.deletePost);
router.put("/post", postController.editPost);
router.get("/viewpost", postController.getViewPost);
// TODO: maybe seperate the update num comments from create+delete like in MCO2 (will not implement yet)

// Comment Routes
router.post("/comment", postController.createComment);
router.delete("/comment", postController.deleteComment);
router.post("/reply", postController.createReply); // may delete bc merged
// TODO: router.put("/comment", postController.editComment);

// TODO: Profile Routes
router.get("/profile/:username", controller.getProfile);
/*
    OLD ROUTES:
    router.get("/edit-profile", profileController.getEditProfile);
    router.post("/edit-profile", profileController.editProfile);
    router.get("/profile", profileController.getMyProfile);
    router.get("/profile/:username", profileController.getProfile);
*/

/*
// Write cookies
router.get("/", function(req, res) {
    res.cookie("foo", "bar", {
        maxAge: 60*60*1000,
        httpOnly: true
    })
})

// Read cookies
const cookieparser = require("cookie-parser");
app.use(cookieparser());
app.get("/", function(req, res) {
    let cookiefoo = req.cookies.foo

    if(cookiefoo) {
        console.log("foo: " + cookiefoo)
    }
})

// Read/write session
const session = require("express-session");

app.use(session({
    secret: "testing testing",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000*60*60*24*30,
        httpOnly: true
    }
}))

*/

/*
import controller from '../controllers/controller.js';
import postController from '../controllers/postController.js';
import profileController from '../controllers/profileController.js';
import voteController from '../controllers/voteController.js';
import registerController from '../controllers/registerController.js';
import loginController from '../controllers/loginController.js';
import changepasswordController from '../controllers/changepasswordController.js';
//const router = Router();

// Home Routes
router.get(["/", "/home", "/homepage"], controller.getHome);

// Profile Routes
router.get("/edit-profile", profileController.getEditProfile);
router.post("/edit-profile", profileController.editProfile);
router.get("/profile", profileController.getMyProfile);
router.get("/profile/:username", profileController.getProfile);

// Post Routes
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
router.get("/comment:commentNum/postNum", postController.findPostNum);
router.put("/comment/reply", postController.postReply);

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

// Error 404 Page
router.use((req, res) => {
    res.send("error");
});

export default router;
*/

module.exports = router;

/*



 */