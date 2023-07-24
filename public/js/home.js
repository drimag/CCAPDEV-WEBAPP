// View Post
$(document).ready(function() {

    // Hide Create Post Func From Guest
    let currentUser = $("#current-username").text();
    currentUser = currentUser.substring(1).trimEnd();
    console.log(currentUser);

    const login = "/login";

    $("#visitor-note").hide();

    if(currentUser === "guest") {
        console.log("Hidden for Vistor");
        $(".post-creation-container").hide();
        $("#visitor-note").show();
        $(".home-description").addClass("one-line");
    }

    $("div.post-container").click(function() {
        console.log("View Post");
        const id = $(this).attr('id');
        console.log(id);

        const title = $(this).find('.post-title').text().trimStart().trimEnd();
        console.log(title);
        
        if(currentUser === "guest") {
            location.href = login;
        } else {
            location.href = "/posts/" + id.substring(1).trimEnd() + "?title="+ title + "&loggedIn=" + currentUser;
        }
    });

    $("div.post-container").hover(function() {
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
    $(".post").hide();
    $(".post").slice(-20).show();
    
    /*
     "Show More Posts" button
        Allows the user to see older posts
     */
    // Show button when there are hidden posts
    if(currentUser === "guest") {
        $("#home-show-more").hide();
        $(".end-of-feed").hide();
        $(".login-to-see-more").show();
    } else {
        $(".login-to-see-more").hide();

        if($(".post:hidden").length > 0) {
            $("#home-show-more").show();
            $(".end-of-feed").hide();
        } else {
            emptyFeed($("#home-show-more"), $(".end-of-feed"));
        }
    }

    // Functionality
    $("#home-show-more").on("click", function() {
        $(".post:hidden").slice(-20).show().css("display", "flex");

        // Hide "Show More Posts" button when no more posts are hidden
        if($(".post:hidden").length <= 20) {
            emptyFeed($("#home-show-more"), $(".end-of-feed"));
        }
    });

    // display/hide search notice if user is searching or not
    const currentURL = window.location.href;
    const params = new URLSearchParams(new URL(currentURL).search);
    const searchTerms = params.get("search");

    if(searchTerms == undefined || searchTerms === ""){ //hide for no search
        console.log("Hidden Search Notice");
        $("#search-notice").hide();
    }
})

function emptyFeed(btn, txt) {
    btn.hide();
    txt.show();
}

// TODO: sort posts by popularity (votes descending)
