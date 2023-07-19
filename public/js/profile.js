$(document).ready(function() {
    $("#latest-feed-comments").hide();

    // View One Post
    $("div.post").click(async function() {
        console.log("View Post");
        const id = $(this).attr('id');
        console.log(id);
        
        location.href = "/posts/" + id.substring(4, id.length);
        
    });

    $("div.post").hover(function() {
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

    // TODO: Limit Posts/Comments Seen On Profile !!!
    // Visitors are limited to seeing 5 latest posts
    $(".post").hide();
    $(".post").slice(-5).show();

    // TODO: Show Edit Profile Button if profile view is current user !!!
    /*let userProfile = $("#profile-img"); // FIXXXXXX: the profile pic of the visitee
    let currUser = $(".fa-user-circle").img; // FIX: the logged in user profile pic on the navbar
    
    if(userProfile === currUser) {
        $("#edit-profile").show();
    } else {
        $("#edit-profile").hide();
    }*/

    /*
     "Show More Posts" button
        Allows the user to see older posts
     */
    // Show button when there are hidden posts
    if($(".post:hidden").length > 0) {
        $("#profile-show-more").show();
        $(".end-of-feed").hide();
    } else {
        emptyFeed($("#profile-show-more"), $(".end-of-feed"));
    }
    // Functionality
    $("#profile-show-more").on("click", function() {
        $(".post:hidden").slice(-5).show().css("display", "flex");

        // Hide "Show More Posts" button when no more posts are hidden
        if($(".post:hidden").length <= 5) {
            emptyFeed($("#profile-show-more"), $(".end-of-feed"));
        }
    });
});

function emptyFeed(btn, txt) {
    btn.hide();
    txt.show();
}