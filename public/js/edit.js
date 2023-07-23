const id = 0;

$(document).ready(function() {
    $(".edit-comment").click(function() {
        $(this).hide();
        $(".delete-c").hide();
        
        const comment_id = $(this).attr('id').substring(12).trimEnd();
        console.log(comment_id);

        // Hide Comment Container
        const desc_container = $("div#comment" + comment_id + " p.comment-desc");
        desc_container.hide();

        // Show Edit Container
        const edit_pop = $("div#comment" + comment_id + " form.editCommentForm");
        edit_pop.show();

        // PUT Request
    });
    // cancel edit comment ?
});