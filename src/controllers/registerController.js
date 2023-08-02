const User = require('../models/User.js');

const registerController = {

    registerAccount: async function (req,res){
        
        console.log("registering account..");
        //console.log(req.body);
        
        const { username } = req.body;
        console.log(username);
        const { password } = req.body;
        const { bio } = req.body;
        const { pfp } = req.body;
        try{

            const matchingUser = User.findOne({ username: username });

            
            if (!matchingUser){
                //username is taken

                res.sendStatus(400);
            }else{

                const newUser = new User({
                    username: username,
                    password: password,
                    bio: bio,
                    pfp: pfp,
                    upvoteComments: [],
                    downvoteComments: [],
                    upvotePosts: [],
                    downvotePosts: [] 
                })



                const result = await newUser.save();
                console.log("result:", result);
                console.log("register successful!");
                
   
                res.sendStatus(200);
            }
        } catch(err){
            console.error('Failed to create account:',err);
        }
    },
    
    // getRegister: async function (req,res){
    //     // dropdown links for navbar
    //     let currentUser = req.query.loggedIn;
    //     if(currentUser == null || currentUser === "" || currentUser == undefined || currentUser == "guest") currentUser = await users.findOne({username: "guest"});
    //     const dropdowns = getDropdownLinks(currentUser.username);
        
    //     res.render("register", 
    //     { 
    //         pagetitle: "Register",
    //         dropdownLinks: dropdowns,
    //         user: currentUser 
    //     });
    // }
    getRegister: async function (req,res){
        let currentUser = req.query.loggedIn;
        res.render("register", 
        { 
            pagetitle: "Register",
            //dropdownLinks: dropdowns,
            user: currentUser 
        });
    }
}

module.exports = registerController;


