/* Functions */

function displayAllPosts(posts) {
    for(let post of posts) {
        writePost(post.user, post);
    }
}

/*
    Switching User
*/
function switchUser(newUser) {
    $(document).ready(function() {
        $("#current-username").text(newUser.username);
        $("#user-selected").attr("src", newUser.img);
        //currentUser = newUser;

        if(newUser.name == userGuest.name) {
            $(".descsnippet").show();
            $(".home-description").hide();
            console.log("Switched to Guest");

            let numOfPosts = $('.posts .post').length;
    
            // Show only 15 latest posts for guest
            $(".post").hide();
            $(".post").slice(numOfPosts - 15, numOfPosts).show();
        } else {
            $(".home-description").show();
            $(".descsnippet").hide();
            console.log("Switched to User");
        }

        // Load dropdown menu items on navbar (could change based on user)
        dropdown.innerHTML = '';
        loadDropdown();
    });
}


/*
    Window location when clicked on profile
*/
function viewUserProfile(user) {
    if(user.name == userGuest.name || currentUser.name == userGuest.name) {
        window.location = "login.html";
        alert("You are not a registered user! Please log in.");
    } else {
        window.location = "profile.html";
    }
}


/*
    Post related Functions
*/
function getInputs(user) {
    if(currentUser.name == userGuest.name) {
        window.location = "login.html";
    } else {
        let formElement = document.forms.postform;
        let formData = new FormData(formElement);
        let count = 0;
        let title = null;
        let description = null;

        for (let data of formData) {
            if(count == 0) {
                title = data[1];
            } else {
                description = data[1];
            }

            count += 1;
        }
        console.log(title);
        if(title == "" || description == "") {
            console.log("Invalid Input for Post.");
        } else {
            let post = new Post(posts.length + 1, user, title, description);
            posts.push(post);
            writePost(currentUser, post);
        }
    }
}

/*
    Write Post function
*/
function writePost(user, post) {
    const postContainer = document.querySelector("#posts-feed");
    const item =
            `<div class="flex-row-container post" id="post${post.num}">
                <div>
                    <img class="user ${user.lname}" src="${user.img}">
                </div>

                <div class="flex-column-container post-details"">
                    <p class="username"> ${user.username} </p>
                    <p class="post-title"> ${post.title} </p>
                    <p class="home-description"> ${post.description} </p>
                    <p class="descsnippet"> ${post.descSnippet} </p>

                    <div class="actions">
                        <span class="comment"></span>
                        <span class="upvote"></span>
                        <span class="number"> ${post.votes} </span>
                        <span class="downvote"></span>
                    </div>
                </div>
            </div>`;

    postContainer.innerHTML += item;
    console.log("Posted.");
}

/*
    Switching User on Home Page
*/
$(document).ready(function() {

    posts = JSON.parse(sessionStorage.getItem("currentSearchPosts"));
    if(!posts){
        posts = JSON.parse(sessionStorage.getItem("currentPosts"));
    }
    console.log(posts);
    displayAllPosts(posts);
    switchUser(currentUser);

    // Create Post
    $("#submit-post").click(function() {
        console.log("Posting...");
        if(currentUser == userGuest) {
            window.location = "login.html";
        } else {
            getInputs(currentUser);
            $(".home-description").show();
            $(".descsnippet").hide();
        }
    });

    // View Post
    $("p.post-title").click(function() {
        if(currentUser.name == userGuest.name) {
            window.location = "login.html";
            alert("You must be a registered user!")
        } else {
            let postContainer = $(this.parentElement.parentElement).attr('id');
            let id = postContainer.substr(4, postContainer.length);
            
            console.log("Viewing Post ID: " + id);
            viewingPost = posts[id - 1];
            sessionStorage.setItem("viewingPost", JSON.stringify(viewingPost));
            
            window.location = "postview.html";
        }
    });
    
    // Effects when Hovering
    $("p.post-title").hover(function() {
        $(this).fadeOut(200);
        $(this).fadeIn(500);
        $(this).css('cursor', 'pointer');
    })

    $("img").hover(function() {
        $(this).css('cursor', 'pointer');
    })

    // Show 3 more posts when "Show More" button is clicked
    $("#home-show-more").on("click", function() {
        $(".post:hidden").slice(0,15).show();
        $(".post:hidden").style.display = 'flex';
    });

    // View's Another User's Profile from Post
    $(".post img").click(function() {
        console.log("Viewing Profile");
        let img = this.getAttribute('src');
        console.log("Img clicked: " + this.getAttribute('src'));

        for(let user of users) {
            if(user.img == img) {
                viewingUser = user;
                sessionStorage.setItem("viewingUser", JSON.stringify(viewingUser));
                console.log("Viewing Profile of " + viewingUser.name);
            }
        }

        viewUserProfile(viewingUser);
    });

    // View Current User's Profile
    $("#user-selected").click(function() {
        viewingUser = currentUser;
        sessionStorage.setItem("viewingUser", JSON.stringify(viewingUser));
        viewUserProfile(viewingUser);
    });

});
