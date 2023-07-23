$(document).ready(function() {
    $(".delete-c").click(async function() {
        try {
            alert("Deleting Comment...");
            const comment_id = $(this).attr('id').substring(14).trimEnd();
        
            const data = {
                id: comment_id
            };
            console.log(data);
        
            const jString = JSON.stringify(data);
        
            const response = await fetch("/comment", {
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

            // update post
            response = await fetch("/post/addedcomment?loggedIn=" + currentUser, {
                method: 'PUT',
                body: jString,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if(response.status === 200) {
                location.reload();
            } else {
                console.log("Status code received: " + response.status);
            }
        } catch (error) {
            console.error(error);
        }
    })
});