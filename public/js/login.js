var lString = "/login-d";
$(".to-register").click(function(){
    console.log("going to register page");
    window.location.href = "/register";
});


$(".login-button").click(async function(){

    let uname = $('#username').val();
    let pass = $('#password').val();

    if (uname === '' || pass === '') {
        alert('Please enter both username and password.');
    } else {
        const data = {
            username: uname,
            password: pass
        };
        //console.log(data);
    
        const jString = JSON.stringify(data);
  
        const response = await fetch(lString, {
            method: 'POST',
            body: jString,
            headers: {
                'Content-type': 'application/json'
            }
        })
  
        if (response.status === 200) {
            location.href = "/home";
        } else {
            $("#loginCheck").show();
            $("#logincheck").text("Invalid Credentials.");
            $("#logincheck").css("color", "red");
        }
    }
});

$('#remember').change(function() {
    if ($(this).is(':checked')) {
        // Checkbox is checked
        console.log("checked");
        lString = "/login";
    } else {
        // Checkbox is unchecked
        console.log("unchecked");
        lString = "/login-d";

    }
});

