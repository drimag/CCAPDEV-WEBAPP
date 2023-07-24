import { getDb } from '../models/db.js';
import { getDropdownLinks } from '../middleware/navDropdown.js';

const db = getDb();

const users = db.collection("users");

const loginController = {

    checkCredentials: async function (req,res){
        console.log("checkCredential");
        const { username, password } = req.body;

        // Checks if credentials are in db
        try{
            const user = await users.findOne({ username, password });
            if(user){
                console.log("user is:",user);
                console.log('Login successful:', user);

                // Transport user to home
                res.status(200).json({ result:true });
            }else{
                console.log("INVALID USERNAME/PASSWORD");
                res.status(200).json({ result:false });
            }

        }catch(err){
            console.error('Login failed:',err);
        }
    },

    getLogin: async function (req, res) {
        // Dropdown links for navbar
        let currentUser = req.query.loggedIn;
        if(currentUser == null || currentUser === "" || currentUser == undefined || currentUser == "guest") currentUser = await users.findOne({username: "guest"});
        const dropdowns = getDropdownLinks(currentUser.username);
        
        res.render("login", {
            pagetitle: "Login",
            dropdownLinks: dropdowns,
            user: currentUser
        });
    }
}

export default loginController;
