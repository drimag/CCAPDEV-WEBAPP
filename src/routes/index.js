import { Router } from 'express';
import { getDb } from '../models/conn.js';
import loginRouter from '../routes/loginRouter.js';
import { getDropdownLinks } from './navDropdown.js';
import voteRouter from '../routes/voteRouter.js';
import testRouter from '../routes/router.js';

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
    

    // filter posts if there is a search
    let searchTerms = req.query.search;
    let searchPosts;

    if(!(searchTerms == undefined || searchTerms === "")){
        searchPosts = postsArray.filter((post) => {
            let titleMatch = post.title.toLowerCase().includes(searchTerms.toLowerCase());
            let descriptionMatch = post.description.toLowerCase().includes(searchTerms.toLowerCase());

            return titleMatch || descriptionMatch;
        });
    } else {
        searchPosts = postsArray;
    }
    
    const searchDetails = { numPosts : searchPosts.length, search : searchTerms };
    console.log("search Detials: " + searchDetails);

    // get dropdown links based on if user is logged in
    const dropdowns = getDropdownLinks(currentUser.username); 
    console.log("dropdown links: " + dropdowns);

    res.render("index", {
        pagetitle: "Home",
        user: currentUser,
        posts: searchPosts,
        dropdownLinks: dropdowns, // navbar links 
        searchDetails: searchDetails
    });
});

router.use(loginRouter);
router.use(testRouter);
router.use(voteRouter);

// TODO: Error 404 Page
router.use((req, res) => {
    res.send("error");
});

export default router;