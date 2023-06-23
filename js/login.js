$(document).ready(function() {
    $('.login-button').click(function(x) {
      x.preventDefault();
      
        var uname = $('#username').val();
        var pass = $('#password').val();

        if (uname === '' || pass === '') {
          alert('Please enter both username and password.');
          return;
        }

        if (uname=== 'user' && pass === 'admin123') {
            window.location.href = 'index.html';
          } else {
            alert('Invalid username or password.');
          }

     
    });
  });