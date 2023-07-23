/*

  JS File for Edit Profile

*/

/*

  Changes the Displayed Profile Picture of the Current User

 */
function changePFP(input){
	let reader = new FileReader();
	
	reader.onload = function(e) {
		document.getElementById('profile-image').src = e.target.result;
	}

	reader.readAsDataURL(input.files[0]);
}

// TODO: 
// Leave without saving ? 
// probably remove everything else


/*

  Saves the edits changed to the User Profile
  
 */
$(document).ready(function() {
	async function saveProfileEdit(event) {
		event.preventDefault();

		// edit profile values
		let form = document.getElementById("bio-form");
		let newUsername = form.elements["username"].value.trim();
		let newBio = form.elements["bio"].value;
		// let newPFP = form.elements["pfp"].files[0];


		// take the currently logged in user
		const currentURL = window.location.href;
		const params = new URLSearchParams(new URL(currentURL).search);
		const currentUser = params.get("loggedIn");

		// Make a POST request to the server with the data

		const data = {
			currentUser: currentUser,
			newUsername: newUsername,
			newBio: newBio
			//newPFP: newPFP
		};

		const jString = JSON.stringify(data);

		try {
			const response = await fetch('/edit-profile', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', },
			body: jString
			})

			console.log(response);

			if(response.status === 200) {
				console.log("Profile Edit Successful");
				location.href = "/home?loggedIn=" + newUsername;
			} else {
				console.log("Status code received: " + response.status);
			}
		} catch (err) {
			console.error(err);
		}
	} 

  	$('#bio-form').submit(saveProfileEdit);
});


/*

//   Changes fields based on the Current User
  
//  */
// let theUser = JSON.parse(sessionStorage.getItem("currentUser"));

// console.log("The Current User is " + theUser.name);

// if(theUser.lname != "guest"){
//   document.getElementById("profile-image").src = theUser.img;
//   document.getElementById("username").placeholder = theUser.name;
//   document.getElementById("bio").value = theUser.bio;
// }  

  // oldPFP = theUser.img;

  // let reader = new FileReader();
  // reader.onload = function(e) {
  //   document.getElementById('profile-image').src = e.target.result;
  // }

  // if (pfp) {
  //   reader.readAsDataURL(pfp); // Read the image file as data URL
  // }
  
  // if(!username){
  //   theUser = new User(theUser.name, theUser.password);
  // } else {
  //   theUser = new User(username, theUser.password);
  // }

  // theUser.bio = bio;

  // let selectedImage = pfp ? URL.createObjectURL(pfp) : theUser.img; // Use selected image or existing image
  // theUser.img = selectedImage;
  // theUser.img = "profilepics/IU.png";
  // if(!pfp){
  //   theUser.img = oldPFP;
  // }
  
  // sessionStorage.setItem("pfp", JSON.stringify(pfp));

  // sessionStorage.setItem("currentUser", JSON.stringify(theUser));

  // window.location.href = "index.html";