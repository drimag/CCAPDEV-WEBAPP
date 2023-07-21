import { Router } from 'express';
import { getDb } from '../models/conn.js';
import profileRouter from '../routes/profileRouter.js';
import postRouter from '../routes/postRouter.js';
import loginRouter from '../routes/loginRouter.js';
import commentRouter from '../routes/commentRouter.js';

const router = Router();
const db = getDb();
const users = db.collection("users");
const posts = db.collection("posts");

// HomePage
router.get(["/", "/home", "/homepage"], async (req, res) => {
    console.log("Request to home received.");

    let currentUser = req.query.loggedIn;
    console.log("Current User: " + currentUser);

    if(currentUser == null || currentUser === "guest") {
        currentUser = { username: "guest" };
    } else {
        currentUser = await users.findOne({username: req.query.loggedIn});
    }

    console.log("Current User: " + currentUser);

    // Get Posts For Display
    // TODO: Limit Posts to 15-20 for guest and for users add a show more button
    const postsArray = await posts.aggregate(
        [
            {
                '$lookup': {
                'from': 'users', 
                'localField': 'user_id', 
                'foreignField': '_id', 
                'as': 'user_details'
                }
            }
        ]
    ).toArray();

    //logic for determining the links for the dropdown menu
    //tentative, might put somewhere else
    let dropdowns;

    if (currentUser.username == null || currentUser.username === "guest") {
        dropdowns = [ 
            { label: 'Sign Up'},
            { label: 'Log In'}
        ];
        console.log("dropdown guest")
    } else {
        dropdowns = [
            
            { label: 'Edit Profile'},
            { label: 'View Profile' },
            //{ label: 'Change Password'},
            { label: 'Sign Out' }
            
        ];

        console.log("dropdown in")
        console.log(dropdowns);
    }
    // end of logic for dropdown menu 
    
    res.render("index", {
        pagetitle: "Home",
        user: currentUser,
        posts: postsArray,
        dropdownLinks: dropdowns //added for navbar (tentative)
    });
});

router.use(loginRouter);
router.use(profileRouter);
router.use(postRouter);
router.use(commentRouter);


// TODO: Error 404 Page
router.use((req, res) => {
    res.send("error");
});

export default router;