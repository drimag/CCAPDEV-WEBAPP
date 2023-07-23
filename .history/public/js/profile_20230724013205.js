$(document).ready(function() {
    $("#latest-feed-comments").hide();
    
    const currentUser = $("#currentUser-navuser").text();

    ///////////////////////////////////////////////

    // Show Edit Profile Button if profile view is current user
    let userProfile = $("#profile-username").text();
    console.log("userProfile = " + userProfile);
    userProfile = userProfile.substring(10.trimEnd();
    console.log("userProfile = " + userProfile);
    
    if(userProfile === currentUser) {
        $("#edit-profile").show();
    } else {
        $("#edit-profile").hide();
    }

    $("#edit-profile").hover(function() {
        $(this).css('cursor', 'pointer');
    });

    $("#edit-profile").click(function() {
        console.log("Edit profile button clicked.");
        location.href = "/edit-profile?loggedIn=" + currentUser;
    })
    //////////////////////////////////////////////
    
    // TODO:  View One Post From Comment !!!
    $("div.comment-container").click(function() {

    });

    $("div.comment-container").hover(function() {
        $(this).css('cursor', 'pointer');
    });
    
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
    
    ////////////////////////////////////////////
    
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

    ////////////////////////////////////////////
    
    // TODO: Limit Posts/Comments Seen On Profile !!!
    /*
     "Show More Posts" button
        Allows the user to see older posts
     */
    const showMoreBtn = $("#profile-show-more");
    const endOfFeedTxt = $(".end-of-feed");
    let showingPosts = $("#latest-feed-posts").is(':visible');
    let showingComments = $("#latest-feed-comments").is(':visible');

    // Show "Show More" button when there are hidden posts
    if(showingPosts) {

        limitPosts($(".post"));

        if($(".post:hidden").length > 0) {
            showBtn(showMoreBtn, endOfFeedTxt);
        } else {
            hideBtn(showMoreBtn, endOfFeedTxt);
        }

    // TODO: Show "Show More" button when there are hidden comments
    } else if(showingComments) {

        limitPosts($(".comment-list"));
        
        if($(".comment-list:hidden").length > 0) {
            showBtn(showMoreBtn, endOfFeedTxt);
        } else {
            hideBtn(showMoreBtn, endOfFeedTxt);
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
    showMoreBtn.on("click", function() {
        $(".post:hidden").slice(-5).show().css("display", "flex");
        $(".comment-list:hidden").slice(-5).show().css("display", "flex");

        // TODO double check: Hide "Show More" button when no more posts/comments are hidden
        if(showingPosts && $(".post:hidden").length === 0) {
            hideBtn(showMoreBtn, endOfFeedTxt);

        } else if(showingComments && $(".comment-list:hidden").length === 0) {
            hideBtn(showMoreBtn, endOfFeedTxt);
        }
    });
});

// Limit posts/comments the vistor sees when visiting profile at first
function limitPosts(cls) {
    cls.hide();
    cls.slice(-5).show();
}

function showBtn(btn, txt) {
    btn.show();
    txt.hide();
}

function hideBtn(btn, txt) {
    btn.hide();
    txt.show();
}