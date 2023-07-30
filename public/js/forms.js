// Currently Editing!

// Buttons
const createPostBtn = document.querySelector("#createPost");
const createCommentBtn = document.querySelector("#createComment");

const editPostBtn = document.querySelector("#editPost");

// Forms
const postForm = document.forms.createPostForm;
const commentForm = document.forms.createCommentForm;

// Models

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

// Edit Post

/*
    TODO:   This function sends data to the route '/comment' via a POST request.
*/
createCommentBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("clicked add comment");

    const formData = new FormData(commentForm);

    let postID = $(".post").attr("id");
    postID = postID.substring(4).trimEnd();
    console.log(postID);

    const currentUser =$("#currentUser-navuser").text();
    const new_comment = formData.get("new-comment");

    let data = {
        // id: postID,
        comment: new_comment
    };
    
    console.log(data);
    const jString = JSON.stringify(data);
    console.log(jString);
    let response = await fetch("/comment?loggedIn=" + currentUser, {
        method: 'POST',
        body: jString,
        headers: {
            'Content-Type': 'application/json'
        }
    });

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