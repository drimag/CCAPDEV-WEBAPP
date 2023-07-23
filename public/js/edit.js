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

/*
const submitBtn = document.querySelector("#editComment");
const editCommentForm = document.forms.editCommentForm;

submitBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    const formData = new FormData(editCommentForm);
    console.log("Submit Edit Comment Data");

    id = comment_id;
    console.log(id);

    const currentUser =$("#currentUser-navuser").text();
    const new_comment = formData.get("new-comment");

    let data = {
        id: postID,
        comment: new_comment
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
        
    } catch (err) {
        console.error(err);
    }
});
*/