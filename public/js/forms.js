// Currently Editing!
// TODO: Add Error Message when Input is EMPTY! (create + edit)
// TODO: Try Catch? if ever worst case

// Buttons
const createPostBtn = document.querySelector("#createPost");
const createCommentBtn = document.querySelector("#createComment");

const editPostBtn = document.querySelector("#editPost");
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
    This function sends data to the route '/post' via a PUT request.
*/
editPostBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("clicked edit post");

    // Get values
    const postNum = params.get('postNum');
    console.log(postNum);

    const formData = new FormData(editPostForm);
    const loggedIn = params.get("loggedIn"); 
    const title = formData.get("edit-title");
    const description = formData.get("edit-desc");
    
    if(title === '' || description == '') {
        document.getElementById('noeditpostinput' + postNum).innerText = 'Cannot be empty!';
    } else {
        let data = {
            loggedIn: loggedIn,
            postNum: postNum,
            title: title,
            description: description
        };
    
        const jString = JSON.stringify(data);
    
        let response = await fetch("/post?loggedIn=" + loggedIn, {
            method: 'PUT',
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
    }
});

/*
    This function sends data to the route '/post' via a DELETE request.
*/
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
        // TODO: Add Error Message
    }
});
/*
    This function sends data to the route '/comment' via a POST request.
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
    } else {
        console.log(`received response: ${response.status}`);
        // TODO: Add Error Message
    }
});

$(document).ready(function() {
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

    /*
            This adds a popup note when hovering over delete button
    */
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
            $("#noeditinput" + commentNum).text('Edited reply cannot be empty!');
        } else {
            let data = {
                loggedIn: loggedIn,
                commentNum: commentNum,
                comment: edited_comment
            };

            const jString = JSON.stringify(data);

            let response = await fetch("/comment?loggedIn=" + loggedIn, {
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
                // TODO: Add error message
            }
        }
    });

    /*
            This function sends data to the route '/reply' via a POST request.
    */
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
            } else {
                console.log(`received response: ${response.status}`);
                // TODO: Add error message
            }
        }
    });
    
});