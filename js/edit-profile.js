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
//let theUser = userSakura;

console.log(theUser);
console.log(theUser.lname != "guest");
console.log();

if(theUser.lname != "guest"){
  document.getElementById("profile-image").src = theUser.img;
  document.getElementById("username").placeholder = theUser.name;
  document.getElementById("bio").value = theUser.bio;
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