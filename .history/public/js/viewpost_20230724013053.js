
$(document).ready(function() {

    /////////////////////////////////////////////////

    // Create Comment Functions
    $("#createCommentForm").hide();
    $(".reply-pop").hide();
    $(".editCommentForm").hide();

    $("#add-comment").click(function() {
        $("#createCommentForm").show();
        $("#add-comment").hide();
    });

    $("button").hover(function() {
        $(this).css('cursor', 'pointer');
    });

    // TODO: Comment on a Comment (Nested Comments)
    $("button.comment").click(function() {
        const comment_id = $(this).attr('id');
        console.log(comment_id);
        const reply_pop = $("div#comment" + comment_id + " div.reply-pop");
        const visible = reply_pop.is(":visible");
        if(visible) {
            reply_pop.hide();
        } else {
            reply_pop.show();
        }
    });

    ////////////////////////////////////////////////





    ///////////////////////////////////////////

    // View Author Profile
    $("#author-pic").hover(function() {
        $(this).css('cursor', 'pointer');
    });

    $("#author-pic").click(function() {
        console.log('View Profile');
        let author = $("#postauthor-username").text();
        author = author.substring(1).trimEnd();
        console.log(author);
        
        const currentUser = $("#currentUser-navuser").text();
        console.log("Current User: " + currentUser);
        location.href = "/profile/" + author + "?loggedIn=" + currentUser;
    });

    ////////////////////////////////////////////

    // View Comments User Profile
    $(".comment-user").click(function() {
        let comment_user = $(this).attr('class').substring(11).trimStart().trimEnd();
        console.log(comment_user);

        console.log('View Profile');
        
        const currentUser = $("#currentUser-navuser").text();
        console.log("Current User: " + currentUser);
        location.href = "/profile/" + comment_user + "?loggedIn=" + currentUser;
    })

    $(".comment-user").hover(function() {
        $(this).css('cursor', 'pointer');
    })

    ////////////////////////////////////////////


    // TODO: Edit Post

    // TODO: Delete Post

    // TODO: Edit Comment

});