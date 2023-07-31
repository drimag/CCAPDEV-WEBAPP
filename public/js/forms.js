// Currently Editing!

// Buttons
const createPostBtn = document.querySelector("#createPost");
const createCommentBtn = document.querySelector("#createComment");

const editPostBtn = document.querySelector("#editPost");
// TODO: Edit Comment

const deletePostBtn = document.querySelector("#delete-post");

// Forms
const postForm = document.forms.createPostForm;
const commentForm = document.forms.createCommentForm;
const editPostForm = document.forms.editPostForm;

// Containers
const postContainer = document.querySelector(".expanded-container");

/*
    This function sends data to the route '/post' via a POST request.
*/
createPostBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("clicked create post");

    const formData = new FormData(postForm);
    let currentUser = document.getElementById("current-username").innerText;
    currentUser = currentUser.substring(1).trimEnd();

    const data = {
        title: formData.get("newtitle"),
        description: formData.get("newdesc")
    };
    
    const jString = JSON.stringify(data);
    console.log(jString);
    
    const response = await fetch("/post?loggedIn=" + currentUser, {
        method: 'POST',
        body: jString,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    postForm.reset();

    console.log(response);

    if (response.status == 200) {
        console.log("Post Successful");
        location.reload();
    } else {
        console.log(`received response: ${response.status}`);
    }
});

/*
    This function sends data to the route '/updatepost' via a POST request.
*/
editPostBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("clicked edit post");

    // Get values
    const postNum = params.get('postNum');
    console.log(postNum);

    const formData = new FormData(editPostForm);

    // Get Current User and Post Num
    const loggedIn = params.get("loggedIn"); 

    let data = {
        loggedIn: loggedIn,
        postNum: postNum,
        title: formData.get("edit-title"),
        description: formData.get("edit-desc")
    };

    const jString = JSON.stringify(data);

    let response = await fetch("/updatepost?loggedIn=" + loggedIn, {
        method: 'POST',
        body: jString,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    editPostForm.reset();
    console.log(response);

    if (response.status == 200) {
        console.log("Edit Post Successful");
        location.reload();
        //location.href = window.location.pathname + "?title=" + edited_title + "&loggedIn=" + currentUser;
    } else {
        console.log(`received response: ${response.status}`);
    }
});

deletePostBtn?.addEventListener("click", async (e) => {
    const postNum = params.get('postNum');

    data = {
        postNum: postNum
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

    console.log(response);

    if(response.status === 200) {
        postContainer.innerHTML =
        `<div class="page deleted-page">
            <p> Post was deleted. </p>
        </div>`;
    } else {
        console.log("Status code received: " + response.status);
    }
});
/*
    TODO:   This function sends data to the route '/comment' via a POST request.
*/
createCommentBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("clicked add comment");

    const formData = new FormData(commentForm);

    // Get values
    const loggedIn = params.get('loggedIn');
    const postNum = params.get('postNum');
    console.log(postNum);

    let data = {
        postNum: postNum,
        comment: formData.get("new-comment")
    }
    
    const jString = JSON.stringify(data);
    console.log(jString);

    const response = await fetch("/comment?loggedIn=" + loggedIn, {
        method: 'POST',
        body: jString,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    commentForm.reset();
    console.log(response);

    if(response.status === 200) {
        console.log("Comment Successful");
        location.reload();
        // TODO: update post comment count (?)
        /*
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
            console.log(`received response: ${response.status}`);
        }
        */
    } else {
        console.log(`received response: ${response.status}`);
    }
});

// Edit Comment

/*
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
*/

$(document).ready(function() {
    // Delete Comment
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

    $(".delete-c").on({
        mouseover: function() {
            const commentNum = $(this).attr('id').substring(14);
            $("#note" + commentNum).text('Note: Deleting a comment will remove the entire view of the thread');
        },
        mouseout: function() {
            const commentNum = $(this).attr('id').substring(14);
            $("#note" + commentNum).text('');
        }
    });

    // TODO: Edit Comment


    // Create Reply
    $(".createReply").click(async function(e) {
        e.preventDefault();
        console.log("clicked add reply");

        const replyForm = document.forms.createReplyForm;

        // Get values
        const loggedIn = params.get('loggedIn');
        const postNum = params.get('postNum');
        const commentNum = $(this).attr('id').substring(11);
        console.log(commentNum);

        const comment = $("#new-reply" + commentNum).val();

        if (comment === '') {
            // TODO: Add Error Message / Add Input
            $("#noinputmsg" + commentNum).text('Reply cannot be empty!');
        } else {
            let data = {
                postNum: postNum,
                commentNum: commentNum,
                comment: comment
            }
            
            const jString = JSON.stringify(data);
            console.log(jString);
    
            const response = await fetch("/reply?loggedIn=" + loggedIn, {
                method: 'POST',
                body: jString,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            replyForm.reset();
            console.log(response);
    
            if(response.status === 200) {
                console.log("Reply Successful");
                location.reload();
                // TODO: update comment comment count (?)
        
            } else {
                console.log(`received response: ${response.status}`);
                // Add error message
            }
        }
    });
    
});