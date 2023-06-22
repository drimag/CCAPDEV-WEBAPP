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

$(document).ready(function() {
    $("#upvote1").click(function() {
      var counterValue = parseInt($("#vote-value1").text());
      var newCounterValue = counterValue + 1;
      $("#vote-value1").text(newCounterValue);
    });
  });

$(document).ready(function() {
    $("#upvote2").click(function() {
      var counterValue = parseInt($("#vote-value2").text());
      var newCounterValue = counterValue + 1;
      $("#vote-value2").text(newCounterValue);
    });
  });

$(document).ready(function() {
    $("#upvote3").click(function() {
      var counterValue = parseInt($("#vote-value3").text());
      var newCounterValue = counterValue + 1;
      $("#vote-value3").text(newCounterValue);
    });
  });

/*********************************************************************/


$(document).ready(function() {
    $("#downvote1").click(function() {
      var counterValue = parseInt($("#vote-value1").text());
      var newCounterValue = counterValue - 1;
      $("#vote-value1").text(newCounterValue);
    });
  });

$(document).ready(function() {
    $("#downvote2").click(function() {
      var counterValue = parseInt($("#vote-value2").text());
      var newCounterValue = counterValue - 1;
      $("#vote-value2").text(newCounterValue);
    });
  });

$(document).ready(function() {
    $("#downvote3").click(function() {
      var counterValue = parseInt($("#vote-value3").text());
      var newCounterValue = counterValue - 1;
      $("#vote-value3").text(newCounterValue);
    });
  });
