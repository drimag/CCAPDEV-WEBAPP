$(document).ready(function() {
    $(".edit-div").hide();
    $(".edit-comment").click(function() {
        $(this).hide();
        
        const comment_id = $(this).attr('id').substring(12).trimEnd();
        console.log(comment_id);

        // Hide Comment Container
        const desc_container = $("div#comment" + comment_id + " p.comment-desc");
        desc_container.hide();

        // Show Edit Container
        const edit_pop = $("div#comment" + comment_id + " form.editCommentForm");
        edit_pop.show();
    });

    $(".editComment").click(async function(e) {
        e.preventDefault();

        // Get values
        const commentNum = $(this).attr('id').substring(11);
        console.log(commentNum);

        const edited_comment = $("#edit-textcomment" + commentNum).val();
        console.log(edited_comment);
       
        console.log("Submit Edit Comment Data");

        // Get Current User and Post Num
        const currentUser = params.get("loggedIn"); 
        //const postNum = window.location.pathname.substring(7);
        console.log(params.get("title"));
        //console.log(postNum);

        let data = {
            loggedIn: currentUser,
            num: commentNum,
            comment: edited_comment
        };

        console.log(data);
        const jString = JSON.stringify(data);
        console.log(jString);

        try {
            let response = await fetch("/comment?loggedIn=" + currentUser, {
                method: 'PUT',
                body: jString,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response);

            if(response.status === 200) {
                location.reload();
            } else {
                console.log("Status code received: " + response.status);
            }
            
        } catch (err) {
            console.error(err);
        }
    });
});