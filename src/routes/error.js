import { Router } from 'express';

const router = Router();

router.get("/error", (req, res) => {
    const code = 404;
    const message = "Resource does not exist";
    res.render("error", {statuscode: code, errdesc: message});
});