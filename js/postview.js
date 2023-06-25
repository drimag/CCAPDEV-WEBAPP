/*********************************************************************/

$(document).ready(function() {
  var upvoteCount = 1; 
  var downvoteCount = 1;
  var replyCount = 1;
  var voteValCount = 1;
  var commentPopCount = 1;
  var postButtonCount = 1;
  var commentAreaCount = 1;
  var commentBoxCount = 1;
  // gives every relevant class an id
  $('.upvote').each(function() {
    var upvID = 'upvote' + upvoteCount;
    $(this).attr('id', upvID);
    upvoteCount++;
  });


  $('.downvote').each(function() {
    var downvID = 'downvote' + downvoteCount;
    $(this).attr('id', downvID);
    downvoteCount++;
  });


  $('.reply').each(function() {
    var repID = 'reply' + replyCount;
    $(this).attr('id', repID);
    replyCount++;
  });


  $('.vote-value').each(function() {
    var voteValID = 'vote-value' + voteValCount;
    $(this).attr('id', voteValID);
    voteValCount++;
  });

  $('.comment-popup').each(function() {
    var commentPopID = 'comment-popup' + commentPopCount;
    $(this).attr('id', commentPopID);
    commentPopCount++;
  });


  $('.post-button input').each(function() {
    var postButtonID = 'postButton' + postButtonCount;
    $(this).attr('id', postButtonID);
    postButtonCount++;
  });


  $('.comment-area').each(function() {
    var commentAreaID = 'comment-area' + commentAreaCount;
    $(this).attr('id', commentAreaID);
    commentAreaCount++;
  });

  $('.comment-box').each(function() {
    var commentBoxID = 'commentBox' + commentBoxCount;
    $(this).attr('id', commentBoxID);
    commentBoxCount++;
  });

  //open comment box
  $(document).ready(function() {
    $('.reply').each(function() {
      var classID = $(this).attr('id');
      var num = classID.slice(-1);
  
      $(("#reply"+ num)).click(function() {
        $(("#comment-popup"+ num)).toggle();
      });
    });
  });

  //write comment
  $('.comment-popup').on('click', '.post-button input', function() {
    var classID = $(this).attr('id');
    var num = classID.slice(-1);
    console.log(classID);
   
    var paragraph = $("#comment-area" + num).val();
    var commentObject = new Comment(currentUser, paragraph);
    writeComment(commentObject);
   
  });

   //upvote function
    $('body').on('click', '.upvote',function() {
      var classID = $(this).attr('id');
      var num = classID.slice(-1);
      console.log(classID);
  
      var counterValue = parseInt($("#vote-value"+ num).text());
      var newCounterValue = counterValue;
    
      //removes vote if clicked again
      if ($(this).hasClass('clicked')) {
        newCounterValue--;
        $('#upvote' + num).removeClass('clicked');
      //removes effect of opposite vote if clicked
      }else if ($('#downvote' + num).hasClass('clicked')){
        newCounterValue = counterValue + 2;
        $(this).addClass('clicked');
        $('#downvote'+ num).removeClass('clicked');
      //when no vote was clicked
      }else{
        newCounterValue++;
        $(this).addClass('clicked');
      }
  
      $("#vote-value"+num).text(newCounterValue);
  
  });



  //downvote
  $('body').on('click', '.downvote',function() {
    var classID = $(this).attr('id');
    var num = classID.slice(-1);

    var counterValue = parseInt($("#vote-value"+ num).text());
    var newCounterValue = counterValue;
    //removes vote if clicked again  
    if ($(this).hasClass('clicked')) {
      newCounterValue++;
      $('#downvote'+ num).removeClass('clicked');
    //removes effect of opposite vote if clicked
    }else if ($('#upvote'+ num).hasClass('clicked')){
      newCounterValue = counterValue - 2;
      $(this).addClass('clicked');
      $('#upvote'+ num).removeClass('clicked');
    //when no vote was clicked
    }else{
      newCounterValue--;
      $(this).addClass('clicked');
    }

    $("#vote-value"+ num).text(newCounterValue);
  });



  //function for comment
  function writeComment(userObject) {
    const postContainer = document.querySelector(".comment-section");
    const item =
          `<div class="comment-box">
            <div class="post-no-comment">
                <div class="user-icon">
                    <img class="pfp" src="${userObject.user.img}">
                </div>
                <div class="post-details">
                    <div class="user">
                        <span class="username">${userObject.user.username}</span>
                    </div>
                    <p class="comment">${userObject.description}</p>
                    <div class="icons">
                        <button class="reply"></button> 
                        <div class="votes">
                          <button class="upvote" id=${'upvote' + upvoteCount}></button><span class="vote-value" id=${'vote-value' + voteValCount}>${userObject.votes}</span><button class="downvote" id=${'downvote' + downvoteCount}></button>
                        </div>   
                    </div>
                </div>
            </div>
  
            <br>
  
            <div class="comment-popup">
                <textarea class="comment-area" rows="10" cols="87" placeholder="Comment here..."></textarea>
                <div class="post-button">
                    <input type="button" value="Reply">
                </div>
            </div>  
        </div>`;
  
    postContainer.innerHTML += item;
    console.log("Posted.");
  }

});

/*********************************************************************/
class User {
  constructor(name, password) {
    this.name = name;
    this.lname = this.name.toLowerCase();
    this.username = "@" + this.lname;
    this.password = password;
    this.acc = "#user-" + name;
    this.img = "./profilepics/" + this.lname + ".jpg";
    this.bio = "test bio";
  }
}

let userGuest = new User("Guest", "1234");
let userSakura = new User("Sakura", "letmeplay");
let userChaewon = new User("Chaewon", "tyforsupportingus");
let userYunjin = new User("Yunjin", "IGOTACONDOINMANHATTAN");
let userKazuha = new User("Kazuha", "bang!");
let userEunchae = new User("eunchae", "mubankpresident");



class Comment {
  constructor(user, description) {
    //this.num = num;
    this.user = user;
    this.description = description;
    this.votes = 0;
  }
}
/*********************************************************************/

//sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
//Temporary function because idk if i should be able to change posts here
if(currentUser == null) {
  currentUser = userYunjin;
} 


/*
 comment format:
             <div class="comment-box">
                <div class="post-no-comment">
                    <div class="user-icon">
                        <img class="pfp" src="profilepics/chaewon.jpg">
                    </div>
                    <div class="post-details">
                        <div class="user">
                            <span class="username">@chaewon</span>
                        </div>
                        <p class="comment">

                        </p>
                        <div class="icons">
                            <button class="reply"></button> 
                            <div class="votes">
                            <button class="upvote"></button><span class="vote-value">23</span><button class="downvote"></button>
                            </div>   
                        </div>
                    </div>
                </div>
                <br>
                <div class="comment-popup">
                    <textarea class="comment-area" rows="10" cols="87" placeholder="Comment here..."></textarea>
                    <div class="post-button">
                        <input type="button" value="Reply">
                    </div>
                </div>
                
            </div>

*/



