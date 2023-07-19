import { Router } from 'express';
import { getDb } from '../models/conn.js';

const loginRouter = Router();
const db = getDb();

loginRouter.get("/login", async (req, res) => {
    res.render("login", {
        pagetitle: "Login"
    });
});

export default loginRouter;