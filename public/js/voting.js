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
        
        if(postUVButton !== null && upvote !== null) {
            postUVButton.each(function () {
            const eNumber = $(this).closest(".post").prop("id").slice(-1);
            
            if (upvote.includes(Number(eNumber))) {
              $(this).addClass("clicked");
            }
            });
        }
        
        if(postDVButton !== null && dpvote !== null) {
            postDVButton.each(function () {
                const eNumber = $(this).closest(".post").prop("id").slice(-1);
                
                if (dpvote.includes(Number(eNumber))) {
                $(this).addClass("clicked");
                }
            });
        }

        if(commentUVButtons !== null && ucvote !== null) {
            commentUVButtons.each(function () {
                const eNumber = $(this).closest("[id*=comment]").prop("id").slice(-1);
                
                if (ucvote.includes(Number(eNumber))) {
                $(this).addClass("clicked");
                }
            });
        }

        if(commentDVButtons !== null && dcvote !== null) {
            commentDVButtons.each(function () {
                const eNumber = $(this).closest("[id*=comment]").prop("id").slice(-1);
                
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
    console.log("type: " + eType);
    console.log("number: " + eNumber);

    let voteCount = $(this).siblings(".number"); 
    let currentVotes = parseInt(voteCount.text()); 

    //TODO: apple class clicked to clicked based on user

    let newUCVote = ucvote;
    let newDCVote = dcvote;
    let newUPVote = upvote;
    let newDPVote = dpvote;

    console.log("yoooo" + ucvote + dcvote+upvote+dpvote);
    
    let newVotes;
    // Removes vote if clicked again
    if ($(this).hasClass('clicked')) {
        console.log("First");
        newVotes = currentVotes - 1; // remember to update in db late
        // remove eNumber from ucvote or upvote
        if(eType === "post") {
            newUPVote = upvote.filter((num) => num !== parseInt(eNumber));
        } else if (eType === "comment") {
            newUCVote = ucvote.filter((num) => num !== parseInt(eNumber));
            console.log("remove comment upvote");
        }

        //$(this).removeClass('clicked');
    }
    // Removes effect of opposite vote if clicked
    else if (downvoteButton.hasClass('clicked')){
        console.log("Second");
        //increase the vote count by 2,because it nullifies the downvote
        newVotes = currentVotes + 2;

        if(eType === "post") {
            newDPVote = dpvote.filter((num) => num !== parseInt(eNumber));
            newUPVote = [ ...upvote , parseInt(eNumber)];
        } else if (eType === "comment") {
            newDCVote = dcvote.filter((num) => num !== parseInt(eNumber));
            newUCVote = [ ...ucvote , parseInt(eNumber)];
        }
    }   
    //When no vote was clicked
    else{
        console.log("Third");
        //increase vote count here by 1
    
        newVotes = currentVotes + 1;
        if(eType === "post") {
            newUPVote = [ ...upvote , parseInt(eNumber)];
        } else if (eType === "comment") {
            newUCVote = [ ...ucvote , parseInt(eNumber)];
        }

        //$(this).addClass('clicked');
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
        const response = await fetch("/votes?loggedIn=" + currentUser, {
            method: 'PUT',
            body: jString,
            headers: {
                'Content-type': 'application/json'
            }
        });
        if(response.status === 200) {
            console.log("Upvote Successful");
            location.reload();
        } else {
            console.log("Status code received: " + response.status);
        }
    } catch (err) {
        console.error(err);
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
    let newVotes;

    let newUCVote = ucvote;
    let newDCVote = dcvote;
    let newUPVote = upvote;
    let newDPVote = dpvote;

    //removes vote if clicked again  
    if ($(this).hasClass('clicked')) {
        //increase vote count here by 1
        newVotes = currentVotes + 1;
        if(eType === "post") {
            newDPVote = dpvote.filter((num) => num != parseInt(eNumber));
        } else if (eType === "comment") {
            newDCVote = dcvote.filter((num) => num != parseInt(eNumber));
            console.log("remove comment upvote");
        }
    }
    //removes effect of opposite vote if clicked
    else if (upvoteButton.hasClass('clicked')){
        //decrease the vote count by 2,because it nullifies the upvote
        newVotes = currentVotes - 2;
        console.log("test: " + eNumber);
        if(eType === "post") {
            newUPVote = upvote.filter((num) => num != parseInt(eNumber));
            newDPVote = [ ...dpvote , parseInt(eNumber)];
        } else if (eType === "comment") {
            newUCVote = ucvote.filter((num) => num != parseInt(eNumber));
            newDCVote = [ ...dcvote , parseInt(eNumber)];
        }
        console.log("test: " + newVotes + newUPVote);
    }
    //when no vote was clicked
    else{
        //decrease vote count here by 1
        newVotes = currentVotes - 1;
        if(eType === "post") {
            newDPVote = [ ...dpvote , parseInt(eNumber)];
        } else if (eType === "comment") {
            newDCVote = [ ...dcvote , parseInt(eNumber)];
        }
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
        const response = await fetch("/votes?loggedIn=" + currentUser, {
            method: 'PUT',
            body: jString,
            headers: {
                'Content-type': 'application/json'
            }
        });
        if(response.status === 200) {
            console.log("Upvote Successful");
            location.reload();
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