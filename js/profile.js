let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
let currentPosts = JSON.parse(sessionStorage.getItem("currentPosts"));
let viewingUser = JSON.parse(sessionStorage.getItem("viewingUser"));
let currentComments = JSON.parse(sessionStorage.getItem("currentComments"));
console.log(currentComments);

console.log("Current User: " + currentUser.username);
console.log("Current Total Posts: " + currentPosts.length);
console.log("Viewing User: " + viewingUser.username);

$(document).ready(function() {
    $("#profile-username").text(viewingUser.username);
    $("#profile-img").attr("src", viewingUser.img);
    $("#profile-bio").text(viewingUser.bio);
    $("#latest-feed-comments").hide();

    displayAllPosts(currentPosts);
    displayAllComments(currentComments);

    // Hide/Show Edit Profile Button depending on the current user and shown user profile
    if(viewingUser.username != currentUser.username) {
        $("#edit-profile").hide();
    } else {
        $("#edit-profile").show();
    }

    $("#latest-comments").click(function() {
        console.log("Viewing latest comments");

        $(this).addClass("active");
        $("#latest-posts").removeClass("active");

        $("#latest-feed-posts").hide();
        $("#latest-feed-comments").show();
    });

    $("#latest-posts").click(function() {
        console.log("Viewing latest posts");
        
        $(this).addClass("active");
        $("#latest-comments").removeClass("active");
        $("#latest-feed-posts").show();
        $("#latest-feed-comments").hide();
    });

    $("#edit-profile").click(function() {
        console.log("Editing Profile");
        window.location = "edit_profile.html";
    })

    let numOfPosts = $('.posts .post').length;
    
    // Show 3 latest posts
    $(".post").hide();
    $(".post").slice(numOfPosts - 3, numOfPosts).show();

    // clean this: appears in script.js also
    // FIX: format of showed more posts is wrong
    $("#show-more-button").on("click", function() {
        // Show 3 more posts when "Show More" button is clicked
        $(".post:hidden").slice(0,4).show();

        // Hide button
        if($(".post:hidden").length == 0) {
            $("#show-more-button").hide();
        }
    })
});

function displayAllPosts(posts) {
    for(let post of posts) {
        console.log("User's post: " + post.user.username);
        if(post.user.username == viewingUser.username) {
            writePost(post.user, post);
        }
    }
}

// TODO: displayAllComments()
function displayAllComments(comments) {
    for(let comment of comments) {
        console.log("User " + comment.user + " replied to " + comment.repliedTo);
        if(comment.user.username == viewingUser.username) {
            writeComment(comment.user, comment);
        }
    }
}

console.log(currentPosts);

function writePost(user, post) {
    const postContainer = document.querySelector("#latest-feed-posts");
    const item =
            `<div class="flex-row-container post">
                <div>
                    <img class="user ${user.lname}" src="${user.img}">
                </div>

                <div class="flex-column-container post-details" id="post${post.num}">
                    <p class="username"> ${user.username} </p>
                    <p class="post-title"> ${post.title} </p>
                    <p class="description"> ${post.description} </p>
                    
                    <div class="actions">
                        <span class="comment"></span>
                        <span class="upvote"></span>
                        <span class="number"> ${post.votes} </span>
                        <span class="downvote"></span>
                    </div>
                </div>
            </div>`;

    postContainer.innerHTML += item;
}

// TODO: writeComment()
function writeComment(user, comment) {
    const postContainer = document.querySelector("#latest-feed-comments");
    const item =
            `<div class="flex-row-container post">
                <div>
                    <img class="user ${user.lname}" src="${user.img}">
                </div>

                <div class="flex-column-container post-details">
                    <p class="username"> ${user.username} </p>
                    <p class="post-title"> Replied to ${comment.repliedTo.username} </p>
                    <p class="description"> ${comment.description} </p>
                    
                    <div class="actions">
                        <span class="comment"></span>
                        <span class="upvote"></span>
                        <span class="number"> ${comment.votes} </span>
                        <span class="downvote"></span>
                    </div>
                </div>
            </div>`;

    postContainer.innerHTML += item;
}
