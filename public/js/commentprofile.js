$(document).ready(function() {
    $("form.editCommentForm").hide();

    $(".edit-comment").click(function() {
        $(this).hide();
        
        const comment_id = $(this).attr('id').substring(12).trimEnd();
        console.log(comment_id);

        // Hide Comment Container
        const desc_container = $("div#comment" + comment_id + " p.profile-comment");
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

    $(".delete-c").click(async function() {
        try {
            const comment_id = $(this).attr('id').substring(14);
            const loggedIn = params.get("loggedIn");
        
            let data = {
                id: comment_id
            };
            console.log(data);
        
            let jString = JSON.stringify(data);
            // get post number
            let response = await fetch("/comment" + comment_id + "/postNum?loggedIn=" + loggedIn, {
                method: 'GET'
            });
            
            const result = await response.json();
            const postNum = result.postNum;
            
            // update post
            response = await fetch("/post/removecomment?loggedIn=" + loggedIn, {
                method: 'PUT',
                body: jString,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            data = {
                id: comment_id
            };
            console.log(data);
        
            jString = JSON.stringify(data);
            // delete comment
            response = await fetch("/comment", {
                method: 'DELETE',
                body: jString,
                headers: {
                    'Content-type': 'application/json'
                }
            });
        
            // Awaiting for the resource to be deleted
            console.log(response);
        
            if(response.status === 200) {
                location.reload();
            } else {
                console.log("Status code received: " + response.status);
            }

            res.render("/posts");
        } catch (error) {
            console.error(error);
        }
    });
});