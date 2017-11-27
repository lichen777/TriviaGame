const trivia = {
	correctCount : 0,
	incorrectCount : 0,
	unanswered : 0,
	clockRunning : false,
	questionNum : 0,
	intervalId : 0,
	QA : [
		{
			question: "1.",
			options: ["A", "B", "C", "D"],
			correctAnswer: 1,
		},
		{
			question: "",
			options: ["", "", "", ""],
			correctAnswer: 1
		},
		{
			question: "",
			options: ["", "", "", ""],
			correctAnswer: 1,
		},
		{
			question: "",
			options: ["", "", "", ""],
			correctAnswer: 1,
		},
	],
	timer (time) {
	  var remainingTime = time;
	  if (!trivia.clockRunning) {
        trivia.intervalId = setInterval(function () {
          $("#time").text("Time Remaining: " + remainingTime + " Seconds");
          remainingTime --;
          //console.log(remainingTime);
          if(remainingTime < 0) {
      	    clearInterval(trivia.intervalId);
      	    trivia.clockRunning = false;
      	    return trivia.timeout();
          }
        }, 1000);
        trivia.clockRunning = true;
      }
	},
	start () {
	  
	  $("#question").html("<div>" + trivia.QA[trivia.questionNum]["question"] + "</div>");
	  for (var i = 0; i < trivia.QA[trivia.questionNum]["options"].length; i++) {
	    $("#question").append("<div>" + trivia.QA[trivia.questionNum]["options"][i] + "</div>")
	  }

	  trivia.timer(10); //set clock time.
	},
	timeout () {
	  $("#time").text("out of time!");
	  $("#time").click(function () {
	  	trivia.start();
	  });
	}
}

$(document).ready(function () {
  $("#start").click(function () {
    $("#start").hide();
  	trivia.start();
  });

})