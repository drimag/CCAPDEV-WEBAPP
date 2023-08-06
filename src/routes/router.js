const { Router } = require('express');

const router = Router();

const controller = require('../controllers/controller');
const postController = require('../controllers/postController');

const registerController = require('../controllers/registerController.js');

const voteController = require('../controllers/voteController.js');
const changePasswordController = require('../controllers/changePasswordController.js');
const aboutController = require('../controllers/aboutController');

const getDropdownLinks = require('../middleware/navDropdown.js');
const User = require('../models/User.js');

// Home Route ✔️
router.get(["/", "/home", "/homepage"], controller.getHome);

// User Route
router.get("/user", controller.getCheckUser);

// Post Routes ✔️
router.get("/post", postController.getCheckPost);
router.post("/post", postController.createPost);
router.delete("/post", postController.deletePost);
router.put("/post", postController.editPost);
router.get("/viewpost", postController.getViewPost);

// Comment Routes
router.post("/comment", postController.createComment);
router.delete("/comment", postController.deleteComment);
router.post("/reply", postController.createReply);
router.put("/comment", postController.editComment);
router.get("/comment/postNum", postController.getCommentPostNum);

// Profile Routes
router.get("/profile/:username", controller.getProfile);
router.get("/profile", controller.getMyProfile);
router.get("/edit-profile", controller.getEditProfile);
router.post("/edit-profile", controller.editProfile);

// Register Routes
router.get("/register", registerController.getRegister);
router.post("/register", registerController.registerAccount);

// Voting Routes
router.get("/votes", voteController.getUserVotes);
router.put("/votes", voteController.updateVotes);

// Change Password Routes
router.get("/change-password", changePasswordController.getChangePassword);
router.post("/get-password", changePasswordController.getIsMatchingPassword);
router.put("/change-password", changePasswordController.changePassword);

// About Page Route
router.get("/about", aboutController.getAbout);

// Login
router.get('/login', async (req,res) => {
    // put this in login controller once it works
    if(req.session.authorized == true) {
        res.redirect('/home');
    } else {
        const user = await User.findOne({username: "guest"}).lean().exec();
        res.render("login", {
            pagetitle: "Login",
            user: user,
            dropdownLinks: getDropdownLinks("guest"),
        });
    }
});

// Delete session
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
})

module.exports = router;