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
		},
		{
			question: "What range of hills runs 50 miles from the Worcestershire border through Gloucestershire to the Avon?",
			options: ["Caucasus Mountains", "Pennines", "Carpathian Mountains", "Cotswolds"],
			correctAnswer: 3,
		},
		{
			question: "Which of these states of the USA extends the furthest north?",
			options: ["Vermont", "Texas", "New Mexico", "Florida"],
			correctAnswer: 0,
		},
		{
			question: "Which of these places is furthest from Perth, Australia?",
			options: ["Beijing, China", "Bangkok, Thailand", "Tokyo, Japan", "Mumbai, India"],
			correctAnswer: 0,
		},
		{
			question: "What is the deepest known part of the world's oceans, and the deepest location on the surface of the Earth's crust?",
			options: ["The Kate Gully", "The Josephine Ditch", "The Mariana Trench", "The Emma Furrow"],
			correctAnswer: 2,
		},
		{
			question: "The north of which country falls within the Sahel?",
			options: ["Burkina Faso", "South Africa", "Libya", "Zimbabwe"],
			correctAnswer: 0,
		},
		{
			question: "Where is the Gulf of Ob?",
			options: ["Barents Sea", "Sea of Okhotsk", "Lake Balkhash", "Kara Sea"],
			correctAnswer: 3,
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
	  $("#time").text("out of time!");
	  trivia.unanswered++;
	  $("#question").hide();
	  trivia.goNext();
	},
	win () {
	  $("#display").text("You are right!");
	  trivia.correctCount++;
	  $("#question").hide();
	  trivia.goNext();
	},
	lose () {
	  $("#display").text("You are wrong!");
	  trivia.incorrectCount++;
	  $("#question").hide();
	  trivia.goNext();
	},
	goNext () { 
	  trivia.questionNum++;

	  setTimeout(function () {
	  	$("#display").empty();
	  	$("#time").empty();
        $("#question").show();
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