function changePFP(input){
  var url = input.value;
  var reader = new FileReader();
  
  reader.onload = function(e) {
    document.getElementById('profile-image').src = e.target.result;
  }

  reader.readAsDataURL(input.files[0]);
}


// changing fields based on logged in user
let theUser = JSON.parse(sessionStorage.getItem("currentUser"));
if(!theUser){
  theUser = userGuest;
  console.log("user has gamed");
}

console.log(theUser);
console.log(theUser.lname != "guest");
console.log();

if(theUser.lname != "guest"){
  document.getElementById("profile-image").src = theUser.img;
  document.getElementById("username").placeholder = theUser.name;
  document.getElementById("bio").value = theUser.bio;
}

//console.log(JSON.parse(sessionStorage.getItem("pfp")));
// console.log(JSON.parse(sessionStorage.getItem("b")));
// console.log(JSON.parse(sessionStorage.getItem("c")));
// console.log(JSON.parse(sessionStorage.getItem("d")));
// console.log(JSON.parse(sessionStorage.getItem("e")));

function saveProfileEdit(event) {
  event.preventDefault();

  var form = document.getElementById("bio-form");
  var username = form.elements["username"].value;
  var bio = form.elements["bio"].value;
  var pfp = form.elements["pfp"].files[0];

  oldPFP = theUser.img;

  var reader = new FileReader();
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


  var selectedImage = pfp ? URL.createObjectURL(pfp) : theUser.img; // Use selected image or existing image
  theUser.img = selectedImage;
  theUser.img = "profilepics/IU.png";
  if(!pfp){
    theUser.img = oldPFP;
  }
  
  sessionStorage.setItem("pfp", JSON.stringify(pfp));

  sessionStorage.setItem("currentUser", JSON.stringify(theUser));

  window.location.href = "index.html";
}


// $("pfp").on("change", function() {
//   var file = this.files[0]; // Get the uploaded file
//   //var reader = new FileReader();

//   console.log(file);

//   // reader.onload = function(e) {
//   //   var image = document.getElementById("profile-image");
//   //   image.src = e.target.result; // Set the source of the image to the uploaded file
//   // }

//   // reader.readAsDataURL(file); // Read the uploaded file as data URL
// });

// function saveEdit(event) {
//   event.preventDefault();

//   localStorage.setItem("test", "testvalue");

//   // Collect the form input values
  

//   // // Convert the form data to JSON
//   // var jsonData = JSON.stringify(formData);

//   // // Create a Blob object with the JSON data
//   // var blob = new Blob([jsonData], { type: "application/json" });

//   // // Generate a download link
//   // var downloadLink = document.createElement("a");
//   // downloadLink.href = URL.createObjectURL(blob);
//   // downloadLink.download = "form_data.json";
//   // downloadLink.click();
// }

// var formInputs = $("#bio-form input");
//   for (let input of formInputs) {
//     localStorage.setItem(input.name, input.value);
//   }