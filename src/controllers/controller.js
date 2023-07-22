import { getDb } from '../models/conn.js';

const db = getDb();

const users = db.collection("users");
const posts = db.collection("posts");
const comments = db.collection("comments");

const controller = {
    getLogin: async function (req, res) {
        res.render("login", {
            pagetitle: "Login"
        });
    }

}

export default controller;