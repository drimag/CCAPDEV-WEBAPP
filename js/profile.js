let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
let currentPosts = JSON.parse(sessionStorage.getItem("currentPosts"));

console.log(currentPosts);

$(document).ready(function() {
    $("#profile-username").text(currentUser.username);
    $("#profile-img").attr("src", currentUser.img);
    $("#profile-bio").text(currentUser.bio);
    $("#latest-feed-comments").hide();

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
        if(post.user.username == currentUser.username) {
            writePost(post.user, post);
        }
    }
}

// TODO: displayAllComments()

console.log(currentPosts);

function writePost(user, post) {
    const postContainer = document.querySelector("#latest-feed-posts");
    const item =
            `<div class="flex-row-container post">
                <div>
                    <img class="user" src="${user.img}">
                </div>

                <div class="flex-column-container post-details">
                    <p class="username"> ${user.username} </p>
                    <p class="post-title"> ${post.title} </p>
                    <p class="description"> ${post.description} </p>
                    
                    <div class="actions">
                        <span class="comment"></span>
                        <span class="upvote"></span>
                        <span class="number"> ${post.upvotes} </span>
                        <span class="downvote"></span>
                        <span class="number"> ${post.downvotes} </span>
                    </div>
                </div>
            </div>`;

    postContainer.innerHTML += item;
}

// TODO: writeComment()

displayAllPosts(currentPosts);
// displayAllComments();

/********************/


/*
// "Show More Posts/Comments" button
let showMorePostsBtn = document.querySelector('#show-more-button');
let numOfPosts = 3;

showMorePostsBtn.onclick = () => {
    let listOfPosts = [...document.querySelectorAll('.flex-column-container .latest .buttons .flex-row-container')];

    for(let i = numOfPosts; i < numOfPosts + 3; i++) {
        listOfPosts[i].style.display = 'inline-block';
    }

    numOfPosts += 3;

    if(numOfPosts >= listOfPosts.length) {
        showMorePostsBtn.style.display = "none";
    }
};
*/