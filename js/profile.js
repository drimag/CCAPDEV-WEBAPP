// Display user's latest posts
$(document).ready(function() {
    $(".latestposts a").click(function() {
        if(currentUser === postAuthor) {
            $(".post").show();
        }
    })
});

// Display user's latest comments
$(document).ready(function() {
    $(".latestcomments a").click(function() {
        if(currentUser === postAuthor) {
            $(".comment").show();
        }*/
    })
});

/*
const listOfPosts = [];
document.getElementsByClassName("post").innerHTML = listOfPosts;
// OR?? idk which one works
const listOfPosts = Array.from(document.getElementsByClassName(".post"));
*/

// "Show More Posts" button to show more posts
function showMorePosts() {
    $(document).ready(function() {
        $(".show-more-posts-button").click(function() {
            $().toggle();
        })
    });
}

listOfPosts.forEach(checkUsersPostsAndComments());

function checkUsersPostsAndComments(element) {

    if(currentUser === postAuthor) {
        $(".comment").show();
    }
}