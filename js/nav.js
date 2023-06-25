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


// displaying dropdown items
function dropdownItems(toDropdown) {
  toDropdown.forEach(item => {
  const menuItem = document.createElement("a");
  menuItem.href = item.link;
  menuItem.textContent = item.label;

  dropdown.appendChild(menuItem);
  });
}

// choose which dropdown links to display depending
// on if logged in or not


document.addEventListener("DOMContentLoaded", function() {

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

  let isLoggedIn = !(currentUser.lname === "guest");
  console.log(currentUser.lname);
  console.log(isLoggedIn);

  if(isLoggedIn){
    dropdownItems(userDropdown);
  } else{
    dropdownItems(guestDropdown);
  }
});





