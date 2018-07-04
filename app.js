

var triviaQuestions = [{
	question: "Which of the following Avengers from the comics is not in the movie?",
	answerList: ["Hawkeye", "Black Widow", "The Wasp", "Captain America"],
	answer: 2
},{
	question: "What is Agent Coulson's first name?",
	answerList: ["John", "Steven", "Phil", "Cal"],
	answer: 2
},{
	question: "When Loki is locked up in the S.H.I.E.L.D. helicarrier, who gets him to reveal that he is planning to get Banner to change into the Hulk and destroy the ship from within?",
	answerList: ["Thor", "Black Widow", "Iron Man", "Nick Fury"],
	answer: 1
},{
	question: "Which Avenger's girlfriend makes an appearance in the film that isn't just a quick picture or a flashback to one of their solo movies?",
	answerList: ["Betty Ross", "Jane Foster", "Pepper Potts", "Peggy Carter"],
	answer: 2
},{
	question: "What is the name of the blue glowing square that Loki uses as a weapon?",
	answerList: ["The Infinity Gem", "The Tesseract", "The Forever Cube", "The Soulstone"],
	answer: 1
},{
	question: "When Iron Man is struck by Thor's lightning what happens?",
	answerList: ["It is deflected and strikes Captain America.", "Tony Stark's chest piece gives out and he goes into cardiac arrest.", " It super charges his armor up to 400%.", "His suit shuts down and he is trapped in his own armor."],
	answer: 2
},{
	question: "When the Avengers are in the streets of New York Captain America starts issuing orders. What are his orders to the Hulk?",
	answerList: ["Throw a nuclear bomb into the rift in space.", "Destroy the force field surrounding the machine that is keeping the hole open.", "Smash", "Turn back into Banner and help Tony reinitialize his armor."],
	answer: 2
},{
	question: "When all of the Avengers are bickering in the lab on the S.H.I.E.L.D helicarrier which Avenger is not present?",
	answerList: ["Black Widow", "Hawkeye", "Dr. Banner", "Captain America"],
	answer: 1
},{
	question: "When Tony Stark is threatening Loki and going through the Avengers roll call what is he doing?",
	answerList: ["Dialing 911 on his phone", "Making a drink", "Using an energy absorber to suck the energy out of Loki's staff", "Setting Stark Tower to self destruct"],
	answer: 1
},{
	question: " In one of the final scenes of the film, Pepper and Tony are standing on a section of Stark Tower that has been destroyed holding blueprints for something. As they are standing, the camera pans out so the audience can see more of Stark Tower and only one letter from STARK is left standing. Which letter is it?",
	answerList: ["S", "A", "K", "R"],
	answer: 1
}];
	

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Awesome, that is absolutely right!",
	incorrect: "No man can win every battle, but no man should fall without a struggle.",
	endTime: "All we can do is our best, and sometimes the best we can do is start over.",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var r = 0; r < 4; r++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[r]);
		choices.attr({'data-index': r });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 20;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
    
    $('#gif').html('<img src = "/images/'+ gifArray[currentQuestion] +'.gif" width = "300px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}

