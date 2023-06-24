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
  console.log("bacon");

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
