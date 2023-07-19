$(document).ready(function() {
    $("#latest-feed-comments").hide();
    
    const currentUser = $("#currentUser-navuser").text();

    // TODO: View Comment Opens the Post
    
    // View One Post
    $("div.post-container").click(function() {
        console.log("View Post");
        const id = $(this).attr('id');
        console.log(id);
        location.href = "/posts/" + id.substring(1).trimEnd() + "?loggedIn=" + currentUser;
        
        
    });

    $("div.post-container").hover(function() {
        $(this).css('cursor', 'pointer');
    });

    // TODO: View One Post From Comment !!!
    
    // View Latest Comments
    $("#latest-comments").click(function() {
        $("#latest-feed-posts").hide();
        $("#latest-feed-comments").show();
        $(this).addClass("active");
        $("#latest-posts").removeClass("active");
    });

    // View Latest Posts
    $("#latest-posts").click(function() {
        $("#latest-feed-comments").hide();
        $("#latest-feed-posts").show();
        $(this).addClass("active");
        $("#latest-comments").removeClass("active");
    });

    // TODO: Show Edit Profile Button if profile view is current user !!!
    let userProfile = $("#profile-username").text();
    console.log("userProfile = " + userProfile);
    userProfile = userProfile.substring(1).trimEnd();
    console.log("userProfile = " + userProfile);
    
    if(userProfile === currentUser) {
        $("#edit-profile").show();
    } else {
        $("#edit-profile").hide();
    }

    // TODO: Limit Posts/Comments Seen On Profile !!!
    /*
     "Show More Posts" button
        Allows the user to see older posts
     */
    let showingPosts = $("#latest-feed-posts").is(':visible');
    let showingComments = $("#latest-feed-comments").is(':visible');

    // Show button when there are hidden posts/comments
    if(showingPosts) {

        // Visitors are limited to seeing 5 latest posts
        $(".post").hide();
        $(".post").slice(-5).show();

        if($(".post:hidden").length > 0) {
            showBtn($("#profile-show-more"), $(".end-of-feed"));
        } else {
            hideBtn($("#profile-show-more"), $(".end-of-feed"));
        }

    } else if(showingComments) {
        
        // Visitors are limited to seeing 5 latest comments
        $(".comment-list").hide();
        $(".comment-list").slice(-5).show();

        if($(".comment-list:hidden").length > 0) {
            showBtn($("#profile-show-more"), $(".end-of-feed"));
        } else {
            hideBtn($("#profile-show-more"), $(".end-of-feed"));
        }
    }
    /*
    if(($(".post:hidden").length > 0 && commentsHidden) ||
       ($(".comment-list:hidden").length > 0 && postsHidden)) {
        $("#profile-show-more").show();
        $(".end-of-feed").hide();
    } else {
        hideBtn($("#profile-show-more"), $(".end-of-feed"));
    }*/
    // Show More Button Functionality
    $("#profile-show-more").on("click", function() {
        $(".post:hidden").slice(-5).show().css("display", "flex");
        $(".comment-list:hidden").slice(-5).show().css("display", "flex");

        // Hide "Show More" button when no more posts/comments are hidden
        if($(".post:hidden").length <= 5 || $(".comment-list:hidden").length <= 5) {
            hideBtn($("#profile-show-more"), $(".end-of-feed"));
        }
    });
});

function showBtn(btn, txt) {
    btn.show();
    txt.hide();
}

function hideBtn(btn, txt) {
    btn.hide();
    txt.show();
}