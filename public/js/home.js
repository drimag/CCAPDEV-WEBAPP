
// View Post
$(document).ready(function() {
    $("div.post").click(async function() {
        console.log("View Post");
        const id = $(this).attr('id');
        console.log(id);
        
        location.href = "/posts/" + id.substring(4, id.length);
        
    });

    $("div.post").hover(function() {
        $(this).css('cursor', 'pointer');
    });

    $(".current-user").hover(function() {
        $(this).css('cursor', 'pointer');
    });

    $("button").hover(function() {
        $(this).css('cursor', 'pointer');
    });

    // Guests and users are limited to seeing 20 latest posts
    const posts = $(".post");
    let numOfPosts = $(".posts .post").length;

    posts.hide();
    posts.slice(numOfPosts - 20, numOfPosts).show();
    
    /*
     "Show More Posts" button
        Allows the user to see older posts
     */
    const showMoreBtn = $("#home-show-more");
    const endOfFeedTxt = $(".end-of-feed");
    const hiddenPosts = $(".post:hidden");
    let noOfHiddenPosts = hiddenPosts.length;
        
    // Show button when there are hidden posts
    if(noOfHiddenPosts > 0) {
        showMoreBtn.show();
        endOfFeedTxt.hide();
    } else {
        emptyFeed(showMoreBtn, endOfFeedTxt);
    }

    /* ill go to my laptop
    const searchParams = new URLSearchParams(new URL("/home").search);
    const currentUser = searchParams.get("username");

    // Current user is a guest
    if(currUser === "guest") {
        // Redirect guest to login page
        window.location.replace("/login");
    } else {
        put show more button functionality here
        if the if statement is ok na
    }
    */
    // Functionality
    showMoreBtn.on("click", function() {
        hiddenPosts.slice(0, 20).show().css("display", "flex");

        // Hide "Show More Posts" button when no more posts are hidden
        if(noOfHiddenPosts <= 20) {
            emptyFeed(showMoreBtn, endOfFeedTxt);
        }
    });
    
    /*
    if(currentUser === "guest") {
        // TODO: Show description snippet only
        // lalalalalalalalalala
        
    } //else {
        //$(".home-description").show();
        //$(".descsnippet").hide();
        //console.log("Switched to User");
    //}*/
})

function emptyFeed(btn, txt) {
    btn.hide();
    txt.show();
}