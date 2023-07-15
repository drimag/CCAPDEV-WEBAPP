// CONTROLLER

const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

app.use("/static", express.static(__dirname + "/public"));
app.engine("hbs", exphbs.engine({extname: 'hbs'}));
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.urlencoded({extended: true}));

/**
 * url routing
 * app.get() - reading/retrieving
 * app.post() - creating
 * app.put() - updating/editing
 * app.delete() - deleting
 * ``
 */

// localhost:3000/index
app.get('/', (req, res) => {
    console.log("Request to home received");
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    console.log("Request to home received");
    let data = {
        username: "yunjin"
    }
    res.render("index", data);
});

// To Login
app.get('/login', (req, res) => {
    console.log("Request to login received");
    res.render("login");
});

// To Register
app.get('/register', (req, res) => {
    console.log("Request to register received");
    res.render("register");
});

// To Profile
app.get('/profile', (req, res) => {
    console.log("Request to profile received");
    let data = {
        username: guest
    }
    res.render("profile", data);
});

// To User's Profile
app.get('/profile/:username', (req, res) => {
    console.log("Request to " + req.params.username + "'s profile received");
    console.log(req.params);
    let data = {
        username: req.params.username
    }
    res.render("profile", data);
});

// To Edit Profile
app.get('/edit-profile', (req, res) => {
    console.log("Request to edit profile received");
    let data = {
        username: "yunjin"
    }
    res.render("edit_profile", data);
});

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
// Activate the app
app.listen(3000, () => {
    console.log("Express app is now listening...");
});