const User = require('../models/User.js');
const getDropdownLinks = require('../middleware/navDropdown.js');

const aboutController = {
    
    getAbout: async function (req,res){
        // dropdown links for navbar
        let currentUser = req.query.loggedIn;
        if(currentUser == null || currentUser === "" || currentUser == undefined || currentUser == "guest") 
            currentUser = await User.findOne({username: "guest"}).lean().exec();
        const dropdowns = getDropdownLinks(currentUser.username);
        
        res.render("about", 
        { 
            pagetitle: "About",
            dropdownLinks: dropdowns,
            user: currentUser 
        });
    }
}

module.exports = aboutController;


