const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const exphbs = require('express-handlebars');
// import { addSampleData } from './src/models/sampledata.js';
const connect = require('./src/models/db.js');
const addSampleData = require('./src/models/sampledata.js');
const router = require('./src/routes/router.js');
// import handlebars from 'handlebars';
const handlebars = require('handlebars');

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

    // for file transfer
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ limit: '10mb', extended: true }));
    
    app.use(router);

    // Activate the app
    app.listen(process.env.SERVER_PORT, async function() {
        console.log("Express app is now listening on port " + process.env.SERVER_PORT);
        
        try {
            await connect();
            console.log("Now connected to MongoDB");

            await addSampleData();
            console.log("Sample Data Added");
        } catch (err) {
            console.log("Connection to MongoDB failed: ");;
            console.error(err);
        }
        
        /*
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
        */
    });
}

main();