let users = [];

let currentPosts = JSON.parse(sessionStorage.getItem("currentPosts"));
let viewingPost = JSON.parse(sessionStorage.getItem("viewingPost"));
let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
let userOfPost = viewingPost.user;
let comments = viewingPost.comments; // current comments of the viewed post
console.log('Viewing the Post: ' + viewingPost.title + " of User " + viewingPost.user.name);
/**
 * TO DO: View User Profile from post
 */




/*********************************************************************/
$(document).ready(function() {
  // Change Post Contents
  $("#post-username").text(userOfPost.username);
  $("#post-pfp").attr("src", userOfPost.img);
  
  $("#post-title").text(viewingPost.title);
  $("#post-content").text(viewingPost.description);

  if(currentUser.name != userOfPost.name) {
    $("#delete-post").hide();
  }
  // TODO: Edit Post

  /*
  Scuffed

  // TODO: Delete Post
  $("#delete-post").click(function() {
    alert("Post Deleted!");
  
    for(let p of currentPosts) {
      if(p.title == viewingPost.title) {
        p.deleted = true;
      }
    }

    sessionStorage.setItem("currentPostsWithDeleted", JSON.stringify(currentPosts));
    window.location = "index.html";
    
  });
  */
  //TO DO: add the upvotes and downvotes of the post

  // TO DO: add the comments of the post 

  // View's Another User's Profile from Post
  $(".pfp").click(function() {
    console.log("Viewing Profile");
    let img = this.getAttribute('src');

    if(img[0] != ".") {
      img = "./" + img;
    }
    console.log("Img clicked: " + this.getAttribute('src'));

    for(let user of users) {
      console.log(user.img);
        if(user.img == img) {
            let viewingUser = user;
            sessionStorage.setItem("viewingUser", JSON.stringify(viewingUser));
            console.log("Viewing Profile of " + viewingUser.name);
            break;
        }
    }

    viewUserProfile();
  });
});

// Window location when clicked on profile
function viewUserProfile() {
  window.location = "profile.html";
}


$(document).ready(function() {
  var upvoteCount = 1; 
  var downvoteCount = 1;
  var replyCount = 1;
  var voteValCount = 1;
  var commentPopCount = 1;
  var postButtonCount = 1;
  var commentAreaCount = 1;
  var commentBoxCount = 1;
  var editButtonCount = 1;
  var deleteButtonCount = 1;
  var commentCount = 1;

  function displayAllComments(post) {
    for(let comment of post.comments) {
      console.log("asdf",comment.description);
      writeComment(comment,".comment-section");
  }
  }
  //displayAllComments(viewingPost);
  // gives every relevant class an id
  $('.edit-button').each(function() {
    var eBID = 'editButton' + editButtonCount;
    $(this).attr('id', eBID);
    editButtonCount++;
  });


  $('.post-details').each(function() {
    var cID = 'comment' + commentCount;
    $(this).attr('id', cID);
    commentCount++;
  });

  $('.delete-button').each(function() {
    var dID = 'delButton' + deleteButtonCount;
    $(this).attr('id', dID);
    deleteButtonCount++;
  });

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

  $('.comment-box, .post-container').each(function() {
    var commentBoxID = 'commentBox' + commentBoxCount;
    $(this).attr('id', commentBoxID);
    commentBoxCount++;
  });

  //open comment box
  $('body').on('click', '.reply',function() {
    var classID = $(this).attr('id');
    var num = classID.slice(-1);
    $(("#comment-popup"+ num)).toggle();
  });

//write comment
  $('.comment-popup').on('click', '.post-button input', function() {
    console.log("i am clicked");
    var classID = $(this).attr('id');
    var num = classID.slice(-1);
    console.log("ID", classID);
    console.log("Num:", num);
    var destination = ".comment-section";
    var paragraph = $("#comment-area" + num).val();
    var commentObject = new Comment(viewingPost.user,currentUser, paragraph);
  
    var isInnerComment = $(this).closest('.comment-box').length > 0;
    console.log(isInnerComment);
    if (isInnerComment) {
      var parentCommentBox = $(this).closest('.comment-box');
      var parentCommentBoxId = parentCommentBox.attr('id');
      var commentBoxNum = parentCommentBoxId.slice(-1);
      destination = "#commentBox" + commentBoxNum;
      console.log("destination:",destination);
      writeComment(commentObject, destination);
    } else {
      writeComment(commentObject, destination);
    }
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

  //delete
  $('body').on('click', '.delete-button',function() {
    var classID = $(this).attr('id');
    var num = parseInt(classID.slice(-1))+1;
    console.log(num);
    console.log(classID);
    $("#commentBox"+ num).addClass('deleted');
  });

  //edit post
  $('body').on('click', '.edit-button',function() {
    var classID = $(this).attr('id');
    var num = parseInt(classID.slice(-1))+1;
    console.log(num);
    console.log(classID);

    var postContent = $('#comment'+num);
    var currentText = postContent.text();

    var textarea = $('<textarea>').val(currentText);
    postContent.replaceWith(textarea);

    textarea.on('keydown', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        var editedText = textarea.val();

        var newParagraph = $('<p>').text(editedText);
        textarea.replaceWith(newParagraph);
      }
    });
  });


  //function for comment
  function writeComment(userObject, destination) {
    console.log("destination:",destination);
    const postContainer = document.querySelector(destination);//destination changed to "#commentBox2" for debugging,somehow ruins the code
    const item =
          `<div class="comment-box" id=${'commentBox' + commentBoxCount}>
          <div class="post-no-comment">
              <div class="user-icon">
                  <img class="pfp" src="${userObject.user.img}">
              </div>
              <div class="post-details">
                  <div class="user">
                      <span class="username">${userObject.user.username}</span> <span class="del-edit-buttons"> <button class="edit-button" id=${'editButton' + editButtonCount}></button> <button class="delete-button" id=${'delButton' + deleteButtonCount}></button> </span>
                  </div>
                  <p class="comment" id=${'comment' + commentCount}>${userObject.description}</p>
                  <div class="icons">
                      <button class="reply" id=${'reply' + replyCount}></button> 
                      <div class="votes">
                        <button class="upvote" id=${'upvote' + upvoteCount}></button><span class="vote-value" id=${'vote-value' + voteValCount}>${userObject.votes}</span><button class="downvote" id=${'downvote' + downvoteCount}></button>
                      </div>   
                  </div>
              </div>
          </div>

          <br>

          <div class="comment-popup" id=${'comment-popup' + commentPopCount}>
              <textarea class="comment-area" id=${'comment-area' + commentAreaCount} rows="10" cols="87" placeholder="Comment here..."></textarea>
              <div class="post-button">
                  <input type="button" id=${'postButton' + postButtonCount} value="Reply">
              </div>
          </div>  
      </div>`;
  
    postContainer.innerHTML += item;
    upvoteCount++;//
    voteValCount++;//
    downvoteCount++;//
    commentBoxCount++;//
    commentPopCount++;//
    postButtonCount++;//
    commentAreaCount++;//
    replyCount++;//
    editButtonCount++;
    deleteButtonCount++;
    commentCount++;
    console.log("Posted.");
  }
  displayAllComments(viewingPost);

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

users.push(userSakura, userChaewon, userYunjin, userKazuha, userEunchae);


const Comment = function(repliedTo, user, description) {
  this.repliedTo = repliedTo;
  this.user = user;
  this.description = description;
  this.votes = 0;
  this.comments = [];
}
/*********************************************************************/

//sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
//let currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
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



