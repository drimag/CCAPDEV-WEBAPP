let ucvote;
let dcvote;
let upvote;
let dpvote;

// initialize which posts are displayed as upvoted or downvoted
$(document).ready(function() {
    let votes;

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
        const commentUVButtonsProfile = $("div.flex-row-container.comment-list button.upvote");
        const commentDVButtonsProfile = $("div.flex-row-container.comment-list button.downvote");

        console.log("post votes: "+ JSON.stringify(postUVButton) + "downvotes: " + JSON.stringify(postDVButton))

        console.log("comment votes: " + JSON.stringify(commentUVButtons) + "downvotes: " + JSON.stringify(commentDVButtons));
        
        if(postUVButton !== null && upvote !== null) {
            postUVButton.each(function () {
            const eNumber = parseInt($(this).closest(".post").prop("id").slice(4));
            
            if (upvote.includes(Number(eNumber))) {
              $(this).addClass("clicked");
            }
            });
        }
        
        if(postDVButton !== null && dpvote !== null) {
            postDVButton.each(function () {
                const eNumber = parseInt($(this).closest(".post").prop("id").slice(4));
                
                if (dpvote.includes(Number(eNumber))) {
                $(this).addClass("clicked");
                }
            });
        }

        if(commentUVButtons !== null && ucvote !== null) {
            commentUVButtons.each(function () {
                const eNumber = parseInt($(this).closest("[id*=comment]").prop("id").slice(7));
                
                if (ucvote.includes(Number(eNumber))) {
                $(this).addClass("clicked");
                }
            });
        }

        if(commentDVButtons !== null && dcvote !== null) {
            commentDVButtons.each(function () {
                const eNumber = parseInt($(this).closest("[id*=comment]").prop("id").slice(7));
                
                if (dcvote.includes(Number(eNumber))) {
                $(this).addClass("clicked");
                }
            });
        }

        if(commentUVButtonsProfile !== null && ucvote !== null) {
            commentUVButtonsProfile.each(function () {
            const eNumber = parseInt($(this).closest("[id*=comment]").prop("id").slice(7));
            
            if (ucvote.includes(Number(eNumber))) {
              $(this).addClass("clicked");
            }
            });
        }

        if(commentDVButtonsProfile !== null && dcvote !== null) {
            commentDVButtonsProfile.each(function () {
            const eNumber = parseInt($(this).closest("[id*=comment]").prop("id").slice(7));
            
            if (dcvote.includes(Number(eNumber))) {
              $(this).addClass("clicked");
            }
            });
        }

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

    let newUCVote = ucvote;
    let newDCVote = dcvote;
    let newUPVote = upvote;
    let newDPVote = dpvote;

    console.log("yoooo" + ucvote + dcvote+upvote+dpvote);
    
    let newVotes;
    // Removes vote if clicked again
    if ($(this).hasClass('clicked')) {
        
        // remove eNumber from ucvote or upvote
        if(eType === "post") {
            newUPVote = upvote.filter((num) => num !== parseInt(eNumber));
        } else if (eType === "comment") {
            newUCVote = ucvote.filter((num) => num !== parseInt(eNumber));
            console.log("remove comment upvote");
        }

        newVotes = currentVotes - 1; 
        $(this).removeClass('clicked');
        voteCount.text(newVotes);
    }
    // Removes effect of opposite vote if clicked
    else if (downvoteButton.hasClass('clicked')){
        //increase the vote count by 2,because it nullifies the downvote

        if(eType === "post") {
            newDPVote = dpvote.filter((num) => num !== parseInt(eNumber));
            newUPVote = [ ...upvote , parseInt(eNumber)];
        } else if (eType === "comment") {
            newDCVote = dcvote.filter((num) => num !== parseInt(eNumber));
            newUCVote = [ ...ucvote , parseInt(eNumber)];
        }

        newVotes = currentVotes + 2;
        $(this).addClass('clicked');
        voteCount.text(newVotes);
        downvoteButton.removeClass('clicked');
    }   
    //When no vote was clicked
    else{
        console.log("Third");
        //increase vote count here by 1
    
        
        if(eType === "post") {
            newUPVote = [ ...upvote , parseInt(eNumber)];
        } else if (eType === "comment") {
            newUCVote = [ ...ucvote , parseInt(eNumber)];
        }

        newVotes = currentVotes + 1;
        $(this).addClass('clicked');
        voteCount.text(newVotes);
    }
    console.log("new votes::", newVotes);

    const data = {
        upvoteComments: newUCVote,
        downvoteComments: newDCVote,
        upvotePosts: newUPVote,
        downvotePosts: newDPVote,
        type: eType,
        num: parseInt(eNumber),
        votes: parseInt(newVotes)
    };

    console.log(data);

    const jString = JSON.stringify(data);

    const currentURL = window.location.href;
    const params = new URLSearchParams(new URL(currentURL).search);
    const currentUser = params.get("loggedIn");
    try {
        const response = await fetch("/votes", {
            method: 'PUT',
            body: jString,
            headers: {
                'Content-type': 'application/json'
            }
        });
        if(response.status === 200) {
            console.log("Upvote Successful");
            //location.reload(); // should be removed 
        } else {
            console.log("Status code received: " + response.status);
        }
    } catch (err) {
        console.error(err);
    }
});

