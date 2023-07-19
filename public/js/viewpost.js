$(document).ready(function() {

    $("#createCommentForm").hide();

    $("#add-comment").click(function() {
        $("#createCommentForm").show();
        $("#add-comment").hide();
    });

    $("button").hover(function() {
        $(this).css('cursor', 'pointer');
    });

    // Post Comment
    $("#createComment").click(function() {
        $()
    });


/////////FROM MCO1 (modified)

        // Upvote when viewing a post
        $("button.upvote").click(function() {
            //var made to find this upvote's corresponding downvote button
            let downvoteButton = $(this).nextAll("button.downvote").first();

            // Removes vote if clicked again
		    if ($(this).hasClass('clicked')) {
			    //decrease vote count here by 1
                
			    $(this).removeClass('clicked');
            }
		    // Removes effect of opposite vote if clicked
		    else if (downvoteButton.hasClass('clicked')){
			    //increase the vote count by 2,because it nullifies the downvote

			    $(this).addClass('clicked');
			    downvoteButton.removeClass('clicked');
            }   
		    //When no vote was clicked
		    else{
			    //increase vote count here by 1

			    $(this).addClass('clicked');
		    }
        });


        // Downvote when viewing a post
        $("button.downvote").click(function() {
            
            //var made to find this downvote's corresponding upvote button
            let upvoteButton = $(this).prevAll("button.upvote").first();

            //removes vote if clicked again  
		    if ($(this).hasClass('clicked')) {
			    //increase vote count here by 1

			    $(this).removeClass('clicked');
            }
		    //removes effect of opposite vote if clicked
		    else if (upvoteButton.hasClass('clicked')){
			    //decrease the vote count by 2,because it nullifies the upvote

			    $(this).addClass('clicked');
			    upvoteButton.removeClass('clicked');
            }
		    //when no vote was clicked
            else{
			    //decrease vote count here by 1

			    $(this).addClass('clicked');
		    }
        });


    ///////////////////////////////////////////
    // View Author Profile
    $("#author-pic").hover(function() {
        $(this).css('cursor', 'pointer');
    });

    $("#author-pic").click(function() {
        console.log('View Profile');
        let author = $("#postauthor-username").text();
        author = author.substring(2).trimEnd();
        console.log(author);
        
        const currentUser = $("#currentUser-navuser").text();
        console.log("Current User: " + currentUser);
        location.href = "/profile/" + author + "?loggedIn=" + currentUser;
    });
    ////////////////////////////////////////////

    // TODO: View Comments User Profile

    // TODO: Edit Post

    // TODO: Delete Post
});