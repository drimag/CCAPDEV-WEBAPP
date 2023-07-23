$(document).ready(function() {
    $(".delete-c").click(async function() {
        try {
            alert("Deleting Comment...");
            const comment_id = $(this).attr('id').substring(14).trimEnd();
            const postNum = window.location.pathname.substring(7);
            const loggedIn = params.get("loggedIn");
        
            let data = {
                id: comment_id,
                postNum: postNum
            };
            console.log(data);
        
            let jString = JSON.stringify(data);
        
            // update post
            let response = await fetch("/post/removecomment?loggedIn=" + loggedIn, {
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
            response = await fetch("/comment?loggedIn=" + currentUser, {
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
    })
});