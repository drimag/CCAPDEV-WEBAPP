// System-related packages
import 'dotenv/config';

// Web-app related packages
import express from 'express';
import exphbs from 'express-handlebars';

// Routes modules
import router from "./src/routes/router.js"
// Database modules
import { connectToMongo } from './src/models/db.js';
import { addSampleData } from './src/models/sampledata.js';

async function main () {
    const app = express();

    app.use("/static", express.static("./public"));
    app.engine("hbs", exphbs.engine({
        extname: 'hbs'
    }));
    app.set("view engine", "hbs");
    app.set("views", "./src/views");

    app.use(express.json());
    app.use(router);

    // Activate the app
    app.listen(process.env.SERVER_PORT, () => {
        console.log("Express app is now listening...");
        connectToMongo((err) => {
            if (err) {
                console.log("An error has occurred: ");
                console.error(err);
                return;
            }
            console.log("Connected to Mongodb");
        });

        addSampleData((err) => {
            if (err) {
                console.log("An error has occurred: ");
                console.error(err);
                return;
            }
            console.log("Inserted Sample Data");
        });
    });
}

main();

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

app.route("/comment")
    .post((req, res) => {
        res.send("Create a comment")
    })
    .put((req, res) => {
        res.send("Edit a comment")
    })
    .delete((req, res) => {
        res.send("Delete a comment")
    })
*/
