/*

  JS File for Edit Profile

*/

/*

  Changes the Displayed Profile Picture of the Current User

 */

const pfpInput = document.getElementById("pfp");
pfpInput.addEventListener("change", function (e) {
	let reader = new FileReader();

	reader.onload = function(e) {
		let profileImage = document.getElementById("profile-image");
		profileImage.src = e.target.result;
	}

	reader.readAsDataURL(this.files[0]);
});

// const pfpUpload = document.getElementById("pfp");
// pfpUpload.addEventListener("change", function (input) {
// 	if (input.files && input.files[0]) {
// 		const reader = new FileReader();
	
// 		reader.onload = function (e) {
// 		  const profileImage = document.getElementById("profile-image");
// 		  console.log(profileImage);
// 		  profileImage.setAttribute("src", e.target.result);
// 		  profileImage.style.display = "block"; // Show the image
// 		};
	
// 		reader.readAsDataURL(input.files[0]);
// 	  }
// });


// TODO: 
// Leave without saving ? 
// probably remove everything else

/*

  Saves the edits changed to the User Profile
  
 */

async function readFileAsDataURL(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = function (e) {
			resolve(e.target.result);
		};
		reader.onerror = function (error) {
			reject(error);
		};
		reader.readAsDataURL(file);
	});
}

$(document).ready(function() {
	async function saveProfileEdit(event) {
		event.preventDefault();

		// edit profile values
		let form = document.getElementById("bio-form");
		let newUsername = form.elements["username"].value.trim();
		let newBio = form.elements["bio"].value;

		let pfpInput = form.elements["pfp"];

		let newPFPtype;
		let newPFPdata;

		// take the currently logged in user
		const currentURL = window.location.href;
		const params = new URLSearchParams(new URL(currentURL).search);
		const currentUser = params.get("loggedIn");

		// take the base64 encoded image and filetype

		// if (pfpInput.files.length > 0) {
		// 	let reader = new FileReader();
			
		// 	reader.onload = function(e) {
		// 		let PFPdata = e.target.result;
		// 		let PFPtype = pfpInput.files[0].type;

		// 		let dataIndex = PFPdata.indexOf(",") + 1;
		// 		let typeIndex = PFPtype.indexOf("/") + 1;

		// 		newPFPdata = PFPdata.substring(dataIndex);
		// 		newPFPtype = PFPtype.substring(typeIndex);
		// 	};
			
		// 	//Start reading the selected file as a data URL
		// 	reader.readAsDataURL(pfpInput.files[0]);
		// } else {
		// 	// No new pfp
		// 	console.log("no new pfp")
		// }

		try {
			let PFPdata = await readFileAsDataURL(pfpInput.files[0]);
			let PFPtype = pfpInput.files[0].type;

			let dataIndex = PFPdata.indexOf(",") + 1;
			let typeIndex = PFPtype.indexOf("/") + 1;

			newPFPdata = PFPdata.substring(dataIndex);
			newPFPtype = PFPtype.substring(typeIndex);

		} catch (error) {
			console.log("error reading file upload" + error);
		}
		

		console.log("newpfp data: " + newPFPdata);
		console.log("newpfp type: " + newPFPtype);

		// Make a POST request to the server with the data

		const data = {
			currentUser: currentUser,
			newUsername: newUsername,
			newBio: newBio,
			newPFPdata: newPFPdata,
			newPFPtype: newPFPtype
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
				//location.href = "/home?loggedIn=" + newUsername;
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