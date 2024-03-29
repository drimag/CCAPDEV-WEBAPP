$(document).ready(function() {
    $("#edit-post-container").hide();
    $('#noinputcomment').hide();

    $(".edit-comment").click(function() {
        $(this).hide();
        
        const comment_id = $(this).attr('id').substring(12).trimEnd();
        console.log(comment_id);

        // Hide Comment Container
        const desc_container = $("div#comment" + comment_id + " p.comment-desc");
        desc_container.hide();

        // Show Edit Container
        const edit_pop = $("div#editdiv" + comment_id);
        edit_pop.show();
    });

    $("#edit-post").click(function() {
        $(this).hide();
        $(".post-title").hide();
        $(".viewpost-description").hide();
        
        $(".post-image").hide();
        $("#edit-post-container").show();
    });
    
    // Create Comment Functions
    $("#createCommentForm").hide();
    $(".reply-pop").hide();
    $(".editdiv").hide();

    $("#add-comment").click(function() {
        $("#createCommentForm").show();
        $("#add-comment").hide();
    });

    $("button").hover(function() {
        $(this).css('cursor', 'pointer');
    });

    // Comment on a Comment (fixed)
    $("button.comment").click(function() {
        const comment_id = $(this).attr('id');
        console.log(comment_id);
        const reply_pop = $("div#comment" + comment_id + " div#reply-pop" + comment_id);
        const visible = reply_pop.is(":visible");
        if(visible) {
            reply_pop.hide();
        } else {
            reply_pop.show();
        }
    });

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
        location.href = "/profile/" + author;
    });

    // View Comments User Profile
    $(".comment-user").click(function() {
        let comment_user = $(this).attr('class').substring(13).trimStart().trimEnd();
        console.log(comment_user);

        console.log('View Profile');
        
        const currentUser = $("#currentUser-navuser").text();
        console.log("Current User: " + currentUser);
        location.href = "/profile/" + comment_user;
    })

    $(".comment-user").hover(function() {
        $(this).css('cursor', 'pointer');
    });
});