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
import handlebars from 'handlebars';

async function main () {
    const app = express();

    app.use("/static", express.static("./public"));
    app.engine("hbs", exphbs.engine({
        extname: 'hbs'
    }));
    app.set("view engine", "hbs");
    app.set("views", "./src/views");

    handlebars.registerHelper('ifEqual', function (arg1, arg2, options) {
        return arg1 === arg2 ? options.fn(this) : options.inverse(this);
    });

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