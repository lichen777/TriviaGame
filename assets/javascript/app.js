const trivia = {
	correctCount : 0,
	incorrectCount : 0,
	unanswered : 0,
	clockRunning : false,
	questionNum : 0,
	intervalId,
	QA : [
		{
			question: "1.",
			A: "",
			B: "",
			C: "",
			D: "",
			correctAnswer: ""
		},
		{
			question: "",
			A: "",
			B: "",
			C: "",
			D: "",
			correctAnswer: ""
		},
		{
			question: "",
			A: "",
			B: "",
			C: "",
			D: "",
			correctAnswer: ""
		},
		{
			question: "",
			A: "",
			B: "",
			C: "",
			D: "",
			correctAnswer: ""
		},
	],
	timer (time) {
	  var remainingTime = time;
	  if (!trivia.clockRunning) {
        trivia.intervalId = setInterval( function () {
          remainingTime --;
          $("#time").text("Time Remaining: " + remainingTime + "Seconds");
        }, 1000);
        trivia.clockRunning = true;
      }
	},
	start () {
	  $("#start").hide();
	  $("#question").html("<div>" + trivia.QA[questionNum]["question"] + "</div>");
	  $("#question").append("<div>" + trivia.QA[questionNum]["A"] + "</div>");
	  $("#question").append("<div>" + trivia.QA[questionNum]["B"] + "</div>");
	  $("#question").append("<div>" + trivia.QA[questionNum]["C"] + "</div>");
	  $("#question").append("<div>" + trivia.QA[questionNum]["D"] + "</div>");
	}
}

$(document).ready(function() {
  

})