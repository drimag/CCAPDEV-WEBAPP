/*
  
  	JS File for NavBar

*/

let users = [];

let currentPosts = JSON.parse(sessionStorage.getItem("currentPosts"));
let viewingPost = JSON.parse(sessionStorage.getItem("viewingPost"));
let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
let userOfPost = viewingPost.user;
let comments = viewingPost.comments; // current comments of the viewed post
console.log('Viewing the Post: ' + viewingPost.title + " of User " + viewingPost.user.name);

/**************************************************/
$(document).ready(function() {
  // Change Post Contents
	$("#post-username").text(userOfPost.username);
	$("#post-pfp").attr("src", userOfPost.img);
	
	$("#post-title").text(viewingPost.title);
	$("#post-content").text(viewingPost.description);
	
	$("#post-votes").text(viewingPost.votes);

	if(currentUser.name != userOfPost.name) {
		$("#delete-post").hide();
		$("#edit-title").hide();
		$("#edit-post").hide();
	}


	// View's Another User's Profile from Post
	$(".pfp").click(function() {
		console.log("Viewing Profile");
		let img = this.getAttribute('src');

		if(img[0] != ".") {
			img = "./" + img;
		}
		
		console.log("Img clicked: " + this.getAttribute('src'));

		for(let user of users) {
			console.log(user.img);

			if(user.img == img) {
				let viewingUser = user;
				sessionStorage.setItem("viewingUser", JSON.stringify(viewingUser));
				console.log("Viewing Profile of " + viewingUser.name);
				break;
			}
		}

		viewUserProfile();
	});
});

// Window location when clicked on profile
function viewUserProfile() {
  window.location = "profile.html";
}

