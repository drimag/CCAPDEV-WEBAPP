/*

  JS File for Edit Profile

*/


/*

  Changes the Profile Picture of the Current User

 */
function changePFP(input){
  let reader = new FileReader();
  
  reader.onload = function(e) {
    document.getElementById('profile-image').src = e.target.result;
  }

  reader.readAsDataURL(input.files[0]);
}

/*

  Changes fields based on the Current User
  
 */
let theUser = JSON.parse(sessionStorage.getItem("currentUser"));

console.log("The Current User is " + theUser.name);

if(theUser.lname != "guest"){
  document.getElementById("profile-image").src = theUser.img;
  document.getElementById("username").placeholder = theUser.name;
  document.getElementById("bio").value = theUser.bio;
}


/*

  Saves the edits changed to the User Profile
  
 */
function saveProfileEdit(event) {
  event.preventDefault();

  let form = document.getElementById("bio-form");
  let username = form.elements["username"].value;
  let bio = form.elements["bio"].value;
  let pfp = form.elements["pfp"].files[0];

  oldPFP = theUser.img;

  let reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById('profile-image').src = e.target.result;
  }

  if (pfp) {
    reader.readAsDataURL(pfp); // Read the image file as data URL
  }
  
  if(!username){
    theUser = new User(theUser.name, theUser.password);
  } else {
    theUser = new User(username, theUser.password);
  }

  theUser.bio = bio;

  let selectedImage = pfp ? URL.createObjectURL(pfp) : theUser.img; // Use selected image or existing image
  theUser.img = selectedImage;
  theUser.img = "profilepics/IU.png";
  if(!pfp){
    theUser.img = oldPFP;
  }
  
  sessionStorage.setItem("pfp", JSON.stringify(pfp));

  sessionStorage.setItem("currentUser", JSON.stringify(theUser));

  window.location.href = "index.html";
}