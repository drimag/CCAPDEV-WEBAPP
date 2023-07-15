// CONTROLLER
import 'dotenv/config';
import { connectToMongo, getDb } from './db/conn.js';

import express from 'express';
import exphbs from 'express-handlebars';
const app = express();

app.use("/static", express.static("./public"));
app.engine("hbs", exphbs.engine({extname: 'hbs'}));
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.urlencoded({extended: true}));

connectToMongo( async (err) => {
    if (err) {
        console.log("error occured:");
        console.log(err);
        process.exit();
    }

    console.log("Connected to MongoDB server");

    const db = getDb();
    
    // Create Collections
    const users = db.collection("users");
    const posts = db.collection("posts");
    const comments = db.collection("comments");

    // Drop Current Collections
    try {
        await users.drop();
        console.log("User Collection dropped");
    } catch {
        console.log("User Collection did not exist");
    }

    try {
        await posts.drop();
        console.log("Post Collection dropped");
    } catch {
        console.log("Post Collection did not exist");
    }

    try {
        await comments.drop();
        console.log("Comment Collection dropped");
    } catch {
        console.log("Comment Collection did not exist");
    }

    // Insert Sample Data Into DB
    try {
        const result = await users.insertMany([
            {
                username: "sakura",
                password: "1234"
            },
            {
                username: "chaewon",
                password: "1234"
            },
            {
                username: "yunjin",
                password: "1234"
            },
            {
                username: "kazuha",
                password: "1234"
            },
            {
                username: "eunchae",
                password: "1234"
            }
        ]);
        
        console.log("User Documents inserted successfully");
        console.log(result);
        
        const sakura = await users.findOne({username: "sakura"});
        const chaewon = await users.findOne({username: "chaewon"});
        const yunjin = await users.findOne({username: "yunjin"});
        const kazuha = await users.findOne({username: "kazuha"});
        const eunchae = await users.findOne({username: "eunchae"});

        console.log("Users Found");

        const result2 = await posts.insertMany([
            {
                user: sakura._id,
                title: "test 1",
                description: "test 1",
                votes: 0
            },
            {
                user: chaewon._id,
                title: "backup dancers in bite me",
                description: "i actually enjoyed the song for once after drunk dazed and fever but the choreography felt way too crowded. there’s 7 of them already and it felt excessive to have 7 more dancers in the back. i get that it’s part of the concept but at times i couldn’t even see the boys at the back. they could\’ve done it by pairing up the boys which would\’ve made it feel less messy, something like ive where the 6 girls paired up without needing background dancers",
                votes: 4
            },
            {
                user: yunjin._id,
                title: "Thoughts on Jungkook Seven MV",
                description: "Okay, I love it. The MV was so fun to watch, especially when he was in the casket and it opened and soohee went \"can yOU NOT!\" I love the song. I love the rhythm and Jungkook's voice and how it carries so smoothly and I just know he's going to devour it when he performs it live because those vocals of his are just that extraordinary. Also, it's catchy. I have a love-hate relationship with catchy songs but goddamn Jeon Jungkook he just never misses. Also LATTO'S PART???? Ive never listened to her music but holy I loved her part, I know what I'm gonna be repeating like a broken CD player for the next few weeks lol",
                votes: 131
            },
            {
                user: kazuha._id,
                title: "test 1",
                description: "test 1",
                votes: 0
            },
            {
                user: eunchae._id,
                title: "test 1",
                description: "test 1",
                votes: 0
            }
        ]);

        console.log("Post Documents inserted successfully");
        console.log(result2);

    } catch (err) {
        console.log("An error has occured");
        console.log(err);
    }


    // Route Paths
    app.get('/', (req, res) => {
        console.log("Request to home received");
        res.redirect('/home');
    });
    
    app.get('/home', (req, res) => {
        console.log("Request to home received");
    
        let data = {
            pagetitle: "Homepage",
            username: "yunjin",
            posts: posts.find()
        }
        res.render("index", data);
    });
    
    // To Login
    app.get('/login', (req, res) => {
        console.log("Request to login received");
        let data = {
            pagetitle: "Login"
        }
        res.render("login", data);
    });
    
    // To Register
    app.get('/register', (req, res) => {
        console.log("Request to register received");
        let data = {
            pagetitle: "Register"
        }
        res.render("register", data);
    });
    
    // To Profile
    app.get('/profile', (req, res) => {
        console.log("Request to profile received");
        let data = {
            pagetitle: "Profile",
            username: "guest"
        }
        res.render("profile", data);
    });
    
    // To User's Profile
    app.get('/profile/:username', (req, res) => {
        console.log("Request to " + req.params.username + "'s profile received");
        console.log(req.params);
        let data = {
            pagetitle: req.params.username + "'s Profile",
            username: req.params.username
        }
        res.render("profile", data);
    });
    
    // To Edit Profile
    app.get('/edit-profile', (req, res) => {
        console.log("Request to edit profile received");
        let data = {
            pagetitle: "Edit Profile",
            username: "yunjin"
        }
        res.render("edit_profile", data);
    });
    
    // To View Post
    app.get('/view-post', (req, res) => {
        console.log("Request to view post received");
        let data = {
            pagetitle: "View Post",
            username: "guest"
        }
        res.render("view_post", data);
    });

    // Activate the app
    app.listen(3000, () => {
        console.log("Express app is now listening...");
    });
})

/**
 * url routing
 * app.get() - reading/retrieving
 * app.post() - creating
 * app.put() - updating/editing
 * app.delete() - deleting
 * ``
 */

// localhost:3000/index

/*
// All requests must pass through this
app.use((req, res, next) => {
    // verify user??
    next();
});

// localhost:3000/profile
app.get("/profile/:username", (req, res) => {
    console.log("Request to profile received.");
    console.log(req.params); //test
    console.log(req.query); //test
    /BOOKS/54     ?title=something&author=somehting2
    res.redirect("/profile"); // Redirect to profile
});

// localhost:3000/post
app.get("/profile/:postId", (req, res) => {
    console.log("Request to profile received.");
    console.log(req.params); //test
    console.log(req.query); //test
    res.redirect("/profile"); // Redirect to profile
});

app.route("/post")
    .post((req, res) => {
        res.send("Create a post")
    })
    .put((req, res) => {
        res.send("Edit a post")
    })
    .delete((req, res) => {
        res.send("Delete a post")
    })
*/
