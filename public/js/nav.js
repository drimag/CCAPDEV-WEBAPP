/*
  JS File for NavBar
*/

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
	console.log("deez nuts");
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
				console.log("joe mama");
			}
		}
  	}
};

/*
	
	Sign Out Function
	
 */
function handleSignOut(event) {
  event.preventDefault();
  

  // set current user to guest
  sessionStorage.setItem("currentUser", JSON.stringify(userGuest));
  location.reload();
  window.location.href = "/home";
}

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

	Clearing the current search

 */
function clearSearch(){
	sessionStorage.setItem("currentSearch", JSON.stringify(""));
	console.log(JSON.parse(sessionStorage.getItem("currentSearch")));
	setSearchPosts();
}


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

	Enter Search

 */
function enterSearch(event){
	event.preventDefault();

	let searchInput = document.getElementById("search");
	let searchTerms = searchInput.value;

	let currentUser = $("#currentUser-navuser").text();
	console.log(currentUser);

	if(currentUser == "" || currentUser === "guest")
        currentUser = "guest";

	location.href = "home?loggedIn=" + currentUser + `&search=${encodeURIComponent(searchTerms)}`; // add logged in?

	//setSearch(searchTerms); // sets the currentSearch
	
	//setSearchPosts(); // should set currentSearchPosts in sessionStorage 
	//might have to be done in another part of the program

	// let a = JSON.parse(sessionStorage.getItem("currentSearch"));
	// let b = JSON.parse(sessionStorage.getItem("currentSearchPosts"));
	// console.log(a);
	// console.log(b);

	//window.location.href = "index.html"; // redirect user to index

}