// Downvote when viewing a post
$("button.downvote").click(async function() {
        
    // var made to find this downvote's corresponding upvote button
    let upvoteButton = $(this).prevAll("button.upvote").first();

    let eNumber = $(this).closest(".post,[id*=comment]").prop("id").slice(-1); 
    let eType = $(this).closest(".post,[id*=comment]").prop("id").slice(0,-1);

    let voteCount = $(this).siblings(".number"); 
    let currentVotes = parseInt(voteCount.text()); 
    let newVotes;

    let newUCVote = ucvote;
    let newDCVote = dcvote;
    let newUPVote = upvote;
    let newDPVote = dpvote;

    // Removes vote if clicked again  
    if ($(this).hasClass('clicked')) {
        // Increase vote count here by 1
        
        if(eType === "post") {
            newDPVote = dpvote.filter((num) => num != parseInt(eNumber));
        } else if (eType === "comment") {
            newDCVote = dcvote.filter((num) => num != parseInt(eNumber));
            console.log("remove comment upvote");
        }

        newVotes = currentVotes + 1;
        voteCount.text(newVotes);
        $(this).removeClass('clicked');
    }
    // Removes effect of opposite vote if clicked
    else if (upvoteButton.hasClass('clicked')){
        // Decrease the vote count by 2, because it nullifies the upvote
        
        
        if(eType === "post") {
            newUPVote = upvote.filter((num) => num != parseInt(eNumber));
            newDPVote = [ ...dpvote , parseInt(eNumber)];
        } else if (eType === "comment") {
            newUCVote = ucvote.filter((num) => num != parseInt(eNumber));
            newDCVote = [ ...dcvote , parseInt(eNumber)];
        }
        newVotes = currentVotes - 2;
        voteCount.text(newVotes);
        $(this).addClass('clicked');
        upvoteButton.removeClass('clicked');
    }
    // When no vote was clicked
    else{
        // Decrease vote count by 1
    
        if(eType === "post") {
            newDPVote = [ ...dpvote , parseInt(eNumber)];
        } else if (eType === "comment") {
            newDCVote = [ ...dcvote , parseInt(eNumber)];
        }

        newVotes = currentVotes - 1;
        voteCount.text(newVotes);
        $(this).addClass('clicked');
    }

    const data = {
        upvoteComments: newUCVote,
        downvoteComments: newDCVote,
        upvotePosts: newUPVote,
        downvotePosts: newDPVote,
        type: eType,
        num: parseInt(eNumber),
        votes: parseInt(newVotes)
    };

    console.log(data);

    const jString = JSON.stringify(data);

    const currentURL = window.location.href;
    const params = new URLSearchParams(new URL(currentURL).search);
    const currentUser = params.get("loggedIn");
    try {
        const response = await fetch("/votes", {
            method: 'PUT',
            body: jString,
            headers: {
                'Content-type': 'application/json'
            }
        });
        if(response.status === 200) {
            console.log("Upvote Successful");
            //location.reload();
        } else {
            console.log("Status code received: " + response.status);
        }
    } catch (err) {
        console.error(err);
    }

});

async function getVotes() {
    const currentURL = window.location.href;
    const params = new URLSearchParams(new URL(currentURL).search);
    const currentUser = params.get("loggedIn");

    try {
        const response = await fetch("/votes", {
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