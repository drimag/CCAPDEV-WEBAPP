/*********************************************************************/
//comment related functions
$(document).ready(function() {
    $("#reply1").click(function() {
      $("#comment-popup1").toggle();
    });
});

$(document).ready(function() {
    $("#reply2").click(function() {
      $("#comment-popup2").toggle();
    });
});


$(document).ready(function() {
    $("#reply3").click(function() {
      $("#comment-popup3").toggle();
    });
});



/*********************************************************************/
//upvoted related functions
$(document).ready(function() {
    $("#upvote1").click(function() {
      var counterValue = parseInt($("#vote-value1").text());
      var newCounterValue = counterValue;
      
      if ($(this).hasClass('clicked')) {
        newCounterValue--;
        $('#upvote1').removeClass('clicked');
      }else if ($('#downvote1').hasClass('clicked')){
        newCounterValue = counterValue + 2;
        $(this).addClass('clicked');
        $('#downvote1').removeClass('clicked');
      }else{
        newCounterValue++;
        $(this).addClass('clicked');
      }
      
      $("#vote-value1").text(newCounterValue);
    });
  });

$(document).ready(function() {
    $("#upvote2").click(function() {
      var counterValue = parseInt($("#vote-value2").text());
      var newCounterValue = counterValue;
      
      if ($(this).hasClass('clicked')) {
        newCounterValue--;
        $('#upvote2').removeClass('clicked');
      }else if ($('#downvote2').hasClass('clicked')){
        newCounterValue = counterValue + 2;
        $(this).addClass('clicked');
        $('#downvote2').removeClass('clicked');
      }else{
        newCounterValue++;
        $(this).addClass('clicked');
      }

      $("#vote-value2").text(newCounterValue);
    });
  });

$(document).ready(function() {
    $("#upvote3").click(function() {
      var counterValue = parseInt($("#vote-value3").text());
      var newCounterValue = counterValue;
      
      if ($(this).hasClass('clicked')) {
        newCounterValue--;
        $('#upvote3').removeClass('clicked');
      }else if ($('#downvote3').hasClass('clicked')){
        newCounterValue = counterValue + 2;
        $(this).addClass('clicked');
        $('#downvote3').removeClass('clicked');
      }else{
        newCounterValue++;
        $(this).addClass('clicked');
      }

      $("#vote-value3").text(newCounterValue);
    });
  });

/*********************************************************************/
//downvote related functions

$(document).ready(function() {
    $("#downvote1").click(function() {
      var counterValue = parseInt($("#vote-value1").text());
      var newCounterValue = counterValue;
      
    if ($(this).hasClass('clicked')) {
        newCounterValue++;
        $('#downvote1').removeClass('clicked');
    }else if ($('#upvote1').hasClass('clicked')){
        newCounterValue = counterValue - 2;
        $(this).addClass('clicked');
        $('#upvote1').removeClass('clicked');
    }else{
        newCounterValue--;
        $(this).addClass('clicked');
    }
      $("#vote-value1").text(newCounterValue);
    });
  });

$(document).ready(function() {
    $("#downvote2").click(function() {
      var counterValue = parseInt($("#vote-value2").text());
      var newCounterValue = counterValue;
      
    if ($(this).hasClass('clicked')) {
        newCounterValue++;
        $('#downvote2').removeClass('clicked');
    }else if ($('#upvote2').hasClass('clicked')){
        newCounterValue = counterValue - 2;
        $(this).addClass('clicked');
        $('#upvote2').removeClass('clicked');
    }else{
        newCounterValue--;
        $(this).addClass('clicked');
    }
      $("#vote-value2").text(newCounterValue);
    });
  });

$(document).ready(function() {
    $("#downvote3").click(function() {
      var counterValue = parseInt($("#vote-value3").text());
      var newCounterValue = counterValue;

    if ($(this).hasClass('clicked')) {
        newCounterValue++;
        $('#downvote3').removeClass('clicked');
    }else if ($('#upvote3').hasClass('clicked')){
        newCounterValue = counterValue - 2;
        $(this).addClass('clicked');
        $('#upvote3').removeClass('clicked');
    }else{
        newCounterValue--;
        $(this).addClass('clicked');
    }
      $("#vote-value3").text(newCounterValue);
    });
  });

/*********************************************************************/
