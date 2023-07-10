// CONTROLLER

const express = require('express');
const app = express();

// Serve public folder as static
app.use(express.static("public"));

/**
 * url routing
 * app.get() - reading/retrieving
 * app.post() - creating
 * app.put() - updating/editing
 * app.delete() - deleting
 * ``
 */

// Create a server

// localhost:3000/index
app.get('/', (req, res) => {
    console.log("Request to root received");
    res.sendFile(__dirname + '/index.html');
});



// localhost:3000/profile
app.get("/profile/:username", (req, res) => {
    console.log("Request to profile received.");
    console.log(req.params); //test
    console.log(req.query); //test
    res.redirect("/profile"); // Redirect to profile
});

// localhost:3000/post
app.get("/profile/:postId", (req, res) => {
    console.log("Request to profile received.");
    console.log(req.params); //test
    console.log(req.query); //test
    res.redirect("/profile"); // Redirect to profile
});



// Activate the app
app.listen(3000, () => {
    console.log("Express app is now listening...");
});