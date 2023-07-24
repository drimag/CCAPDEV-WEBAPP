

$(document).ready(function() {
    $(".delete-c").click(async function() {
        try {
            const comment_id = $(this).attr('id').substring(14);
            const postNum = window.location.pathname.substring(7);
            const loggedIn = params.get("loggedIn");
        
            let data = {
                id: comment_id,
                postNum: postNum
            };
            console.log(data);

            // Update Post (Remove Comment from Array)
            let jString = JSON.stringify(data);

            let response = await fetch("/post/removecomment?loggedIn=" + loggedIn, {
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
            jString = JSON.stringify(data);
    
            response = await fetch("/comment", {
                method: 'DELETE',
                body: jString,
                headers: {
                    'Content-type': 'application/json'
                }
            });

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

    
    $("#delete-post").click(async function () {
        try {
            const postNum = window.location.pathname.substring(7);
            const loggedIn = params.get("loggedIn");
            data = {
                id: postNum
            };
            console.log(data);
        
            jString = JSON.stringify(data);

            // Delete post
            response = await fetch("/post", {
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

            location.href = "/deleted?loggedIn=" + loggedIn;

        } catch(err) {
            console.error(err);
        }
    });
});