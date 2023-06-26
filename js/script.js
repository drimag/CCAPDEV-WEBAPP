const User = function(name, password) {
    this.name = name;
    this.lname = this.name.toLowerCase();
    this.username = "@" + this.lname;
    this.password = password;
    this.acc = "#user-" + name;
    this.img = "./profilepics/" + this.lname + ".jpg";
    this.bio = "";
}

let users = [];
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
    this.votes = 0;
    this.comments = [];
    //this.deleted = false;
}

const Comment = function(repliedTo, user, description) {
    this.repliedTo = repliedTo;
    this.user = user;
    this.description = description;
    this.votes = 0;
    this.comments = [];
}

let posts = [];
let comments = [];

posts.push(new Post(1, userSakura, "Would you disband IVE and LESSERAFIM to bring back IZONE?", "izone was smth else bruh they were the first 4th gen gg pulling both sales and charts they were straight up competing with bp and twice but we gotta admit IVE is definitely one of the best if its not the best 4th gen gg rn and Lesserafim debut is just iconic So if you ask me this after listening love dive and fearless I would say fck no but if you ask me this after watching izones old vlives and stuff I would straight up say yes no doubt tho I gotta say I feel theyre not as comfortable (as their were with izone members) with their new groups yet (specifically wy) but I believe its only matter of time")
            , new Post(2, userEunchae, "big announcement", "Ever since Wonyoungs contract for Music Bank expired, they opened auditions! GUESS WHOS THE NEW MUSIC BANK PRESIDENT??????")
            , new Post(3, userYunjin, "MANNNNNNNNNNNNNNN", "BTS PLEASE COME BACK")
            , new Post(4, userChaewon, "What is Hyewon up to?", "Hyewon still updates her Youtube but not as regularly as before, she hasnt been posting a lot on Instagram like before too sadly.")
            , new Post(5, userKazuha, "How good was Park Sunghoon as a skater?", "He wasnt Koreas top man for sure haha but is there someone who maybe followed korean skating more or something who could tell me, from objective fs point, how good he actually was? Could he potentially get really on top if he continued? Was there still room for improvement (considering hes 19 rn, so not that young but also not that old) or he probably reached his limits?")
            , new Post(6, userKazuha, "Idols that do Ballet", "Why do they keep making them do dance moves related to it EVERY SINGLE CHOREO???")
            , new Post(7, userYunjin, "scientist is one of twice best title tracks!", "this is unpopular due to the amount of hate the song got during the time it was being promoted, it still gets hate to this day in my opinion. but i personally believe it is one of their best title tracks, it is fun and upbeat without being too much on the ears. it utilizes the members voices in a way that is comfortable for them and the dance is AMAZING! it is also paired with their best full album as well! i was honestly shocked at the amount of hate it got everywhere, i think the song is such a happy pill!")
            , new Post(8, userEunchae, "How big/successful was this comeback (Dark Blood) compared to their previous comebacks?", "Not exactly a baby engene so sorry if this sounds ignorant/out of touch. I just cant keep up with the metrics, and even when I do read stuff about record numbers and new achievements, Im curious to know both objective and subjective (like how you personally gauge or feel about it) review/recap of Dark Bloods promotions compared to ENHYPENs previous comebacks. Because I can only speak subjectively, I will be honest and say I feel like it fell a bit short of expectations success-wise. It had the most anticipation for an Enha comeback since it had the longest timeframe between releases; also the fact that this was after a major world tour. Then we got the well-executed teasers leading up to the release. Then the EP itself-its arguably the most ENHYPEN album, the one most faithful to their concept and lore, which the kpop community actually gives credit to how the group suit their vampire concept well (even though Bite Me got mixed reviews mostly for song structure reasons). And speaking of Bite Me, the female dancers situation created a lot of buzz-mostly good imo! But heres where I felt it peaked (and that spectacle was only barely a week after the showcase, Im not sure anymore) After that I felt that while the group were getting music show wins and Bite Me/Sacrifice are still strong on several streaming platforms (at least on the intl side), I suppose there was a louder noise surrounding them and a longer sustained interest during the other eras e.g. Manifesto, D:D or D:A, etc. I could be entirely wrong though. So Im interested to know your thoughts, or you may just slap me with their achievements this era because I just probably need assurance that the boys are doing great (oh, I do see that theyve leveled up in many aspects, like theyre so comfortable and confident in front of the camera now! And their recent group weverse lives are lovely to watch, you can tell that the group is more tight-knit than ever)")
            , new Post(9, userChaewon, "the dancer controversy may unironically be the best thing that could have happened to enha, and/or the short attention span of kpop fans is something to behold", "As much as I love to shit on Belift I have to give it to them. They really played 4D chess with this. Even if the reaction was unintentional, the choice to use dancers for bite mes choreo was definitely a good move in hindsight, even if it isolated a few angry kfans lol. And sure, it could be argued that it had an affect on their kcharting but when has that ever been a factor for them (even if its not the best anyways, it did peak on melon and is still charting without free falling so Id consider it an improvement. Not only did it bring lots of attention to the song and the cb but anecdotally Ive noticed being an Enhypen fan is alot more peaceful this era. Of course being one of the most hated 4th Gen groups never means complete peace, but generally speaking Ive noticed more people including nonfans talking about them positively, sympathizing with them, giving them attention that wasnt there before, and less negative and hateful comments generally speaking. Due in part to the album being amazing of course but also due to this “controversy”. The hate I do still see usually gets ratioed or downvoted into oblivion moreso than being agreed with by default like before. I curate my experience but there will always be antis so the fact that Im not seeing much more than an odd comment or general passive aggressiveness is nice. Sometimes I forget how short the attention span and cycle of trends in kpop fandom works generally because I find it almost insane how Enhypen went from having a year long, very widespread and active hate train to being treated and regarded relatively normally and getting some praises within the course of less than a month. Knock on wood that it stays this way, but I just find it hilarious how this one little thing has improved my fan experience tenfold lol thanks for one thing belift ig")
            , new Post(10, userSakura, "Queendom Puzzle: Cherry Bullet Bora hate is laughable", "I didnt know who bora was before queendom but damn she is one of the most talented idols on the show but apparently she isnt well liked right now, bc she is being too strategic. However Im so lost bc literally a few weeks ago chaeyeon was praised like a bossgirl n queen for downvoting everyone n leaving. Saying its a competition n that she is being strategic. But when bora does something strategic as downvoting top performers or choosing a team that better outlines her vocals, she becomes the devil n hated by everyone? Mnet making her the villain n fans r eating it up, saying her vocals r not good and kei is much better. Slay bora make them mad lmao, I love stanning idols who piss off K-pop Stans for slaying."));

