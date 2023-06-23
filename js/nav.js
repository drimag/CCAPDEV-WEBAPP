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
            // function myFunction() {
            //     var dropdown = document.getElementById('dropdown');
                
            //     dropdown.classList.toggle('show');
            //   }
              
            //               // Close the dropdown if the user clicks outside of it
            //               window.onclick = function(event) {
            //     if (!event.target.matches('.dropdown-button')) {
            //       var dropdowns = document.getElementsByClassName("dropdown-content");
            //       for (var i = 0; i < dropdowns.length; i++) {
            //         var openDropdown = dropdowns[i];
            //         if (openDropdown.classList.contains('show')) {
            //           openDropdown.classList.remove('show');
            //         }
            //       }
            //     }
            //   };

