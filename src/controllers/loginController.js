import { getDb } from '../models/db.js';
import { getDropdownLinks } from '../middleware/navDropdown.js';
//import controller from '../controllers/controller.js';

const db = getDb();

const users = db.collection("users");

const loginController = {

    checkCredentials: async function (req,res){
        console.log("checkCredential");
        const { username, password } = req.body;

        //checks if credentials are in db

        try{
            const user = await users.findOne({ username, password });
            if(user){
                console.log("user is:",user);
                console.log('Login successful:', user);
                //transport user to home
                //controller.getHome(user);
                res.status(200).json({ result:true });
            }else{
                console.log("INVALID USERNAME/PASSWORD");
                res.status(200).json({ result:false });
            }

        }catch(err){
            console.error('Login failed:',err);
        }
    },
    
    getLogin: async function (req,res){
        // dropdown links for navbar
        let currentUser = req.query.loggedIn;
        const dropdowns = getDropdownLinks(currentUser.username);
        
        res.render("login", { dropdownLinks: dropdowns });
    },




}

export default loginController;