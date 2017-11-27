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
			question: "2.",
			options: ["A", "B", "C", "D"],
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
	  var options = [...trivia.QA[trivia.questionNum]["options"]];
	  var sequence = trivia.sequenceGenerate (options.length);

	  for (var i = 0; i < options.length; i++) {
	  	var addLine = $("<div>" + options[sequence[i]] + "</div>").attr("data-option", sequence[i]);
	    $("#question").append(addLine); 
	  }
	  trivia.timer(10); //set clock time.

	  trivia.questionNum++;
	},
	timeout () {
	  $("#time").text("out of time!");
	  $("#time").click(function () {
	  	trivia.start();
	  });
	},
	sequenceGenerate (num) { //shuffle and return a sequence array
	  var x = 0;
	  var result = Array.from({length: num}, () => x++);
	  for (var i = num - 1; i > 0; i--) {
	  	const j = Math.floor(Math.random() * (i + 1));
	  	[result[i], result[j]] = [result[j], result[i]];
	  }
	  return result;
	}
}

$(document).ready(function () {
  $("#start").click(function () {
    $("#start").hide();
  	trivia.start();
  });

})