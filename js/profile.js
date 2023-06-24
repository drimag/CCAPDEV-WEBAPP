let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let currentPosts = JSON.parse(localStorage.getItem("currentPosts"));

console.log(currentPosts);

$(document).ready(function() {
    $("#profile-username").text(currentUser.username);
    $("#profile-img").attr("src", currentUser.img);
    $("#profile-bio").text(currentUser.bio);

    $("#latest-comments").click(function() {
        console.log("Viewing latest comments");
        let feedContainer = document.querySelector("#latest-feed");
        $(this).addClass("active");
        $("#latest-posts").removeClass("active");
        feedContainer.innerHTML = "";
        // displayAllComments();
    });

    $("#latest-posts").click(function() {
        console.log("Viewing latest posts");
        let feedContainer = document.querySelector("#latest-feed");

        $(this).addClass("active");
        $("#latest-comments").removeClass("active");

        feedContainer.innerHTML = "";
        displayAllPosts(currentPosts);
    });

    $("#edit-profile").click(function() {
        console.log("Editing Profile");
        window.location = "edit_profile.html";
    })

    // Show first 3 posts
    $(".post").slice(0,3).show();

    $("#show-more-button").on("click", function() {
        // Show 3 more posts when "Show More" button is clicked
        $(".post:hidden").slice(0,2).show();

        // Hide button
        if($(".post:hidden").length == 0) {
            $("#show-more-button").hide();
        }
    })
});

function displayAllPosts(posts) {
    let reversedposts = posts;
    reversedposts.reverse();

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
    const postContainer = document.querySelector("#latest-feed");
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
                        <span class="downvote"></span>
                    </div>
                </div>
            </div>`;

    postContainer.innerHTML += item;
}

// TODO: writeComment()

displayAllPosts(currentPosts);

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