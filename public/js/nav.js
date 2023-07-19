import { Router } from 'express';
import { getDb } from '../models/conn.js';

const router = Router();
const db = getDb();
const users = db.collection("users");
const posts = db.collection("posts");

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
	dropdown.style.display = "block";
}
   
/*
	
	Close the dropdown if the user clicks outside of it

 */
window.onclick = function(event) {
	if (!event.target.matches('i.fas.fa-user-circle')) {
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
function dropdownItems(toDropdown) {

	toDropdown.forEach(item => {
		const menuItem = document.createElement("a");
		menuItem.href = item.link;
		menuItem.textContent = item.label;

		if (item.label === "Sign Out") {
			menuItem.addEventListener("click", handleSignOut);
		}

		if (item.label === "View Profile") {
			menuItem.addEventListener("click", handleViewProfile);
		}

		dropdown.appendChild(menuItem);
	});
}



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


function loadDropdown() {
  const guestDropdown = [
	{ label: "Sign Up", link: "login.html" },// /register
  ];

  const userDropdown = [
	{ label: "Edit Profile", link: "edit_profile.html" },// /edit_profile
	{ label: "Switch Account", link: "login.html" },// /login
	{ label: "Sign Out", link: "index.html" },// /home
	{ label: "Change Password", link: "change_password.html" },// /remove?
	{ label: "View Profile", link: "profile.html"}// /profile
  ];


  // take the current user
  //let user = JSON.parse(sessionStorage.getItem("currentUser"));
  let user = req.query.loggedIn;

  let isLoggedIn = !(user.lname === "guest");
  console.log(user.lname);
  console.log(isLoggedIn);

  if(isLoggedIn){
	dropdownItems(userDropdown);
  } else{
	dropdownItems(guestDropdown);
  }
}

loadDropdown();



/*

	Setting the current search terms 

*/
function setSearch(searchTerms){
  	sessionStorage.setItem("currentSearch", JSON.stringify(searchTerms));
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

	Setting the posts that will pop-up based on the currentSearch
	TO DO: 
 */
function setSearchPosts(){
	let searchTerms = JSON.parse(sessionStorage.getItem("currentSearch"));
	let posts = JSON.parse(sessionStorage.getItem("currentPosts"));

	searchTerms = searchTerms.toLowerCase();

	let searchPosts = posts.filter(function(post) {

		let postTitle = post.title.toLowerCase(); 
		let postDescription = post.description.toLowerCase();

		// Check if the title or description content contains the search term
		return (postTitle.includes(searchTerms) || postDescription.includes(searchTerms));
	});

	sessionStorage.setItem("currentSearchPosts", JSON.stringify(searchPosts));
}

/*

	Enter Search

 */
function enterSearch(event){
	event.preventDefault();

	let searchInput = document.getElementById("search");
	let searchTerms = searchInput.value;

	setSearch(searchTerms); // sets the currentSearch
	setSearchPosts(); // should set currentSearchPosts in sessionStorage

	let a = JSON.parse(sessionStorage.getItem("currentSearch"));
	let b = JSON.parse(sessionStorage.getItem("currentSearchPosts"));
	console.log(a);
	console.log(b);

	window.location.href = "index.html"; // redirect user to index

}

