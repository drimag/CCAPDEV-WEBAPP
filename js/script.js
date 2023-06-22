const User = function(name, password) {
    this.name = name;
    this.lname = this.name.toLowerCase();
    this.username = "@" + this.lname;
    this.password = password;
    this.acc = "#user-" + name;
    this.img = "./profilepics/" + this.lname + ".jpg";
    this.bio = "";
}


let userGuest = new User("Guest", "1234");
let currentUser = userGuest;
let userSakura = new User("Sakura", "letmeplay");
let userChaewon = new User("Chaewon", "tyforsupportingus");
let userYunjin = new User("Yunjin", "IGOTACONDOINMANHATTAN");
let userKazuha = new User("Kazuha", "bang!");
let userEunchae = new User("eunchae", "mubankpresident");

/*
FUNCTIONS TO DO:
- show edit button
- view profile
- create post
- create comment
- view post
- upvote downvote post comment
- search
- view profile
-view all posts 
- view latest comments and posts
- login logout
*/

const Post = function(num, title, description, user, comments = []) {
    this.num = num;
    this.title = num.toString() + ". " + title;
    this.descsnippet = description.substr(0, 20);
    this.user = user;
    this.description = description;
    this.upvotes = 0;
    this.downvotes = 0;
    this.comments = comments;
}

const Comment = function(user, description, comments = []) {
    this.user = user;
    this.description = description;
    this.upvotes = 0;
    this.downvotes = 0;
    this.comments = comments;
}

function switchUser(newUser) {
    $(document).ready(function() {
        $("#current-username").text(newUser.username);
        $("#user-selected").attr("src", newUser.img);
        currentUser = newUser;
        localStorage.clear();
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        console.log(localStorage);
    });
}

function viewingProfile(user) {
    $(document).load(function() {
        console.log("Current User Profile: " + user.name);
        $("#profile-img").attr("src", user.img);
        $("#profile-username").text("hello");
        $("#profile-bio").text("it worked");
    });
}

function hideEditProfile(user) {
    const editProfileButton = document.getElementsByName("Edit Profile");

    // Show edit profile button
    $(document).ready(function() {
        if(currentUser.id === viewingProfile.id) {
            //editProfileButton.show();
            editProfileButton.style.display = "block";
        // Hide edit profile button
        } else {
            //editProfileButton.hide();
            editProfileButton.style.display = "none";
        }
    });
}

// Switching User on Home Page
$(document).ready(function() {
    // View Current User's Profile
    $("#user-selected").click(function() {
        if(currentUser == userGuest) {
            window.location = "login.html";
        } else {
            window.location = "profile.html";
            console.log(localStorage);
            currentUser = JSON.parse(localStorage.getItem('currentUser'));
            console.log("Viewing Current User's Profile: " +  currentUser.name);
            viewingProfile(currentUser);
        }
    });

    $("#user-guest").click(function() {
        let user = userGuest;
        console.log(user.name);
        switchUser(user);
   });

    $("#user-sakura").click(function() {
        let user = userSakura;
        console.log(user.name);
        switchUser(user);
   });

    $("#user-chaewon").click(function() {
        let user = userChaewon;
        console.log(user.name);
        switchUser(user);
    });

   $("#user-yunjin").click(function() {
        let user = userYunjin;
        console.log(user.name);
        switchUser(user);
   });

   $("#user-kazuha").click(function() {
        let user = userKazuha;
        console.log(user.name);
        switchUser(user);
    });

    $("#user-eunchae").click(function() {
        let user = userEunchae;
        console.log(user.name);
        switchUser(user);
    });
});

/*
const allPosts = [];
document.getElementsByClassName("post").innerHTML = allPosts;
// OR?
const allPosts = Array.from(document.getElementsByClassName(".post"));

// Refreshes the post-container according to the post contents of displayedPosts
function refreshDisplay(displayedPosts) {
    if (allPosts.length > 0) {
        displayPosts(displayedPosts);
    }
}

// Submit Post
function submitPost(newPost) {
    let user = newPost.user;
    const post = "<div class='posts flex-column-container'>" +
                    "<div class='flex-row-container post'>" +
                        "<div>" +
                            "<img class='user' src='" + currentUser.img + "'>" +
                        "</div>" +
                        
                        "<div class='flex-column-container post-details'>" +
                            "<p class='username'>" + currentUser + "</p>"
                            "<p class='post-title'>" + newPost.title + "</p>" +
                            "<p class='description'>" + newPost.description + "</p>" +

                            "<div class="actions">" +
                                "<span class="comment"></span>" +
                                "<span class="upvote"></span>" +
                                "<span class="downvote"></span>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                "</div>";
                
    document.querySelector("posts").innerHTML += post;
}





Profile Page Functions

let viewingProfile = "profile.html";

allPosts.forEach(checkUsersPostsAndComments());

function checkUsersPostsAndComments(element) {

    if(currentUser === postAuthor) {
        $(".comment").show();
    }
}





// Display user's latest posts
$(document).ready(function() {
    $(".latestposts a").click(function() {
        if(currentUser === postAuthor) {
            $(".post").show();
        }
    })
});

// Display user's latest comments
$(document).ready(function() {
    $(".latestcomments a").click(function() {
        if(currentUser === postAuthor) {
            $(".comment").show();
        }
    })
});

// "Show More Posts" button to show more posts
function showMorePosts() {
    $(document).ready(function() {
        $(".show-more-posts-button").click(function() {
            if(currentUser === postAuthor) {
                listOfPosts.toggle();
            }
        })
    });
}








// "Edit Profile" button to only appear for the logged in user under their own profile

const editProfileButton = document.getElementsByName("Edit Profile");

// Show edit profile button
$(document).ready(function() {
    if(currentUser.id === viewingProfile.id) {
        editProfileButton.show();
        // editProfileButton.style.display = "block";
    // Hide edit profile button
    } else {
        editProfileButton.hide();
        // editProfileButton.style.display = "none";
    }
});
*/