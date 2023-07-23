import { getDb } from '../models/db.js';

const db = getDb();

const users = db.collection("users");


const registerController = {

    registerAccount: async function (req,res){

        console.log("registering account..");
        console.log(req.body);
        
        const { username } = req.body;
        const { password } = req.body;


        try{

            const matchingUser = users.find({ username: uname });
            const matchingUserArr = await matchingUser.toArray();
            

            if (matchingUserArr.length > 0){
                //username is taken
                //throw error
            }else{
                const result = await users.insertOne({
                    username: username,
                    password: password,
                    bio: "Write bio here..."
                });


                console.log(result);
                console.log("register successful!");
                res.redirect("/login");
                res.sendStatus(200);
            }
        } catch{
            console.error('Failed to create account:', error);
        }
    }
}

export default registerController;