$(document).ready(function() {
	let upvoteCount = 1; 
	let downvoteCount = 1;
	let replyCount = 1;
	let voteValCount = 1;
	let commentPopCount = 1;
	let postButtonCount = 1;
	let commentAreaCount = 1;
	let commentBoxCount = 1;
	let editButtonCount = 1;
	let deleteButtonCount = 1;
	let commentCount = 1;

  	function displayAllComments(post) {
		for(let comment of post.comments) {
			console.log("asdf",comment.description);
			writeComment(comment,".comment-section");
		}
  	}
  
	// Gives every relevant class an id
	$('.edit-button').each(function() {
		let eBID = 'editButton' + editButtonCount;
		$(this).attr('id', eBID);
		editButtonCount++;
	});

	$('.post-details').each(function() {
		let cID = 'comment' + commentCount;
		$(this).attr('id', cID);
		commentCount++;
	});
	
	$('.delete-button').each(function() {
		let dID = 'delButton' + deleteButtonCount;
		$(this).attr('id', dID);
		deleteButtonCount++;
	});

	$('.upvote').each(function() {
		let upvID = 'upvote' + upvoteCount;
		$(this).attr('id', upvID);
		upvoteCount++;
	});


	$('.downvote').each(function() {
		let downvID = 'downvote' + downvoteCount;
		$(this).attr('id', downvID);
		downvoteCount++;
	});


	$('.reply').each(function() {
		let repID = 'reply' + replyCount;
		$(this).attr('id', repID);
		replyCount++;
	});


	$('.vote-value').each(function() {
		let voteValID = 'vote-value' + voteValCount;
		$(this).attr('id', voteValID);
		voteValCount++;
	});

	$('.comment-popup').each(function() {
		let commentPopID = 'comment-popup' + commentPopCount;
		$(this).attr('id', commentPopID);
		commentPopCount++;
	});


	$('.post-button input').each(function() {
		let postButtonID = 'postButton' + postButtonCount;
		$(this).attr('id', postButtonID);
		postButtonCount++;
	});

	$('.comment-area').each(function() {
		let commentAreaID = 'comment-area' + commentAreaCount;
		$(this).attr('id', commentAreaID);
		commentAreaCount++;
	});

	$('.comment-box, .post-container').each(function() {
		let commentBoxID = 'commentBox' + commentBoxCount;
		$(this).attr('id', commentBoxID);
		commentBoxCount++;
	});

	// Open comment box
	$('body').on('click', '.reply',function() {
		let classID = $(this).attr('id');
		let num = classID.slice(-1);
		$(("#comment-popup"+ num)).toggle();
	});

	// Write comment
	$('.comment-popup').on('click', '.post-button input', function() {
		let classID = $(this).attr('id');
		let num = classID.slice(-1);
		console.log("ID", classID);
		console.log("Num:", num);
		let destination = ".comment-section";
		let paragraph = $("#comment-area" + num).val();
		let commentObject = new Comment(viewingPost.user,currentUser, paragraph);
	
		let isInnerComment = $(this).closest('.comment-box').length > 0;
		console.log(isInnerComment);

		if (isInnerComment) {
			let parentCommentBox = $(this).closest('.comment-box');
			let parentCommentBoxId = parentCommentBox.attr('id');
			let commentBoxNum = parentCommentBoxId.slice(-1);

			destination = "#commentBox" + commentBoxNum;
			console.log("destination:",destination);

			writeComment(commentObject, destination);
		} else {
			writeComment(commentObject, destination);
		}
	});

  	// Upvote function
	$('body').on('click', '.upvote',function() {
		let classID = $(this).attr('id');
		let num = classID.slice(-1);
		console.log(classID);
	
		let counterValue = parseInt($("#vote-value"+ num).text());
		let newCounterValue = counterValue;
		
		// Removes vote if clicked again
		if ($(this).hasClass('clicked')) {
			newCounterValue--;
			$('#upvote' + num).removeClass('clicked');

		// Removes effect of opposite vote if clicked
		} else if ($('#downvote' + num).hasClass('clicked')){
			newCounterValue = counterValue + 2;
			$(this).addClass('clicked');
			$('#downvote'+ num).removeClass('clicked');
      
		// When no vote was clicked
		} else{
			newCounterValue++;
			$(this).addClass('clicked');
		}
	
		$("#vote-value"+num).text(newCounterValue);
  
  	});

	//downvote
	$('body').on('click', '.downvote',function() {
		let classID = $(this).attr('id');
		let num = classID.slice(-1);
		
		let counterValue = parseInt($("#vote-value"+ num).text());
		let newCounterValue = counterValue;
		//removes vote if clicked again  
		if ($(this).hasClass('clicked')) {
			newCounterValue++;
			$('#downvote'+ num).removeClass('clicked');
		//removes effect of opposite vote if clicked
		} else if ($('#upvote'+ num).hasClass('clicked')){
			newCounterValue = counterValue - 2;
			$(this).addClass('clicked');
			$('#upvote'+ num).removeClass('clicked');
		//when no vote was clicked
		} else{
			newCounterValue--;
			$(this).addClass('clicked');
		}

		$("#vote-value"+ num).text(newCounterValue);
	});

	// Delete Comment
	$('body').on('click', '.delete-button',function() {
		let classID = $(this).attr('id');
		let num = parseInt(classID.slice(-1))+1;

		console.log(num);
		console.log(classID);

		$("#commentBox"+ num).addClass('deleted');
	});

	// Delete Post
	$("#delete-post").click(function() {
		$(".expanded-container").hide();
		$(".comment-section").hide();
		
		$("body").append('<p style="text-align: center">Post was deleted.</p>');
		console.log("Deleted Post");
	});

	// Edit Post
	$("#edit-post").click(function() {
		let desc = viewingPost.description;

		let textarea = $('<textarea>').val(desc);
		$("#post-content").replaceWith(textarea);

		textarea.on('keydown', function(event) {
		if (event.key === 'Enter') {
			event.preventDefault();
			let editedText = textarea.val();

			let newParagraph = $('<p>').text(editedText).append("<span style='color:gray'> (edited)</span>");
			textarea.replaceWith(newParagraph);
	
		}
		});
	});

	// Edit Title
	$("#edit-title").click(function() {
		let title = viewingPost.title;
		let textarea = $('<textarea>').val(title);
		$("#post-title").replaceWith(textarea);

		textarea.on('keydown', function(event) {
			if (event.key === 'Enter') {
				event.preventDefault();
				let editedText = textarea.val();

				let newParagraph = $('<p style="font-weight: bold">').text(editedText).append("<span style='color:gray'> (edited)</span>");
				textarea.replaceWith(newParagraph);
			}
		});
	});

	// Edit Comment
	$('body').on('click', '.edit-button',function() {
		let classID = $(this).attr('id');
		let num = parseInt(classID.slice(-1))+1;
		console.log(num);
		console.log(classID);

		let postContent = $('#comment'+num);
		let currentText = postContent.text();
	
		let textarea = $('<textarea>').val(currentText);
		postContent.replaceWith(textarea);

		textarea.on('keydown', function(event) {
			if (event.key === 'Enter') {
				event.preventDefault();
				let editedText = textarea.val();

				let newParagraph = $('<p>').text(editedText).append("<span style='color:gray'> (edited)</span>");
				textarea.replaceWith(newParagraph);
			
			}
		});
  	});

  	// Function for comment
	function writeComment(userObject, destination) {
		console.log("destination:",destination);
		const postContainer = document.querySelector(destination);
		const item =
			`<div class="comment-box" id=${'commentBox' + commentBoxCount}>
			<div class="post-no-comment">
				<div class="user-icon">
					<img class="pfp" src="${userObject.user.img}">
				</div>
				<div class="post-details">
					<div class="user">
						<span class="username">${userObject.user.username}</span> <span class="del-edit-buttons"> <button class="edit-button" id=${'editButton' + editButtonCount}></button> <button class="delete-button" id=${'delButton' + deleteButtonCount}></button> </span>
					</div>
					<p class="comment" id=${'comment' + commentCount}>${userObject.description}</p>
					<div class="icons">
						<button class="reply" id=${'reply' + replyCount}></button> 
						<div class="votes">
							<button class="upvote" id=${'upvote' + upvoteCount}></button><span class="vote-value" id=${'vote-value' + voteValCount}>${userObject.votes}</span><button class="downvote" id=${'downvote' + downvoteCount}></button>
						</div>   
					</div>
				</div>
			</div>

			<br>

			<div class="comment-popup" id=${'comment-popup' + commentPopCount}>
				<textarea class="comment-area" id=${'comment-area' + commentAreaCount} rows="10" cols="87" placeholder="Comment here..."></textarea>
				<div class="post-button">
					<input type="button" id=${'postButton' + postButtonCount} value="Reply">
				</div>
			</div>  
		</div>`;
	
		postContainer.innerHTML += item;
		upvoteCount++;
		voteValCount++;
		downvoteCount++;
		commentBoxCount++;
		commentPopCount++;
		postButtonCount++;
		commentAreaCount++;
		replyCount++;
		editButtonCount++;
		deleteButtonCount++;
		commentCount++;
		console.log("Posted.");
	}

	displayAllComments(viewingPost);
});

/*********************************************************************/
class User {
  constructor(name, password) {
	this.name = name;
	this.lname = this.name.toLowerCase();
	this.username = "@" + this.lname;
	this.password = password;
	this.acc = "#user-" + name;
	this.img = "./profilepics/" + this.lname + ".jpg";
	this.bio = "test bio";
  }
}

let userGuest = new User("Guest", "1234");
let userSakura = new User("Sakura", "letmeplay");
let userChaewon = new User("Chaewon", "tyforsupportingus");
let userYunjin = new User("Yunjin", "IGOTACONDOINMANHATTAN");
let userKazuha = new User("Kazuha", "bang!");
let userEunchae = new User("eunchae", "mubankpresident");

users.push(userSakura, userChaewon, userYunjin, userKazuha, userEunchae);


const Comment = function(repliedTo, user, description) {
  this.repliedTo = repliedTo;
  this.user = user;
  this.description = description;
  this.votes = 0;
  this.comments = [];
}
/*********************************************************************/

if(currentUser == null) {
  currentUser = userYunjin;
} 


