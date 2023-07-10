/*

  JS File for Login

*/

let users = [];

/*

  Constructors for User and New User

*/
class User {
  constructor(name, password) {
	this.name = name;
	this.lname = this.name.toLowerCase();
	this.username = "@" + this.lname;
	this.password = password;
	this.acc = "#user-" + name;
	this.img = "./profilepics/" + this.lname + ".jpg";
	this.bio = "";
  }
}

class newUser extends User{
  constructor(name,password){
	super(name,password);
	this.img = "./profilepics/guest.jpg";
  }
}

/*
	
	Sample Users

*/
let userGuest = new User("Guest", "1234");
let userSakura = new User("Sakura", "letmeplay");
let userChaewon = new User("Chaewon", "tyforsupportingus");
let userYunjin = new User("Yunjin", "IGOTACONDOINMANHATTAN");
let userKazuha = new User("Kazuha", "bang!");
let userEunchae = new User("eunchae", "mubankpresident");

users.push(userSakura, userChaewon, userYunjin, userKazuha, userEunchae);


$(document).ready(function() {
	/*

		Login Function

	 */
	$('.login-button').click(function(x) {
	  x.preventDefault();
	  
		let uname = $('#username').val();
		let pass = $('#password').val();
		console.log(users);
		if (uname === '' || pass === '') {
		  alert('Please enter both username and password.');
		  return;
		}

		let isUser = checkCredentials(uname,pass);

		function checkCredentials(uname, pass) {
			let valid = false;

			for(let user of users) {
				if (uname === user.lname && pass === user.password) {
					valid = true;
					break;
				}
			}
			return valid;
	  	}
	  
		console.log(isUser);

		// Checks if Correct Input Details
		if(isUser){
		  	window.location.href = 'index.html';
		} else {
			alert('Invalid username or password.');
			console.log('Invalid username or password.');
			return;
		}
		
	});

	/*

		Register Function

	 */
	$('.register-button').click(function(x) {
		x.preventDefault();
	  
		let uname = $('#username').val();
		let pass = $('#password').val();
	
		if (uname === '' || pass === '') {
		  alert('Please enter both username and password.');
		  return;
		}
	
		let usernameTaken = false;
	
		let i = 0;
	
		while (i < users.length) {
			if (users[i].username === uname) {
				alert('Username is already taken.');
				usernameTaken = true;
				break;
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

	let rememberCheckbox = $('#remember');
	let rememberValue = localStorage.getItem('remember');

	rememberCheckbox.prop('checked', rememberValue === 'true');

	let usernameValue = localStorage.getItem('username');
	let passwordValue = localStorage.getItem('password');
	$('#username').val(usernameValue);
	$('#password').val(passwordValue);

	rememberCheckbox.on('change', function() {
		localStorage.setItem('remember', rememberCheckbox.prop('checked'));
		if (rememberCheckbox.prop('checked')) {
			let username = $('#username').val();
			let password = $('#password').val();

			localStorage.setItem('username', username);
			localStorage.setItem('password', password);
		} else {
			localStorage.removeItem('username');
			localStorage.removeItem('password');
		}
  	});
});