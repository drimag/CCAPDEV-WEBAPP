// View Post
$(document).ready(function() {

    // Hide Create Post Func From Guest
    let currentUser = $("#current-username").text();
    currentUser = currentUser.substring(2).trimEnd();
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
        // TODO:
         //var made to find this upvote's corresponding downvote button
         let downvoteButton = $(this).nextAll("button.downvote").first();

         // Removes vote if clicked again
         if ($(this).hasClass('clicked')) {
             //decrease vote count here by 1
             
             $(this).removeClass('clicked');
         }
         // Removes effect of opposite vote if clicked
         else if (downvoteButton.hasClass('clicked')){
             //increase the vote count by 2,because it nullifies the downvote

             $(this).addClass('clicked');
             downvoteButton.removeClass('clicked');
         }   
         //When no vote was clicked
         else{
             //increase vote count here by 1

             $(this).addClass('clicked');
         }
    });

    // Downvote
    $("button.downvote").click(function() {
        // TODO:
        //var made to find this downvote's corresponding upvote button
        let upvoteButton = $(this).prevAll("button.upvote").first();

        //removes vote if clicked again  
        if ($(this).hasClass('clicked')) {
            //increase vote count here by 1

            $(this).removeClass('clicked');
        }
        //removes effect of opposite vote if clicked
        else if (upvoteButton.hasClass('clicked')){
            //decrease the vote count by 2,because it nullifies the upvote

            $(this).addClass('clicked');
            upvoteButton.removeClass('clicked');
        }
        //when no vote was clicked
        else{
            //decrease vote count here by 1

            $(this).addClass('clicked');
        }
    });

    $("div.post-container").click(function() {
        console.log("View Post");
        const id = $(this).attr('id');
        console.log(id);
        
        if(currentUser === "guest") {
            location.href = login;
        } else {
            location.href = "/posts/" + id.substring(1).trimEnd() + "?loggedIn=" + currentUser;
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
    if($(".post:hidden").length > 0) {
        $("#home-show-more").show();
        $(".end-of-feed").hide();
    } else {
        emptyFeed($("#home-show-more"), $(".end-of-feed"));
    }

    // Functionality
    $("#home-show-more").on("click", function() {
        $(".post:hidden").slice(-20).show().css("display", "flex");

        // Hide "Show More Posts" button when no more posts are hidden
        if($(".post:hidden").length <= 20) {
            emptyFeed($("#home-show-more"), $(".end-of-feed"));
        }
    });
})

function emptyFeed(btn, txt) {
    btn.hide();
    txt.show();
}

// TODO: sort posts by popularity (votes descending)