console.log(posts);
posts[0].votes = 203;
posts[1].votes = 89;
posts[2].votes = 504;
posts[3].votes = 38;
posts[4].votes = 5;

// Add Comments to at least 5 posts
comments.push(new Comment(userSakura, userEunchae, "I think it is because chae yeon was upfront about it. And let us be honest chae yeon os more well known and liked")
            , new Comment(userSakura, userYunjin, "The problem for me wasn't that she was strategic, but that her strategy was a very poor one.")
            , new Comment(userEunchae, userChaewon, "imo this comeback was one of the best ones! since fever really widened their fanbase, this def had a bigger impact.")
            , new Comment(userYunjin, userKazuha, "I will never understand how people hate Scientist.. it's literally perfect, the choreography, the music everything was on point, this song literally screams TWICE")
            , new Comment(userSakura, userChaewon, "I get where the hate is coming from. She's basically the top in rankings now yet she's still doing the I need to stand out bit. Although I think she's doing it too early. At this early point of the contest, any contestant should prioritize winning the group tasks first, before worrying about the need to stand out.")
            , new Comment(userSakura, userYunjin, "I do not understand your comment, that should not warrant hate, who cares if she is still, doing “I am trying to stand out thing” isnt that the point of the show, it is still the beginning and anything could change, she could drop to the bottom next week, it is a competition. You can still prioritize yourself while prioritizing group tasks too, it is not like her doing ruined the song or she is at fault if a member she chooses underperforms"));

posts[9].comments.push(comments[0], comments[1], comments[4]);
posts[7].comments.push(comments[2]);
posts[6].comments.push(comments[3]);

// Comment in Comment Sample Data
comments[4].comments.push(comments[5]);

sessionStorage.setItem("currentPosts", JSON.stringify(posts));
sessionStorage.setItem("currentComments", JSON.stringify(comments));

/*
drimag testing code feel free to remove
*/
// console.log("test1");
// console.log(posts.length);
// let a = JSON.parse(sessionStorage.getItem("currentPosts"));
// console.log(a[0].description);
// let newPost = new Post(posts.length, userSakura, "the quick brown fox jumps", "over the lazy dog")
// posts.push(newPost);
// console.log(posts);

// sessionStorage.setItem("currentPosts", JSON.stringify(posts));

// console.log(a);

// a = JSON.parse(sessionStorage.getItem("currentPosts"));


// console.log(a);
// console.log("test1");
/*
drimag testing code feel free to remove
*/



//------------------------------------
//drimag edit again
//let currentUser = 
let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
let viewingUser = JSON.parse(sessionStorage.getItem("viewingUser"));
let viewingPost = JSON.parse(sessionStorage.getItem("viewingPost"));
/*
Scuffed for Delete Post
let postsWithDeleted = JSON.parse(sessionStorage.getItem("currentPostsWithDeleted"));

if(postsWithDeleted == null) {
    postsWithDeleted = posts;
    sessionStorage.setItem("currentPostsWithDeleted", JSON.stringify(posts));
}
*/

if(currentUser == null && viewingUser == null) {
    console.log("No Current User stored.");
    currentUser = userGuest;
    viewingUser = userGuest;
} else {
    console.log("Current User is " + currentUser.name);
}

console.log("Total Posts: " + posts.length);


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

// Switching User on Home Page
$(document).ready(function() {

    // TODO: have function that decides what the posts are /*drimag edit*/
    // depending on if the user just did a search 
    // current approach: posts = session storage currentsearch posts
    posts = JSON.parse(sessionStorage.getItem("currentPosts"));
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

    // EFFECTs WHEN HOVERING
    $("p.post-title").hover(function() {
        $( this ).fadeOut( 200 );
        $( this ).fadeIn( 500 );
        $(this).css('cursor', 'pointer');
    })

    $("img").hover(function() {
        $(this).css('cursor', 'pointer');
    })
    // clean this: appears in profile.js also
    // FIX: format of showed more posts is wrong
    $("#home-show-more").on("click", function() {
        // Show 3 more posts when "Show More" button is clicked
        $(".post:hidden").slice(0,4).show();
        $(".post:hidden").style.display = 'flex';

        // Hide button
        if($(".post:hidden").length == 0) {
            $("#home-show-more").hide();
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