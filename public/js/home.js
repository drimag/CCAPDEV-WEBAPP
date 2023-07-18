// View Post
$(document).ready(function() {

    // Hide Create Post Func From Guest
    let currentUser = $("#current-username").text();
    currentUser = currentUser.substring(2, currentUser.length - 1);
    console.log(currentUser);

    const login = "/login";

    $("#visitor-note").hide();

    if(currentUser === "guest") {
        console.log("Hidden for Vistor");
        $(".post-creation-container").hide();
        $("#visitor-note").show();
        $(".home-description").addClass("one-line");
    }

    
    // Upvote
    $("button.upvote").click(function() {
        alert("Upvoted! (Work on this, it seems to still access the div.post click)");
    });

    // Downvote
    $("button.downvote").click(function() {
        alert("Downvoted! (Work on this, it seems to still access the div.post click)");
    });

    $("div.post").click(function() {
        console.log("View Post");
        const id = $(this).attr('id');
        console.log(id);
        
        if(currentUser === "guest") {
            location.href = login;
        } else {
            location.href = "/posts/" + id.substring(4, id.length) + "?loggedIn=" + currentUser;
        }
        
    });

    $("div.post").hover(function() {
        $(this).css('cursor', 'pointer');
    });

    // View Current User Profile
    $("div.current-user").click(function() {
        console.log('View Profile');
        console.log(currentUser);

        if(currentUser === "guest") {
            location.href = login;
        } else {
            location.href = "/profile/" + currentUser + "?loggedIn=" + currentUser;
        }
    });

    $("div.current-user").hover(function() {
        $(this).css('cursor', 'pointer');
    });

    $("button").hover(function() {
        $(this).css('cursor', 'pointer');
    });

    // Guests and users are limited to seeing 20 latest posts
    let numOfPosts = $(".posts .post").length;

    $(".post").hide();
    $(".post").slice(numOfPosts - 20, numOfPosts).show();
    
    /*
     "Show More Posts" button
        Allows the user to see older posts
     */
    // Show button when there are hidden posts
    if(hiddenPosts.length > 0) {
        $("#home-show-more").show();
        $(".end-of-feed").hide();
    } else {
        emptyFeed($("#home-show-more"), $(".end-of-feed"));
    }

    /*
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
    $("#home-show-more").on("click", function() {
        $(".post:hidden").slice(0, 20).show().css("display", "flex");

        // Hide "Show More Posts" button when no more posts are hidden
        if(hiddenPosts.length <= 20) {
            emptyFeed($("#home-show-more"), $(".end-of-feed"));
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