users = [];

class User {
  constructor(name, password) {
    this.name = name;
    this.lname = this.name.toLowerCase();
    this.username = "@" + this.lname;
    this.password = password;
    this.acc = "#user-" + name;
    this.img = "./profilepics/" + this.lname + ".jpg";
    this.bio = "test bio";
  }
}

class newUser extends User{
  constructor(name,password){
    super(name,password);
    this.img = "./profilepics/guest.jpg";
  }
}



let userGuest = new User("Guest", "1234");
let userSakura = new User("Sakura", "letmeplay");
let userChaewon = new User("Chaewon", "tyforsupportingus");
let userYunjin = new User("Yunjin", "IGOTACONDOINMANHATTAN");
let userKazuha = new User("Kazuha", "bang!");
let userEunchae = new User("eunchae", "mubankpresident");

users.push(userSakura, userChaewon, userYunjin, userKazuha, userEunchae);


$(document).ready(function() {
    $('.login-button').click(function(x) {
      x.preventDefault();
      
        var uname = $('#username').val();
        var pass = $('#password').val();
        console.log(users);
        if (uname === '' || pass === '') {
          alert('Please enter both username and password.');
          return;
        }
        var isUser= checkCredentials(uname,pass);
        function checkCredentials(uname, pass) {
        var valid = false;
        var i = 0;

        while (i < users.length) {
          let objName = users[i].name;
          let objPass = users[i].password;

          if (uname === objName && pass === objPass) {
            valid = true;
            break;
          }
        i++;
        }
        return valid;
      }


        console.log(isUser);
        if(isUser){
          window.location.href = 'index.html';
        }else{
          alert('Invalid username or password.');
          console.log('Invalid username or password.');
          return;
        }
        
    });
});


$(document).ready(function() {
  $('.register-button').click(function(x) {
    x.preventDefault();
  
    var uname = $('#username').val();
    var pass = $('#password').val();

    if (uname === '' || pass === '') {
      alert('Please enter both username and password.');
      return;
    }

    var usernameTaken = false;

    var i = 0;

    while (i < users.length) {
      if (users[i].username === uname) {
        alert('Username is already taken.');
        usernameTaken = true;
        break; // Exit the while loop
      }
      i++;
    }

    console.log(usernameTaken);
    if (usernameTaken) {
      return; // Exit the outer function if username is taken
    }

    let newUser = { username: uname, password: pass };
    users.push(newUser);
    window.location.href = 'login.html';
  });
});


$(document).ready(function() {
  var rememberCheckbox = $('#remember');
  var rememberValue = localStorage.getItem('remember');
  rememberCheckbox.prop('checked', rememberValue === 'true');
  var usernameValue = localStorage.getItem('username');
  var passwordValue = localStorage.getItem('password');
  $('#username').val(usernameValue);
  $('#password').val(passwordValue);
  rememberCheckbox.on('change', function() {
    localStorage.setItem('remember', rememberCheckbox.prop('checked'));
    if (rememberCheckbox.prop('checked')) {
      var username = $('#username').val();
      var password = $('#password').val();
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }
  });
});