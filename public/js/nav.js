/*
  JS File for NavBar
*/

// take logged in user from query param and put it into user
const dropdownLinks = document.querySelectorAll(".dropdown-link");
const currentURL = window.location.href;
const params = new URLSearchParams(new URL(currentURL).search);
const user = params.get("loggedIn");

console.log("currentuser: " + user);


let prevScrollpos = window.scrollY;

window.onscroll = function() {
	let currentScrollPos = window.scrollY;

	if (prevScrollpos > currentScrollPos) {
		document.getElementById("navbar").style.top = "0";
	} else {
		document.getElementById("navbar").style.top = "-61px";
	}

	prevScrollpos = currentScrollPos;
}

/* 
	When the user clicks on the button,
	toggle between hiding and showing the dropdown content 
*/
function clickDrop() {
	let dropdown = document.getElementById('dropdown');
	console.log(dropdown);
	dropdown.style.display = "block";
}
   
/*
	
	Close the dropdown if the user clicks outside of it

 */

const dropdownButton = document.querySelector('.dropdown-button');
dropdownButton.addEventListener('click', function(event) {
	// Call the clickDrop() function to handle the button click
	clickDrop();

	// Prevent the event from bubbling up to the window.onclick function
	event.stopPropagation();
});

window.onclick = function(event) {
	if (!event.target.matches('.dropdown-button')) {
		let dropdowns = document.getElementsByClassName("dropdown-content");

		for (let i = 0; i < dropdowns.length; i++) {
			let openDropdown = dropdowns[i];
			
			if (openDropdown.style.display === "block") {
				openDropdown.style.display = "none";
			}
		}
  	}
};



/*

	Handler for clicking home button

*/

const homeButton = document.querySelector(".home-button");
homeButton.addEventListener("click", function() {
	window.location.href = "/home?loggedIn=" + user;
});





/**
 * 
 * Dropdown links to Display for User
 * 
 */
function handleViewProfile(){
  viewingUser = currentUser;
  sessionStorage.setItem("viewingUser", JSON.stringify(viewingUser));
  viewUserProfile(viewingUser);
}



/*

	Clearing the current search

 */
function clearSearch(){
	sessionStorage.setItem("currentSearch", JSON.stringify(""));
	console.log(JSON.parse(sessionStorage.getItem("currentSearch")));
	setSearchPosts();
}

/*

	Redirect the user after clicking on a dropdown option

*/



dropdownLinks.forEach(link => {
	link.addEventListener("click", () => {
		const id = link.id; // id of the dropdown option
		console.log("clickd dropdown id: " + id);
	
	  // Redirect the user to the appropriate location based on the link's ID
		switch (id) {
			case "Edit Profile":
				window.location.href = "/edit-profile?loggedIn=" + user;
				console.log("clickd dropdown id: " + id);
				break;

			case "Sign Up":
				window.location.href = "/register?loggedIn=" + user;
				console.log("clickd dropdown id: " + id);
				break;

			case "View Profile":
				window.location.href = "/profile?loggedIn=" + user;
				console.log("clickd dropdown id: " + id);
				break;

			case "Log In":
				window.location.href = "/login?loggedIn=" + user;
				console.log("clickd dropdown id: " + id);
				break;

			case "Sign Out":
				window.location.href = "/home?loggedIn=guest"
				console.log("clickd dropdown id: " + id);
				break;

			case "Change Password":
				window.location.href = "/change-password?loggedIn=" + user;
				console.log("clickd dropdown id: " + id);
				break;

			default:
				window.location.href = "/home?loggedIn=" + user;
				console.log("clickd dropdown id: " + id);
				break;
	  	}
	});
});


/*

	Enter Search

 */
function enterSearch(event){
	event.preventDefault();

	let searchInput = document.getElementById("search");
	let searchTerms = searchInput.value;

	// let currentUser = $("#currentUser-navuser").text();
	// console.log(currentUser);
	console.log("home button user:" + user);

	if(user == "")
        user = "guest";

	window.location.href = "home?loggedIn=" + user + `&search=${encodeURIComponent(searchTerms)}`; // add logged in?

	//setSearch(searchTerms); // sets the currentSearch
	
	//setSearchPosts(); // should set currentSearchPosts in sessionStorage 
	//might have to be done in another part of the program

	// let a = JSON.parse(sessionStorage.getItem("currentSearch"));
	// let b = JSON.parse(sessionStorage.getItem("currentSearchPosts"));
	// console.log(a);
	// console.log(b);

	//window.location.href = "index.html"; // redirect user to index

}



// /*
	
// 	Sign Out Function
	
//  */
// function handleSignOut(event) {
//   event.preventDefault();
  

//   // set current user to guest
//   sessionStorage.setItem("currentUser", JSON.stringify(userGuest));
//   location.reload();
//   window.location.href = "/home";
// }

/*

	Setting the posts that will pop-up based on the currentSearch
	TO DO: 
 */
// function setSearchPosts(){
// 	let searchTerms = JSON.parse(sessionStorage.getItem("currentSearch"));
// 	let posts = JSON.parse(sessionStorage.getItem("currentPosts"));

// 	searchTerms = searchTerms.toLowerCase();

// 	let searchPosts = posts.filter(function(post) {

// 		let postTitle = post.title.toLowerCase(); 
// 		let postDescription = post.description.toLowerCase();

// 		// Check if the title or description content contains the search term
// 		return (postTitle.includes(searchTerms) || postDescription.includes(searchTerms));
// 	});

// 	sessionStorage.setItem("currentSearchPosts", JSON.stringify(searchPosts));
// }


/*

load dropdown to be done somewhere else

*/


// function loadDropdown() {
//   const guestDropdown = [
// 	{ label: "Sign Up", link: "login.html" },// /register
//   ];

//   const userDropdown = [
// 	{ label: "Edit Profile", link: "edit_profile.html" },// /edit_profile
// 	{ label: "Switch Account", link: "login.html" },// /login
// 	{ label: "Sign Out", link: "index.html" },// /home MAKE THE USER ACTUALLY LOG OUT
// 	{ label: "Change Password", link: "change_password.html" },// /remove?
// 	{ label: "View Profile", link: "profile.html"}// /profile
//   ];


//   // take the current user
//   //let user = JSON.parse(sessionStorage.getItem("currentUser"));
//   let currentUser =$("#currentUser-navuser").text();
//   console.log()

//   let isLoggedIn = !(currentUser === "guest");
//   console.log(currentUser);
//   console.log(isLoggedIn);

//   if(isLoggedIn){
// 	dropdownItems(userDropdown);
//   } else{
// 	dropdownItems(guestDropdown);
//   }
// }

// loadDropdown();

/*

	Display dropdown items

 */
// function dropdownItems(toDropdown) {

// 	toDropdown.forEach(item => {
// 		const menuItem = document.createElement("a");
// 		menuItem.href = item.link;
// 		menuItem.textContent = item.label;

// 		if (item.label === "Sign Out") {
// 			menuItem.addEventListener("click", handleSignOut);
// 		}

// 		if (item.label === "View Profile") {
// 			menuItem.addEventListener("click", handleViewProfile);
// 		}

// 		dropdown.appendChild(menuItem);
// 	});
// }