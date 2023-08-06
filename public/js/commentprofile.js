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
        let response = await fetch("/comment/postNum?commentNum=" + comment_id, {
            method: 'GET'
        });
        
        console.log(response);
        
        if (response.status === 200) {
            const result = await response.json();
            const postNum = result.postNum;
            
            location.href = "/viewpost?postNum=" + postNum;
        } else {
            // Comment does not exist
            console.log(" does not exist");
            let text = "Replied to a post";
            if($(this).find('.post-title') === "Replied to a comment") {
                text = "Replied to a comment";
            }
            $(this).find('.post-title').text(text + " [deleted]").css("color", "red");
            console.log("Status code received: " + response.status);
        }
    });

    $(".comment-container").hover(function() {
        $(this).css("cursor", "pointer");
    });

    
    // Show Edit Text Area When Clicked
    $(".edit-comment").click(function() {
        $(this).hide();
        
        const comment_id = $(this).attr('id').substring(12).trimEnd();

        // Hide Comment Container
        const desc_container = $("div#comment" + comment_id + " p.profile-comment");
        desc_container.hide();

        // Show Edit Container
        const edit_pop = $("div#comment" + comment_id + " form.editCommentForm");
        edit_pop.show();
    });

    /*
            This function sends data to the route '/comment' via a PUT request.
    */
    $(".editComment").click(async function(e) {
        e.preventDefault();
        console.log("clicked edit comment");

        const editCommentForm = document.forms.editCommentForm;

        // Get values
        const commentNum = $(this).attr('id').substring(11);
        console.log(commentNum);

        const edited_comment = $("#edit-textcomment" + commentNum).val();
        console.log(edited_comment);
        
        const loggedIn = params.get("loggedIn"); 
        if (edited_comment === '') {
            $("#noeditinput" + commentNum).css("display", "block");
            $("#noeditinput" + commentNum).text('Edited reply cannot be empty!');
        } else {
            let data = {
                loggedIn: loggedIn,
                commentNum: commentNum,
                comment: edited_comment
            };

            const jString = JSON.stringify(data);

            let response = await fetch("/comment", {
                method: 'PUT',
                body: jString,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        
            editCommentForm.reset();
            console.log(response);
        
            if (response.status == 200) {
                console.log("Edit Comment Successful");
                location.reload();
            } else {
                console.log(`received response: ${response.status}`);
            }
        }
    });
    
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
            console.log(`received response: ${response.status}`);
        }
    });
});