$(document).ready(function() {
    $("form.editCommentForm").hide();

    $("button").hover(function() {
        $(this).css("cursor", "pointer");
    });

    // View Post From Comment In Profile
    $(".comment-info").click(async function() {
        // Comment Number
        const comment_id = $(this).parent().parent().attr('id').substring(7);
        console.log(comment_id);

        // Current User
        const loggedIn = params.get("loggedIn");
        console.log(loggedIn);

        // Get post number
        let response = await fetch("/comment/postNum?commentNum=" + comment_id + "&loggedIn=" + loggedIn, {
            method: 'GET'
        });
        
        console.log(response);
        
        if (response.status === 200) {
            const result = await response.json();
            const postNum = result.postNum;
            
            location.href = "/viewpost?postNum=" + postNum + "&loggedIn=" + loggedIn;
        } else {
            // Comment does not exist
            console.log("Status code received: " + response.status);
        }
    });

    $(".comment-container").hover(function() {
        $(this).css("cursor", "pointer");
    });

    /*
    // Show Edit Text Area When Clicked
    $(".edit-comment").click(function() {
        $(this).hide();
        
        const comment_id = $(this).attr('id').substring(12).trimEnd();
        //console.log(comment_id);

        // Hide Comment Container
        const desc_container = $("div#comment" + comment_id + " p.profile-comment");
        desc_container.hide();

        // Show Edit Container
        const edit_pop = $("div#comment" + comment_id + " form.editCommentForm");
        edit_pop.show();
    });

    // Edit Comment In Profile
    $(".editComment").click(async function(e) {
        e.preventDefault();

        // Get values
        const commentNum = $(this).attr('id').substring(11);
        console.log(commentNum);

        const edited_comment = $("#edit-textcomment" + commentNum).val();
        console.log(edited_comment);
       
        console.log("Submit Edit Comment Data");

        const currentUser = params.get("loggedIn"); 

        let data = {
            loggedIn: currentUser,
            num: commentNum,
            comment: edited_comment
        };

        console.log(data);
        const jString = JSON.stringify(data);
        console.log(jString);

        // Update Comment
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
    */
    
    /*
            This function sends data to the route '/comment' via a DELETE request.
    */
    $(".delete-c").click(async function() {
        console.log("clicked delete button");
        const commentNum = $(this).attr('id').substring(14);
        console.log(commentNum);

        const response = await fetch('/comment', {
            method: 'DELETE',
            body: JSON.stringify({
                commentNum: commentNum
            }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        if (response.status === 200) {
            location.reload();
        } else {
            // Not Deleted!
        }
    });
});