$(document).ready(function() {

    $("#createCommentForm").hide();

    $("#add-comment").click(function() {
        $("#createCommentForm").show();
        $("#add-comment").hide();
    });

    $("button").hover(function() {
        $(this).css('cursor', 'pointer');
    });

    // Post Comment
    $("#createComment").click(function() {
        $()
    });

    ///////////////////////////////////////////
    // View Author Profile
    $("#author-pic").hover(function() {
        $(this).css('cursor', 'pointer');
    });

    $("#author-pic").click(function() {
        console.log('View Profile');
        let author = $("#postauthor-username").text();
        author = author.substring(2, author.length - 1);
        console.log(author);
        location.href = "/profile/" + author;
    });
    ////////////////////////////////////////////

    // TODO: View Comments User Profile

    // TODO: Edit Post

    // TODO: Delete Post
});