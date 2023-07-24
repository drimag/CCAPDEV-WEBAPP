$('#save-changes-btn').click(function (event) {
    event.preventDefault(); // Prevent the default form submission

    async function changePasswordHandler(){
        let currentPassword;

        // call getPassword as a fetch request to controller
        try {
            currentPassword = await getPassword();
        } catch (error) {
            console.error("error fetching password", error);
        }

        let oldPSW = document.getElementById("old-psw").value;
        let newPSW = document.getElementById("new-psw").value;
        let newPSW2 = document.getElementById("new-psw-2").value;
        let isValid = true;

        if(oldPSW != currentPassword ){                                                            
            document.getElementById("message").innerHTML = "**Old Password Incorrect";  
            isValid = false;
        } 

        else if(newPSW.length > 15) {  
            document.getElementById("message").innerHTML = "**New Password length must not exceed 15 characters";  
            isValid = false;
        }
        
        else if(newPSW.length < 4) {  
            document.getElementById("message").innerHTML = "**New Password length must be atleast 4 characters";  
            isValid = false;  
        }

        else if(newPSW != newPSW2){
            document.getElementById("message").innerHTML = "**New Password Mismatch";  
            isValid = false;
        }

        if(isValid) {
            // make a post request remember to put current user 

            const jString = JSON.stringify({password: newPSW});

            const currentURL = window.location.href;
            const params = new URLSearchParams(new URL(currentURL).search);
            const currentUser = params.get("loggedIn");
            console.log("currentUser (change password): " + currentUser);

            try {
                const response = await fetch('/change-password?loggedIn=' + currentUser, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', },
                body: jString
                })
    
                console.log(response);
    
                if(response.status === 200) {
                    console.log("Password Change Successful");
                    alert("Password Change Successful");
                    location.href = "/home?loggedIn=" + currentUser;
                } else {
                    console.log("Status code received: " + response.status);
                    alert("There was an an error in changing your password");
                    location.href = "/home?loggedIn=" + currentUser;
                }
            } catch (err) {
                console.error(err);
                alert("There was an an error in changing your password");
                location.href = "/home?loggedIn=" + currentUser;
            }
        }
    }
    changePasswordHandler();  
});

async function getPassword() {
    const currentURL = window.location.href;
    const params = new URLSearchParams(new URL(currentURL).search);
    const currentUser = params.get("loggedIn");

    try {
        const response = await fetch("/get-password?loggedIn=" + currentUser, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }
        });
    
        if (response.ok) {
            const password = await response.text();
            return password;
        } else {
            console.log('Failed to fetch the change password page.');
        }
        
    } catch (err) {
        console.error('Error:', err);
    }
}
