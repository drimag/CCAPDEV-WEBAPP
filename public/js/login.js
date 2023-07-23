$(".to-register").click(function(){
    console.log("going to register page");
    window.location.href = "/register";
});

$(".login-button").click(async function(){

    let uname = $('#username').val();
    let pass = $('#password').val();

    if (uname === '' || pass === '') {
        alert('Please enter both username and password.');
        return;
      }
  
  
      const data = {
          username: uname,
          password: pass
      };
      console.log(data);
  
      const jString = JSON.stringify(data);
  
      const response = await fetch("/login", {
          method: 'POST',
          body: jString,
          headers: {
              'Content-type': 'application/json'
          }
      });

});