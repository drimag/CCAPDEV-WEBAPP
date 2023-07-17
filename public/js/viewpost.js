$(document).ready(function() {

    $("#createCommentForm").hide();

    $("#add-comment").click(function() {
        $("#createCommentForm").show();
        $("#add-comment").hide();
    });

    /*
    $("#actions-comment button.comment").click(function() {
        $("#createCommentForm").show();
    });
    */

    $("button").hover(function() {
        $(this).css('cursor', 'pointer');
    });
});