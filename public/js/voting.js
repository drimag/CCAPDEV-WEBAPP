
    // Upvote when viewing a post
    $("button.upvote").click(async function() {

        //var made to find this upvote's corresponding downvote button
        let downvoteButton = $(this).nextAll("button.downvote").first();

        
        let eNumber = $(this).closest(".post,[id*=comment]").prop("id").slice(-1); 
        let eType = $(this).closest(".post,[id*=comment]").prop("id").slice(0,-1);


        let voteCount = $(this).siblings(".number"); 
        let currentVotes = parseInt(voteCount.text()); 


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
     





