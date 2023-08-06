const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const getDropdownLinks = require('../middleware/navDropdown.js');

// TODO: Adjust Functions to Mongoose
const changePasswordController = {

    getChangePassword: async function (req,res) {
        console.log("Request to change password page received.");
        let curr = req.session.user;

        try {
            // No login param in URL
            if(!curr) return res.status(400).send("No logged in user");

            console.log("1");
            
            console.log("2");
            
            curr.pfp.data = Buffer.from(req.session.user.pfp.data, 'base64');
            const dropdowns = getDropdownLinks(curr.username); 

            res.render("change_password", {
                pagetitle: "Change Password",
                user: curr,
                dropdownLinks: dropdowns
            })
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },

    getIsMatchingPassword: async function (req,res) {
        console.log("Request to get if password matches");

        let curr = req.session.user;

        try {
            // No login param in url
            if(!curr) return res.status(400).send("No logged in user");

            // Send the password
            console.log("current user: " + curr.username);
            console.log("sending this as user password: " + JSON.stringify(req.body.password));
            const isMatching = await bcrypt.compare(req.body.password, curr.password);
            
            console.log("isMatching?: " + isMatching);
            if(isMatching) {
                res.sendStatus(200);
            } else {
                res.sendStatus(403);
            }

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    },

    changePassword: async function (req, res) {
        console.log("Request to change current user's password received.");

        let currentUser = req.session.user;
        let newPassword = req.body;

        try {
            // No login param in url
            if(!currentUser) return res.status(400).send("No logged in user");

            if(newPassword.password.length > 15 || newPassword.password.length < 4){
                res.status(403).send("invalid password")
            } else {
                // Hash the new password
                const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
                const hash = await bcrypt.hash(newPassword.password, salt);

                // Change the password
                try{
                    const result = await User.updateOne(
                        { username: currentUser.username },
                        { password: hash }
                    ).exec();

                    console.log("newpas: " + newPassword.password)
                    res.status(200).send("Password changed successfully");
                    console.log("Edit password successful");
                } catch (err) {
                    console.log("Edit Password Unsuccessful");
                    console.error(err);
                    res.sendStatus(500);
                }
            }

        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    // post method change password
    
}
module.exports = changePasswordController;
