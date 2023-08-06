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
const titleContainer = document.querySelector('#newtitle');
const descContainer = document.querySelector("#newdesc");
const edittitleContainer = document.querySelector("#edit-title");
const editdescContainer = document.querySelector("#edit-desc");


/*
    This function sends data to the route '/post' via a POST request.
*/
createPostBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("clicked create post");

    const formData = new FormData(postForm);
    let currentUser = document.getElementById("current-username").innerText;
    currentUser = currentUser.substring(1).trimEnd();

    const title = formData.get("newtitle");
    const desc = formData.get("newdesc");

    if (title && desc) {
        let data = {
            title: title,
            description: desc
        };
        
        // Get Image
        let imagesrc = document.getElementById('displaynewpostimg').src;
        // console.log(imagesrc);
    
        if (imagesrc) {
            let [imagecontent, imagedata] = imagesrc.split(",");
            let imagetype = imagecontent.replace("data:image/", "");
            imagetype = imagetype.replace(";base64", "");
    
            data = {
                title: formData.get("newtitle"),
                description: formData.get("newdesc"),
                imagedata: imagedata,
                imagetype: imagetype
            };
        }
        
        const jString = JSON.stringify(data);
        
        const response = await fetch("/post", {
            method: 'POST',
            body: jString,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        postForm.reset();
    
        // console.log(response);
    
        if (response.status == 200) {
            console.log("Post Successful");
            location.reload();
        } else {
            image.style.backgroundImage = "";
            image.style.display = "none";
            console.log(`received response: ${response.status}`);
        }
    } else {
        if (title == '') {
            document.getElementById('notitle').innerText = 'Title cannot be empty!';
            document.getElementById('notitle').style.color = "red";
        }
        if (desc == '') {
            document.getElementById('nodesc').innerText = 'Description cannot be empty!';
            document.getElementById('nodesc').style.color = "red";
        }
    }
});

titleContainer?.addEventListener("keyup", async (e) => {
    e.preventDefault();

    if (titleContainer.value === "") {
        document.getElementById('notitle').innerText = 'Title cannot be empty!';
        document.getElementById('notitle').style.color = "red";
    } else {
        document.getElementById('notitle').innerText = '';
    }
});


descContainer?.addEventListener("keyup", async (e) => {
    e.preventDefault();

    if (descContainer.value === "") {
        document.getElementById('nodesc').innerText = 'Description cannot be empty!';
        document.getElementById('nodesc').style.color = "red";
    } else {
        document.getElementById('nodesc').innerText = '';
    }
});

edittitleContainer?.addEventListener("keyup", async (e) => {
    e.preventDefault();

    if (edittitleContainer.value === "") {
        document.getElementById('notitle').innerText = 'Title cannot be empty!';
        document.getElementById('notitle').style.color = "red";
    } else {
        document.getElementById('notitle').innerText = '';
    }
});


editdescContainer?.addEventListener("keyup", async (e) => {
    e.preventDefault();

    if (editdescContainer.value === "") {
        document.getElementById('nodesc').innerText = 'Description cannot be empty!';
        document.getElementById('nodesc').style.color = "red";
    } else {
        document.getElementById('nodesc').innerText = '';
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
    const title = formData.get("edit-title");
    const description = formData.get("edit-desc");
    
    if(title === '' || description == '') {
        document.getElementById('noeditpostinput' + postNum).innerText = 'Cannot be empty!';
    } else {
        let data = {
            postNum: postNum,
            title: title,
            description: description
        };

        // Get Image
        const imageContainer = document.querySelector("#displaynewpostimg");
        console.log(imageContainer);
        if (imageContainer) {
            console.log("has image");
            let imagesrc = document.getElementById('displaynewpostimg').src;

            let [imagecontent, imagedata] = imagesrc.split(",");
            let imagetype = imagecontent.replace("data:image/", "");
            imagetype = imagetype.replace(";base64", "");
    
            data = {
                postNum: postNum,
                title: title,
                description: description,
                imagedata: imagedata,
                imagetype: imagetype
            };
        }
        console.log(data);
    
        const jString = JSON.stringify(data);
    
        let response = await fetch("/post", {
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
    const postNum = params.get('postNum');
    console.log(postNum);

    let data = {
        postNum: postNum,
        comment: formData.get("new-comment")
    }
    
    if (data.comment) {
        const jString = JSON.stringify(data);
        console.log(jString);
    
        const response = await fetch("/comment", {
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
        }
    } else {
        document.getElementById('noinputcomment').style.display = 'block';
        document.getElementById('noinputcomment').innerText = 'Comment cannot be empty!';
        document.getElementById('noinputcomment').style.color = "red";
    }
});

$(document).ready(function() {
    const src = $('#displaynewpostimg').attr("src");

    $("#clearPost").click(function() {
        $('#displaynewpostimg').attr("src", src);
    });
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
            console.log(`received response: ${response.status}`);
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
        
        if (edited_comment === '') {
            $("#noeditinput" + commentNum).text('Edited reply cannot be empty!');
        } else {
            let data = {
                commentNum: commentNum,
                comment: edited_comment
            };

            const jString = JSON.stringify(data);

            let response = await fetch("/comment", {
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
    
            const response = await fetch("/reply", {
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
            }
        }
    });
    
});


// Testing!


const image_input = document.querySelector('#newpostpic');

image_input.addEventListener("change", function (e) {
	let reader = new FileReader();

	reader.onload = function(e) {
		let uploaded_image = document.getElementById("displaynewpostimg");
        $('#displaynewpostimg').show();
		uploaded_image.src = e.target.result;
	}

	reader.readAsDataURL(this.files[0]);
});