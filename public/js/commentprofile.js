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
        
        // Get Post Num
        // Get post number
        let response = await fetch("/comment" + comment_id + "/postNum?loggedIn=" + loggedIn, {
            method: 'GET'
        });
        
        console.log(response);
        console.log("Status code received: " + response.status);

        const result = await response.json();
        const postNum = result.postNum;

        console.log(postNum);
        
        location.href = "/posts/" + postNum + "?loggedIn=" + loggedIn;
    });

    $(".comment-container").hover(function() {
        $(this).css("cursor", "pointer");
    });

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

    $(".delete-c").click(async function() {
        try {
            const comment_id = $(this).attr('id').substring(14);
            const loggedIn = params.get("loggedIn");
            
            // Get post number
            let response = await fetch("/comment" + comment_id + "/postNum?loggedIn=" + loggedIn, {
                method: 'GET'
            });
            
            console.log(response);
            console.log("Status code received: " + response.status);

            const result = await response.json();
            const postNum = result.postNum;
        
            let data = {
                postNum: postNum,
                id: comment_id
            };
            console.log(data);

            // Update Post (Remove Comment from Array)
            let jString = JSON.stringify(data);
            
            // update post
            response = await fetch("/post/removecomment?loggedIn=" + loggedIn, {
                method: 'PUT',
                body: jString,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response);
            console.log("Status code received: " + response.status);

            data = {
                id: comment_id
            };
            console.log(data);
            
            // Delete Comment
            response = await fetch("/comment", {
                method: 'DELETE',
                body: jString,
                headers: {
                    'Content-type': 'application/json'
                }
            });
    
            console.log(response);
            console.log("Status code received: " + response.status);
    
            if(response.status === 200) {
                location.reload();
            } else {
                console.log("Status code received: " + response.status);
            }

            //res.render("/posts");
            //location.href = "/posts";
        } catch (error) {
            console.error(error);
        }
    });
});