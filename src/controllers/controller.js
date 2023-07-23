import { getDb } from '../models/db.js';
import { getDropdownLinks } from '../controllers/navDropdown.js';

const db = getDb();

const users = db.collection("users");
const posts = db.collection("posts");
const comments = db.collection("comments");

const controller = {
    getHome: async function(req, res) {
        console.log("Request to home received.");
    
        let currentUser = req.query.loggedIn;
        console.log("Current User: " + currentUser);

        try {
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
        } catch (err) {
            console.error(err);
            res.sendStatus(500); // fix
        }
    },
    
    getLogin: async function (req, res) {
        res.render("login", {
            pagetitle: "Login"
        });
    }

}

export default controller;