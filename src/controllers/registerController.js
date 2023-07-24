import { getDb } from '../models/db.js';
import { getDropdownLinks } from '../middleware/navDropdown.js';

const db = getDb();

const users = db.collection("users");


const registerController = {

    registerAccount: async function (req,res){
        
        console.log("registering account..");
        console.log(req.body);
        
        const { username } = req.body;
        const { password } = req.body;
        const { bio } = req.body;
        const { pfp } = req.body;
        try{

            const matchingUser = users.find({ username: username });
            const matchingUserArr = await matchingUser.toArray();
            

            if (matchingUserArr.length > 0){
                //username is taken
                //throw error
            }else{
                const result = await users.insertOne({
                    username: username,
                    password: password,
                    bio: bio,
                    pfp: pfp       
                });


                console.log("result:",result);
                console.log("register successful!");
                //return res.redirect("/login");
                res.sendStatus(200);
            }
        } catch(err){
            console.error('Failed to create account:',err);
        }
    },
    
    getRegister: async function (req,res){
        // dropdown links for navbar
        let currentUser = req.query.loggedIn;
        if(currentUser == null || currentUser === "" || currentUser == undefined || currentUser == "guest") currentUser = await users.findOne({username: "guest"});
        const dropdowns = getDropdownLinks(currentUser.username);
        
        res.render("register", 
        { 
            pagetitle: "Register",
            dropdownLinks: dropdowns,
            user: currentUser 
        });
    }
}



export default registerController;



