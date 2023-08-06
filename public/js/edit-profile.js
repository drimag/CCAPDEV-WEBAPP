/*

  JS File for Edit Profile

*/

/*

  Changes the Displayed Profile Picture of the Current User

 */

const pfpInput = document.getElementById("pfp");
pfpInput.addEventListener("change", function (e) {
	const maxFileSize = 8 * 1024 * 1024; // 8MB in bytes

	if (this.files[0].size > maxFileSize) {
		alert("Image size exceeds the maximum limit of 8MB.");
		return;
	}

	let reader = new FileReader();

	reader.onload = function(e) {
		let profileImage = document.getElementById("profile-image");
		profileImage.src = e.target.result;
	}

	reader.readAsDataURL(this.files[0]);
});

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

		// take img info from displayed pfp
		let newPFPsrc = document.getElementById('profile-image').src;
		console.log("newPFPsrc thing: " + newPFPsrc);

		let [newPFPcontent, newPFPdata] = newPFPsrc.split(",");
		let newPFPtype = newPFPcontent.replace("data:image/", "");
		newPFPtype = newPFPtype.replace(";base64", "");

		// take the currently logged in user
		const currentURL = window.location.href;
		const params = new URLSearchParams(new URL(currentURL).search);

		// Make a POST request to the server with the data
		const data = {
			newUsername: newUsername,
			newBio: newBio,
			newPFPdata: newPFPdata,
			newPFPtype: newPFPtype
		};
		const jString = JSON.stringify(data);

		if(!((newUsername.length < 20) && (newUsername.length > 0))){
			alert("username must be between 1 - 20 characters");
			return;
		} else if (newBio.length > 160){
			alert("Bio must be within 160 characters");
			return;
		} else {
			try {
			const response = await fetch('/edit-profile', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', },
				body: jString
			})

			console.log(response);

			if(response.status === 200) {
				console.log("Profile Edit Successful");
				location.href = "/profile/"+ newUsername;
			} else {
				console.log("Status code received: " + response.status);
				location.href = "/home";
				alert("There was an error editing your profile");
			}
			} catch (err) {
				console.error(err);
				location.href = "/home";
				alert("There was an error editing your profile");
			}
		}

		
	} 

  	$('#bio-form').submit(saveProfileEdit);
});
  
