const User = function(name, password) {
    this.name = name;
    this.lname = this.name.toLowerCase();
    this.username = "@" + this.lname;
    this.password = password;
    this.acc = "#user-" + name;
    this.img = "./profilepics/" + this.lname + ".jpg";
    this.bio = "test bio";
}

let users = []
let userGuest = new User("Guest", "1234");
let userSakura = new User("Sakura", "letmeplay");
let userChaewon = new User("Chaewon", "tyforsupportingus");
let userYunjin = new User("Yunjin", "IGOTACONDOINMANHATTAN");
let userKazuha = new User("Kazuha", "bang!");
let userEunchae = new User("eunchae", "mubankpresident");

users.push(userGuest, userSakura, userChaewon, userYunjin, userKazuha, userEunchae);
console.log(users);
// Post and Comment Construtors 
const Post = function(num, user, title, description) {
    this.num = num;
    this.title = title;
    this.user = user;
    this.description = description;
    this.descSnippet = description.slice(0,50) + "...";
    this.upvotes = 0;
    this.downvotes = 0;
    this.comments = [];
}

const Comment = function(user, description, comments = []) {
    this.user = user;
    this.description = description;
    this.upvotes = 0;
    this.downvotes = 0;
    this.comments = comments;
}

let posts = [];
let post1 = new Post(1, userSakura, "test title", "test description");
let post2 = new Post(2, userEunchae, "big announcement", "Ever since Wonyoung's contract for Music Bank expired, they opened auditions! GUESS WHO'S THE NEW MUSIC BANK PRESIDENT??????");
let post3 = new Post(3, userYunjin, "life update", "BTS PLEASE COME BACK");
let post4 = new Post(4, userChaewon, "What is Hyewon up to?", "Hyewon still updates her Youtube but not as regularly as before, she hasn't been posting a lot on Instagram like before too sadly.");
let post5 = new Post(5, userKazuha, "How good was Park Sunghoon as a skater?", "He wasn't Korea's top man for sure haha but is there someone who maybe followed korean skating more or something who could tell me, from objective fs point, how good he actually was? Could he potentially get really on top if he continued? Was there still room for improvement (considering he's 19 rn, so not that young but also not that old) or he probably reached his limits?");

post1.upvotes = 203;
post1.downvotes = 2;
post2.upvotes = 89;
post2.downvotes = 8;
post3.upvotes = 504;
post3.downvotes = 12;
post4.upvotes = 38;
post4.downvotes = 1;
post5.upvotes = 5;
post5.downvotes = 0;

posts.push(post1, post2, post3, post4, post5);

//------------------------------------
let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
let viewingUser = JSON.parse(sessionStorage.getItem("viewingUser"));
let viewingPost = JSON.parse(sessionStorage.getItem("viewingPost"));

if(currentUser == null && viewingUser == null) {
    console.log("No Current User stored.");
    currentUser = userGuest;
    viewingUser = userGuest;
} else {
    console.log("Current User is " + currentUser.name);
}

if(sessionStorage.getItem("currentPosts") == null) {
    console.log("There are no posts currently stored.");
    sessionStorage.setItem("currentPosts", JSON.stringify(posts));
} else {
    console.log("Posts Retrieved.");
    posts = JSON.parse(sessionStorage.getItem("currentPosts"));
}

console.log(posts);


// Functions -----------------------------------------------------------------------
function displayAllPosts(posts) {
    for(let post of posts) {
        writePost(post.user, post);
    }
}

// Switching User
function switchUser(newUser) {
    $(document).ready(function() {
        $("#current-username").text(newUser.username);
        $("#user-selected").attr("src", newUser.img);
        currentUser = newUser;
        sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
        console.log(sessionStorage);

        if(newUser.name == userGuest.name) {
            $(".descsnippet").show();
            $(".home-description").hide();
            console.log("Switched to Guest");
        } else {
            $(".home-description").show();
            $(".descsnippet").hide();
            console.log("Switched to User");
        }
    });
}

// Window location when clicked on profile
function viewUserProfile(user) {
    if(user.name == userGuest.name || currentUser.name == userGuest.name) {
        window.location = "login.html";
        alert("You are not a registered user! Please log in.");
    } else {
        window.location = "profile.html";
    }
}

// Post related Functions
function getInputs(user) {
    if(currentUser.name == userGuest.name) {
        window.location = "login.html";
    } else {
        let formElement = document.forms.postform;
        let formData = new FormData(formElement);
        let count = 0;
        let title = "";
        let description = "";

        for (let data of formData) {
            if(count == 0) {
                title = data[1];
            } else {
                description = data[1];
            }

            count += 1;
        }

        let post = new Post(posts.length + 1, user, title, description);
        posts.push(post);
        sessionStorage.setItem("currentPosts", JSON.stringify(posts));
        writePost(currentUser, post);
    }
}

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
                        <span class="number"> ${post.upvotes} </span>
                        <span class="downvote"></span>
                        <span class="number"> ${post.downvotes} </span>
                    </div>
                </div>
            </div>`;

    postContainer.innerHTML += item;
    console.log("Posted.");
}

// Switching User on Home Page
$(document).ready(function() {
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

    // TODO: View Post
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

    // -----------------------------------------------------------------------------------------------
    // Switches Current User to clicked icon
    $("#user-guest").click(function() {
        let user = userGuest;
        console.log(user.name);
        switchUser(user);
   });

    $("#user-sakura").click(function() {
        let user = userSakura;
        console.log(user.name);
        switchUser(user);
   });

    $("#user-chaewon").click(function() {
        let user = userChaewon;
        console.log(user.name);
        switchUser(user);
    });

   $("#user-yunjin").click(function() {
        let user = userYunjin;
        console.log(user.name);
        switchUser(user);
   });

   $("#user-kazuha").click(function() {
        let user = userKazuha;
        console.log(user.name);
        switchUser(user);
    });

    $("#user-eunchae").click(function() {
        let user = userEunchae;
        console.log(user.name);
        switchUser(user);
    });
    //---------------------------------------------------------------
});