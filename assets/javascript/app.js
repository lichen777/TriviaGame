const trivia = {
	correctCount : 0,
	incorrectCount : 0,
	unanswered : 0,
	clockRunning : false,
	questionNum : 0,
	intervalId : 0,
	QA : [
		{
			question: "The city of Maracaibo and its lake are in what country?",
			options: ["Morocco", "Spain", "Venezuela", "Colombia"],
			correctAnswer: 2,
			picture: "assets/images/Venezuela.png"
		},
		{
			question: "What range of hills runs 50 miles from the Worcestershire border through Gloucestershire to the Avon?",
			options: ["Caucasus Mountains", "Pennines", "Carpathian Mountains", "Cotswolds"],
			correctAnswer: 3,
			picture: "assets/images/Cotswolds.png"
		},
		{
			question: "Which of these states of the USA extends the furthest north?",
			options: ["Vermont", "Texas", "New Mexico", "Florida"],
			correctAnswer: 0,
			picture: "assets/images/Vermont.png"
		},
		{
			question: "Which of these places is furthest from Perth, Australia?",
			options: ["Beijing, China", "Bangkok, Thailand", "Tokyo, Japan", "Mumbai, India"],
			correctAnswer: 0,
			picture: "assets/images/Beijing.png"
		},
		{
			question: "What is the deepest known part of the world's oceans, and the deepest location on the surface of the Earth's crust?",
			options: ["The Kate Gully", "The Josephine Ditch", "The Mariana Trench", "The Emma Furrow"],
			correctAnswer: 2,
			picture: "assets/images/Mariana.png"
		},
		{
			question: "The north of which country falls within the Sahel?",
			options: ["Burkina Faso", "South Africa", "Libya", "Zimbabwe"],
			correctAnswer: 0,
			picture: "assets/images/BurkinaFaso.png"
		},
		{
			question: "Where is the Gulf of Ob?",
			options: ["Barents Sea", "Sea of Okhotsk", "Lake Balkhash", "Kara Sea"],
			correctAnswer: 3,
			picture: "assets/images/KaraSea.png"
		},
	],
	timer (time) {
	  var remainingTime = time;
	  $("#time").text("Time Remaining: " + remainingTime + " Seconds");
	  if (!trivia.clockRunning) {
        trivia.intervalId = setInterval(function () {
          remainingTime --;
          $("#time").text("Time Remaining: " + remainingTime + " Seconds");
          
          //console.log(remainingTime);
          if(remainingTime == 0) {
      	    clearInterval(trivia.intervalId);
      	    trivia.clockRunning = false;
      	    return trivia.timeout();
          }
        }, 1000);
        trivia.clockRunning = true;
      }
	},
	start () {
	  $("#display").empty();
	  $("#question").show();
	  $("#question").html("<div>" + trivia.QA[trivia.questionNum]["question"] + "</div>");
	  var options = [...trivia.QA[trivia.questionNum]["options"]];
	  var sequence = trivia.sequenceGenerate (options.length);

	  for (var i = 0; i < options.length; i++) {
	  	var addLine = $("<div>" + options[sequence[i]] + "</div>").addClass("choice w-75").attr("data-option", sequence[i]);
	    $("#question").append(addLine); 
	  }
	  trivia.timer(10); //set clock time.
	  trivia.makeChoice();
	},
	makeChoice () {
	  $(".choice").click(function () {
	  	clearInterval(trivia.intervalId);
      	trivia.clockRunning = false;
	  	var choice = ($(this).attr("data-option"));
	  	if (choice == trivia.QA[trivia.questionNum]["correctAnswer"]) {
	  	  return trivia.win();
	  	}else {
	  	  return trivia.lose();
	  	}
	  });
	},

	timeout () {
	  $("#display").html("<div>Out Of Time! Correct answer is <b>" + trivia.QA[trivia.questionNum]["options"][trivia.QA[trivia.questionNum]["correctAnswer"]] + "</b>.</div>");
	  $("#display").append("<img src=" + trivia.QA[trivia.questionNum]["picture"] + "width = '300px'>");
	  trivia.unanswered++;
	  $("#time").empty();
	  $("#question").hide();
	  trivia.goNext();
	},
	win () {
	  $("#display").html("<div>Correct! You are awesome!</div>");
	  $("#display").append("<img src='assets/images/correct.gif' width = '300px' >");
	  trivia.correctCount++;
	  $("#time").empty();
	  $("#question").hide();
	  trivia.goNext();
	},
	lose () {
	  $("#display").html("<div>Wrong! Correct answer is <b>" + trivia.QA[trivia.questionNum]["options"][trivia.QA[trivia.questionNum]["correctAnswer"]] + "</b>.</div>");
	  $("#display").append("<img src=" + trivia.QA[trivia.questionNum]["picture"] + " width = '300px'>");
	  trivia.incorrectCount++;
	  $("#time").empty();
	  $("#question").hide();
	  trivia.goNext();
	},
	goNext () { 
	  trivia.questionNum++;
	  setTimeout(function () {
	    if (trivia.questionNum === trivia.QA.length) {
	  	  $("#time").empty();
	  	  $("#display").html("<div>All done!</div>");
	  	  $("#display").append("<div>Correct: " + trivia.correctCount + "</div>");
	  	  $("#display").append("<div>Incorrect: " + trivia.incorrectCount + "</div>");
	  	  $("#display").append("<div>Unanswered: " + trivia.unanswered + "</div>");
	  	  $("#start").show();
	  	  trivia.questionNum = 0;
	  	  trivia.correctCount = 0;
	  	  trivia.incorrectCount = 0;
	  	  trivia.unanswered = 0;
	    } else {
	  	  $("#display").empty();
	  	  $("#time").empty();
          $("#question").show();
  		  trivia.start();
  		}
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
  $("button").click(function () {
    $("#start").hide();
  	trivia.start();
  });

})
