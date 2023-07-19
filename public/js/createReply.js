// TODO: Nested Comments !!!

const submitBtn = document.querySelector("#createReply");
const replyForm = document.forms.createReplyForm;
submitBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    const formData = new FormData(replyForm);
    console.log("Submit Reply Data");
    /*
    // CreateComment Function Copied VVVVV

    let postID = $(".post").attr("id");
    postID = postID.substring(4).trimEnd();
    // const postID = document.querySelector(".post").getElementById('id');
    console.log(postID);

    const currentUser =$("#currentUser-navuser").text();


    const data = {
        id: postID,
        comment: formData.get("new-comment")
    };
    
    console.log(data);
    const jString = JSON.stringify(data);
    console.log(jString);
    
    try {
        const response = await fetch("/posts/" + postID + "/comment?loggedIn=" + currentUser, {
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
    */
});