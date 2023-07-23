import { getDb } from '../models/db.js';

const db = getDb();

const users = db.collection("users");

const loginController = {

    checkCredentials: async function (req,res){

        const { username } = req.body;
        const { password } = req.body;

        //checks if credentials are in db

        try{


        }catch{

        }
    },
    
    getRegister: async function (req,res){
        console.log("Navigating to register page");
        res.render("register");
    }

}

export default loginController;