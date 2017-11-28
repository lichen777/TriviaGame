const trivia = {
	correctCount : 0,
	incorrectCount : 0,
	unanswered : 10,
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
	  	var addLine = $("<div>" + options[sequence[i]] + "</div>").addClass("choice").attr("data-option", sequence[i]);
	    $("#question").append(addLine); 
	  }
	  trivia.timer(10); //set clock time.
	  trivia.makeChoice();
	  trivia.questionNum++;
	},
	makeChoice () {
	  $(".choice").click(function () {
	  	clearInterval(trivia.intervalId);
      	trivia.clockRunning = false;
      	trivia.unanswered--;
	  	var choice = ($(this).attr("data-option"));
	  	if (choice == trivia.QA[trivia.questionNum]["correctAnswer"]) {
	  	  return trivia.win();
	  	}else {
	  	  return trivia.lose();
	  	}
	  });
	},

	timeout () {
	  $("#time").text("out of time!");
	  trivia.lose();
	},
	win () {
	  $("#display").text("You are right!");
	  trivia.correctCount++;
	  $("#wrap").hide();
	  trivia.goNext();
	},
	lose () {
	  $("#display").text("You are wrong!");
	  trivia.incorrectCount++;
	  $("#wrap").hide();
	  trivia.goNext();
	},
	goNext () { 
	  setTimeout(function () {
	  	$("#display").empty();
	  	$("#time").empty();
        $("#wrap").show();
  		trivia.start();
  	  }, 3000);
	},
	sequenceGenerate (num) { //shuffle and return a random sequence array
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