$(document).ready(function() {
    $(".edit-comment").click(function() {
        $(this).hide();
        $(".delete-c").hide();
        
        const comment_id = $(this).attr('id').substring(11).trimEnd();
        console.log(comment_id);

        // Hide Comment Container
        const desc_container = $("div#comment" + comment_id + " p.comment-desc");
        desc_container.hide();

        // Show Edit Container
        const edit_pop = $("div#comment" + comment_id + " form.editCommentForm");
        edit_pop.show();


    });
    // cancel edit comment ?
});


const submitBtn = document.querySelector("#editComment");
const editCommentForm = document.forms.editCommentForm;

submitBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    const formData = new FormData(editCommentForm);
    console.log("Submit Edit Comment Data");

    // Get Comment That is being edited
    const commentNum = submitBtn.parentElement.parentElement.parentElement.id.substring(7);
    console.log(commentNum);

    // Get Current User and Post Num
    const currentUser = params.get("loggedIn"); 
    //const postNum = window.location.pathname.substring(7);
    console.log(params.get("title"));
    //console.log(postNum);

    const edited_comment = formData.get("edit-textcomment");

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
