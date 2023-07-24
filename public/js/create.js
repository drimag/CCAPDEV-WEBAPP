const submitBtn1 = document.querySelector("#createComment");
const commentForm = document.forms.createCommentForm;

submitBtn1?.addEventListener("click", async (e) => {
    e.preventDefault();
    const formData = new FormData(commentForm);
    console.log("Submit Comment Data");

    let postID = $(".post").attr("id");
    postID = postID.substring(4).trimEnd();
    console.log(postID);

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
            method: 'POST',
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

const submitBtn2 = document.querySelector("#createPost");
const postForm = document.forms.createPostForm;

submitBtn2?.addEventListener("click", async (e) => {
    e.preventDefault();
    const formData = new FormData(postForm);
    console.log("Submit Data");

    let currentUser = document.getElementById("current-username").innerText;
    currentUser = currentUser.substring(1).trimEnd();
    console.log(currentUser);

    const data = {
        title: formData.get("newtitle"),
        description: formData.get("newdesc")
    };
    
    console.log(data);
    const jString = JSON.stringify(data);
    console.log(jString);
    
    try {
        const response = await fetch("/post?loggedIn=" + currentUser, {
            method: 'POST',
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

$(document).ready(function() {
    $(".createReply").click(async function(e) {
        e.preventDefault();
        const commentNum = $(this).attr('id').substring(11);
        console.log(commentNum)

        const new_reply = $("#new-reply" + commentNum).val();
        console.log(new_reply);

        console.log("Submit Reply Data");
        const currentUser = params.get("loggedIn"); 

        let data = {
            loggedIn: currentUser,
            num: commentNum,
            reply: new_reply
        }
        
        console.log(data);
        const jString = JSON.stringify(data);
        console.log(jString);

        // Update Comment (add comment in array)
        
        try {
            let response = await fetch("/comment/reply?loggedIn=" + currentUser, {
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
    })
});