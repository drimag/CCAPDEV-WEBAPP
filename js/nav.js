var prevScrollpos = window.scrollY;
window.onscroll = function() {
  var currentScrollPos = window.scrollY;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-61px";
  }
  prevScrollpos = currentScrollPos;
}

/* When the user clicks on the button,
            toggle between hiding and showing the dropdown content */
function clickDrop() {
  var dropdown = document.getElementById('dropdown');
  dropdown.style.display = "block";
  //console.log("bacon");

}
   
// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  // console.log(event.target);
  // console.log(event.target.matches('i.fas.fa-user-circle'));
  if (!event.target.matches('i.fas.fa-user-circle')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.style.display === "block") {
        openDropdown.style.display = "none";
      }
    }
  }
};

function handleSignOut(event) {
  event.preventDefault();
  
  sessionStorage.setItem("currentUser", JSON.stringify(userGuest));
  location.reload();
  window.location.href = "index.html";
}

// displaying dropdown items
function dropdownItems(toDropdown) {

  toDropdown.forEach(item => {
  const menuItem = document.createElement("a");
  menuItem.href = item.link;
  menuItem.textContent = item.label;

  if (item.label === "Sign Out") {
    menuItem.addEventListener("click", handleSignOut);
  }

  dropdown.appendChild(menuItem);
  });
}

// choose which dropdown links to display depending
// on if logged in or not


function loadDropdown() {
  console.log("gmaing>");
  const guestDropdown = [
    { label: "Sign Up", link: "login.html" },
  ];

  const userDropdown = [
    { label: "Edit Profile", link: "edit_profile.html" },
    { label: "Switch Account", link: "login.html" },
    { label: "Sign Out", link: "index.html" },
    { label: "Change Password", link: "change_password.html" },
    { label: "View Profile", link: "profile.html"}
  ];

  const dropdown = document.getElementById("dropdown");
  sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
  let user = JSON.parse(sessionStorage.getItem("currentUser"));



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



// setting the current search terms 
function setSearch(searchTerms){
  sessionStorage.setItem("currentSearch", JSON.stringify(searchTerms));
}

// clearing the current search
function clearSearch(){
  sessionStorage.setItem("currentSearch", JSON.stringify(""));
  console.log(JSON.parse(sessionStorage.getItem("currentSearch")));
  setSearchPosts();
}


// setting the posts that will pop-up based on the currentSearch
function setSearchPosts(){
  let searchTerms = JSON.parse(sessionStorage.getItem("currentSearch"));
  let posts = JSON.parse(sessionStorage.getItem("currentPosts"));

  searchTerms = searchTerms.toLowerCase();

  var searchPosts = posts.filter(function(post) {

    var postTitle = post.title.toLowerCase(); 
    var postDescription = post.description.toLowerCase();

    // Check if the title or description content contains the search term

    return (postTitle.includes(searchTerms) || postDescription.includes(searchTerms));
  });

  sessionStorage.setItem("currentSearchPosts", JSON.stringify(searchPosts));
  //return(searchPosts);
}


function enterSearch(event){
  event.preventDefault();

  var searchInput = document.getElementById("search");
  var searchTerms = searchInput.value;

  setSearch(searchTerms); // sets the currentSearch
  setSearchPosts(); // should set currentSearchPosts in sessionStorage

  let a = JSON.parse(sessionStorage.getItem("currentSearch"));
  let b = JSON.parse(sessionStorage.getItem("currentSearchPosts"));
  console.log(a);
  console.log(b);

  window.location.href = "index.html"; // redirect user to index

}

