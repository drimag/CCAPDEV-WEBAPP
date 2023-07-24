import { getDb } from '../models/db.js';

const db = getDb();

const users = db.collection("users");

const loginController = {

    checkCredentials: async function (req,res){

        const { username, password } = req.body;

        //checks if credentials are in db

        try{
            const user = await users.findOne({ username, password });
            if(user){
                console.log('Login successful:', user);
                res.status(200).send('Login successful');
            }else{
                console.log("INVALID USERNAME/PASSWORD");
            }

        }catch(err){
            console.error('Login failed:',err);
        }
    },
    
    getLogin: async function (req,res){

        res.render("login");
    },




}

export default loginController;