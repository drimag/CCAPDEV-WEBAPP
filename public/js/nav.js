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
				window.location.href = "/register?loggedIn=guest";
				console.log("clickd dropdown id: " + id);
				break;

			case "View Profile":
				window.location.href = "/profile?loggedIn=" + user;
				console.log("clickd dropdown id: " + id);
				break;

			case "Log In":
				window.location.href = "/login?loggedIn=guest";
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

	console.log("home button user:" + user);

	let currentUser = user;

	if(currentUser === "") currentUser = "guest";

	//location.href = "/home?loggedIn=" + user + `&search=${encodeURIComponent(searchTerms)}`; 
	const redirect = `/home?loggedIn=${currentUser}&search=${searchTerms}`;
	window.location.href = redirect;
}
