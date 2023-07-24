// let currentURL = window.location.href;
// let params = new URLSearchParams(new URL(currentURL).search);
// let user = params.get("loggedIn");

// initialize which posts are displayed as upvoted or downvoted
$(document).ready(function() {
    let votes;

    let ucvote;
    let dcvote;
    let upvote;
    let dpvote;

    async function startVoting(){
        try {
            let votesString = await getVotes();
            votes = JSON.parse(votesString);
        } catch (error) {
            console.error("error fetching votes", error);
        }

        ucvote = votes.upvoteComments;
        dcvote = votes.downvoteComments;
        upvote = votes.upvotePosts;
        dpvote = votes.downvotePosts;

        // assign clicked class on all relevant

        const postUVButton = $("div.flex-row-container.post button.upvote");
        const postDVButton = $("div.flex-row-container.post button.downvote");
        const commentUVButtons = $("div.flex-column-container.comment-section button.upvote");
        const commentDVButtons = $("div.flex-column-container.comment-section button.downvote");
        
        postUVButton.each(function () {
            const eNumber = $(this).closest(".post").prop("id").slice(-1);
            
            if (upvote.includes(Number(eNumber))) {
              $(this).addClass("clicked");
            }
        });

        postDVButton.each(function () {
            const eNumber = $(this).closest(".post").prop("id").slice(-1);
            
            if (dpvote.includes(Number(eNumber))) {
              $(this).addClass("clicked");
            }
        });
        
        commentUVButtons.each(function () {
            const eNumber = $(this).closest("[id*=comment]").prop("id").slice(-1);
            
            if (ucvote.includes(Number(eNumber))) {
              $(this).addClass("clicked");
            }
        });

        commentDVButtons.each(function () {
            const eNumber = $(this).closest("[id*=comment]").prop("id").slice(-1);
            
            if (dcvote.includes(Number(eNumber))) {
              $(this).addClass("clicked");
            }
        });
    }
    startVoting();
});

// Upvote when viewing a post
$("button.upvote").click(async function() {

    //var made to find this upvote's corresponding downvote button
    let downvoteButton = $(this).nextAll("button.downvote").first();

    
    let eNumber = $(this).closest(".post,[id*=comment]").prop("id").slice(-1); 
    let eType = $(this).closest(".post,[id*=comment]").prop("id").slice(0,-1);


    let voteCount = $(this).siblings(".number"); 
    let currentVotes = parseInt(voteCount.text()); 

    //TODO: apple class clicked to clicked based on user


    // Removes vote if clicked again
    if ($(this).hasClass('clicked')) {
    
        //decrease vote count here by 1
        newVotes = currentVotes - 1;
        voteCount.text(newVotes);

        $(this).removeClass('clicked');
    }
    // Removes effect of opposite vote if clicked
    else if (downvoteButton.hasClass('clicked')){
        //increase the vote count by 2,because it nullifies the downvote
        newVotes = currentVotes + 2;
        voteCount.text(newVotes);
        $(this).addClass('clicked');
        downvoteButton.removeClass('clicked');
    }   
    //When no vote was clicked
    else{
        //increase vote count here by 1
    
        newVotes = currentVotes + 1;
        voteCount.text(newVotes);

        $(this).addClass('clicked');
    }
    console.log("new votes::",newVotes);

    const data = {
        votes: newVotes,
        type: eType,
        number: eNumber,
        action: "upvote"
    };
    console.log(data);

    const jString = JSON.stringify(data);

    const response = await fetch("/posts/_id/votes", {
        method: 'POST',
        body: jString,
        headers: {
            'Content-type': 'application/json'
        }
    });



    if(response.status === 200) {
        location.reload();
    } else {
        console.log("Status code received: " + response.status);
    }

});



// Downvote when viewing a post
$("button.downvote").click(async function() {
        
    //var made to find this downvote's corresponding upvote button
    let upvoteButton = $(this).prevAll("button.upvote").first();
        

    let eNumber = $(this).closest(".post,[id*=comment]").prop("id").slice(-1); 
    let eType = $(this).closest(".post,[id*=comment]").prop("id").slice(0,-1);

    let voteCount = $(this).siblings(".number"); 
    let currentVotes = parseInt(voteCount.text()); 

    //removes vote if clicked again  
    if ($(this).hasClass('clicked')) {
        //increase vote count here by 1
        newVotes = currentVotes + 1;
        voteCount.text(newVotes);
        $(this).removeClass('clicked');
    }
    //removes effect of opposite vote if clicked
    else if (upvoteButton.hasClass('clicked')){
        //decrease the vote count by 2,because it nullifies the upvote
        newVotes = currentVotes - 2;
        voteCount.text(newVotes);
        $(this).addClass('clicked');
        upvoteButton.removeClass('clicked');
    }
    //when no vote was clicked
    else{
        //decrease vote count here by 1
        newVotes = currentVotes - 1;
        voteCount.text(newVotes);
        $(this).addClass('clicked');
    }


    const data = {
        votes: newVotes,
        type: eType,
        number: eNumber,
        action: "downvote"
    };
    console.log(data);

    const jString = JSON.stringify(data);
    
    const response = await fetch("/posts/_id/votes", {
        method: 'POST',
        body: jString,
        headers: {
            'Content-type': 'application/json'
        }
    });

    if(response.status === 200) {
        location.reload();
    } else {
        console.log("Status code received: " + response.status);
    }

});


async function getVotes() {
    const currentURL = window.location.href;
    const params = new URLSearchParams(new URL(currentURL).search);
    const currentUser = params.get("loggedIn");

    try {
        const response = await fetch("/votes?loggedIn=" + currentUser, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }
        });
    
        if (response.ok) {
            const votes = await response.text();
            return votes;
        } else {
            console.log('Failed to fetch the users votes page.');
        }
        
    } catch (err) {
        console.error('Error:', err);
    }
}




