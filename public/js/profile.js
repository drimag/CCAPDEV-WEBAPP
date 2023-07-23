$(document).ready(function() {

    const showMorePostsBtn = $("#show-more-posts");
    const showMoreCommentsBtn = $("#show-more-comments");
    const endOfFeedTxt = $(".end-of-feed");

    $("#latest-feed-comments").hide();
    showMoreCommentsBtn.hide();

    // Limit posts seen on profile
    limit($(".post"));

    // Only show "Show More" button when there are hidden posts
    if($(".post:hidden").length > 0) {
        showBtn(showMorePostsBtn, endOfFeedTxt, showMoreCommentsBtn);
    } else {
        hideBtn(showMorePostsBtn, endOfFeedTxt, showMoreCommentsBtn);
    }

    const currentUser = $("#currentUser-navuser").text();

    ///////////////////////////////////////////////

    // Show Edit Profile Button if profile view is current user
    let userProfile = $("#profile-username").text();
    console.log("userProfile = " + userProfile);
    userProfile = userProfile.substring(1).trimEnd();
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

    // View Latest Posts
    $("#latest-posts").click(function() {
        $("#latest-feed-comments").hide();
        $("#latest-feed-posts").show();
        $(this).addClass("active");
        $("#latest-comments").removeClass("active");

        // Limit posts seen on profile
        limit($(".post"));

        // Only show "Show More" button when there are hidden posts
        if($(".post:hidden").length > 0) {
            showBtn(showMorePostsBtn, endOfFeedTxt, showMoreCommentsBtn);
        } else {
            hideBtn(showMorePostsBtn, endOfFeedTxt, showMoreCommentsBtn);
        }
    });

    // View Latest Comments
    $("#latest-comments").click(function() {
        $("#latest-feed-posts").hide();
        $("#latest-feed-comments").show();
        $(this).addClass("active");
        $("#latest-posts").removeClass("active");

        // Limit comments seen on profile
        limit($(".comment-list"));
        
        // Only show "Show More" button when there are hidden comments
        if($(".comment-list:hidden").length > 0) {
            showBtn(showMoreCommentsBtn, endOfFeedTxt, showMorePostsBtn);
        } else {
            hideBtn(showMoreCommentsBtn, endOfFeedTxt, showMorePostsBtn);
        }
    });

    ////////////////////////////////////////////

    /*
     "Show More" button
        Allows the user to see older posts/comments
     */
    // Show More Posts Button Functionality
    showMorePostsBtn.on("click", function() {
        
        $(".post:hidden").slice(-1).show().css("display", "flex");
        
        // Hide "Show More" button when no more posts are hidden
        if($(".post:hidden").length === 0) {
            hideBtn(showMorePostsBtn, endOfFeedTxt, showMoreCommentsBtn);

        }
    });
    
    // Show More Comments Button Functionality
    showMoreCommentsBtn.on("click", function() {
        $(".comment-list:hidden").slice(-1).show().css("display", "flex");
        
        // Hide "Show More" button when no more comments are hidden
        if($(".comment-list:hidden").length === 0) {
            hideBtn(showMoreCommentsBtn, endOfFeedTxt, showMorePostsBtn);
        }
    });
});

// Limit posts/comments the vistor sees when visiting profile at first
function limit(cls) {
    cls.hide();
    cls.slice(-1).show();
}

function showBtn(btn, txt, otherBtn) {
    btn.show();
    txt.hide();
    otherBtn.hide();
}

function hideBtn(btn, txt, otherBtn) {
    btn.hide();
    txt.show();
    otherBtn.hide();
}