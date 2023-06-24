const User = function(name, password) {
    this.name = name;
    this.lname = this.name.toLowerCase();
    this.username = "@" + this.lname;
    this.password = password;
    this.acc = "#user-" + name;
    this.img = "./profilepics/" + this.lname + ".jpg";
    this.bio = "test bio";
}

let userGuest = new User("Guest", "1234");
let currentUser = userGuest;
let userSakura = new User("Sakura", "letmeplay");
let userChaewon = new User("Chaewon", "tyforsupportingus");
let userYunjin = new User("Yunjin", "IGOTACONDOINMANHATTAN");
let userKazuha = new User("Kazuha", "bang!");
let userEunchae = new User("eunchae", "mubankpresident");
let posts = [];

// Post and Comment Construtors 
const Post = function(num, user, title, description) {
    this.num = num;
    this.title = title;
    this.user = user;
    this.description = description;
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


// Put 5 Sample Posts on Website
let post1 = new Post(1, userSakura, "test title", "test description");
let post2 = new Post(2, userEunchae, "big announcement", "Ever since Wonyoung's contract for Music Bank expired, they opened auditions! GUESS WHO'S THE NEW MUSIC BANK PRESIDENT??????");
let post3 = new Post(3, userYunjin, "life update", "BTS PLEASE COME BACK");
let post4 = new Post(4, userChaewon, "What is Hyewon up to?", "Hyewon still updates her Youtube but not as regularly as before, she hasn't been posting a lot on Instagram like before too sadly.");
let post5 = new Post(5, userKazuha, "How good was Park Sunghoon as a skater?", "He wasn't Korea's top man for sure haha but is there someone who maybe followed korean skating more or something who could tell me, from objective fs point, how good he actually was? Could he potentially get really on top if he continued? Was there still room for improvement (considering he's 19 rn, so not that young but also not that old) or he probably reached his limits?");

// Put Posts in Arrays
posts.push(post1);
posts.push(post2);
posts.push(post3);
posts.push(post4);
posts.push(post5);

localStorage.setItem("currentPosts", JSON.stringify(posts));
console.log(localStorage);

// Display All Posts from All Users
function displayAllPosts(posts) {
    for(let post of posts) {
        writePost(post.user, post);
    }
}

function displaySnippetPosts(posts) {
    $(document).ready(function() {
        for(let post of posts) {
            
            writePostSnippet(post.user, post);
        }
    });
}

// Functions
displaySnippetPosts(posts.slice(0, 3));

// Switch User: updates currentUser
function switchUser(newUser) {
    $(document).ready(function() {
        $("#current-username").text(newUser.username);
        $("#user-selected").attr("src", newUser.img);
        currentUser = newUser;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        console.log(localStorage);

        if(newUser == userGuest) {
            let feedContainer = document.querySelector("#posts-feed");
            feedContainer.innerHTML = "";
            displaySnippetPosts(posts.slice(0, 3));
        } else {
            let feedContainer = document.querySelector("#posts-feed");
            feedContainer.innerHTML = "";
            displayAllPosts(posts);
        }
    });
}

// TODO: View User Profile
function viewUserProfile(user) {
    if(user == userGuest) {
        window.location = "login.html";
    } else {
        window.location = "profile.html";
    }
}

// Hides Edit Profile Button
function hideEditProfile(user) {
    const editProfileButton = document.getElementsByName("Edit Profile");

    // Show edit profile button
    $(document).ready(function() {
        if(currentUser.id === viewingProfile.id) {
            //editProfileButton.show();
            editProfileButton.style.display = "block";
        // Hide edit profile button
        } else {
            //editProfileButton.hide();
            editProfileButton.style.display = "none";
        }
    });
}

// Post

function getInputs(user) {
    if(currentUser == userGuest) {
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
        localStorage.setItem("currentPosts", JSON.stringify(posts));
        writePost(currentUser, post);
    }
}

function writePost(user, post) {
    const postContainer = document.querySelector("#posts-feed");
    const item =
            `<div class="flex-row-container post">
                <div>
                    <img class="user" src="${user.img}">
                </div>

                <div class="flex-column-container post-details">
                    <p class="username"> ${user.username} </p>
                    <p class="post-title"> ${post.title} </p>
                    <p class="description"> ${post.description} </p>
                        
                    <div class="actions">
                        <span class="comment"></span>
                        <span class="upvote"></span>
                        <span class="downvote"></span>
                    </div>
                </div>
            </div>`;

    postContainer.innerHTML += item;
}

function writePostSnippet(user, post) {
    const postContainer = document.querySelector("#posts-feed");
    let desc = post.description.slice(0,30);
    const item =
            `<div class="flex-row-container post">
                <div>
                    <img class="user" src="${user.img}">
                </div>

                <div class="flex-column-container post-details">
                    <p class="username"> ${user.username} </p>
                    <p class="post-title"> ${post.title} </p>
                    <p class="description"> ${desc}... </p>
                        
                    <div class="actions">
                        <span class="comment"></span>
                        <span class="upvote"></span>
                        <span class="downvote"></span>
                    </div>
                </div>
            </div>`;

    postContainer.innerHTML += item;
}

// Switching User on Home Page
$(document).ready(function() {

    $("#submit-post").click(function() {
        console.log("Posting...");
        if(currentUser == userGuest) {
            window.location = "login.html";
        } else {
            getInputs(currentUser);
        }
    })

    $("p.post-title").click(function() {
        console.log("Viewing Post");
        //$(this).css("color", "red");
        //alert("viewing post");
        window.location = "postview.html";
    })

    // View Current User's Profile
    $("#user-selected").click(function() {
        viewUserProfile(currentUser);
    });


    // Switches User to clicked icon
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
});