
const submitBtn = document.querySelector("#createPost");
const postForm = document.forms.createPostForm;

submitBtn?.addEventListener("click", async (e) => {
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