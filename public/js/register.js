$(".register-button").click(async function(){

    console.log("register button pressed");
    let uname = $('#username').val();
    let pass = $('#password').val();
    
    if (uname === '' || pass === '') {
      alert('Please enter both username and password.');
      
      return;
    }


    const data = {
        username: uname,
        password: pass,
        bio: "Write bio here...",
        pfp: null
    };
    console.log(data);

    const jString = JSON.stringify(data);

    const response = await fetch("/register", {
        method: 'POST',
        body: jString,
        headers: {
            'Content-type': 'application/json'
        }
    });

    window.location.href = "/login";

});