function verifyPassword() {  
    var oldPSW = document.getElementById("old-psw").value;
    var newPSW = document.getElementById("new-psw").value;
    var newPSW2 = document.getElementById("new-psw-2").value;

    if(oldPSW != "1234" ){//1234 is the old password
        document.getElementById("message").innerHTML = "**Old Password Incorrect";  
        return false;
    } 

    if(newPSW.length > 15) {  
        document.getElementById("message").innerHTML = "**Password length must not exceed 15 characters";  
        return false;  
    }
    
    if(newPSW.length < 4) {  
        document.getElementById("message").innerHTML = "**Password length must be atleast 4 characters";  
        return false;  
    }

    if(newPSW != newPSW2){
        document.getElementById("message").innerHTML = "**New Password Mismatch";  
        return false;
    }

    else {
        alert("Success!");
    }
}  