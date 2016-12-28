prize = function(className, delayed){
	this.className = className;
	this.delayed = delayed;
	//this.cancelAnimation = 0;
}

prize.prototype.win = function(divName){
	this.animated(divName, "win", 7);
}
prize.prototype.lose = function(divName){
	var divName = document.querySelector(divName);
	setTimeout(function(){
		divName.style.background = "black";
	},1000);
	var lastColor = document.defaultView.getComputedStyle(divName, null).getPropertyValue("background-color");
}
prize.prototype.start = function(divName){
	this.animated(".prize", "start", 1);
}

prize.prototype.progress = function(divName,divNameReset,questionNumber){
	var divName = document.querySelector(divName);
	if(arguments.length == 1){
		setTimeout(function(){
		divName.style.background = "rgb(17, 242, 32)";
		},4000);	
	}
	else{
		var divNameReset = document.querySelector(divNameReset); 
		var skip = (questionNumber == 5 ||questionNumber == 10)? true : false;
		if(skip){
			setTimeout(function(){
				divNameReset.style.background = "rgb(242,144,17)";
				divName.style.background = "rgb(17, 242, 32)";
			}, 4000);
		}
		else{
			setTimeout(function(){
				divNameReset.style.background = "rgb(17, 175, 242)";
				divName.style.background = "rgb(17, 242, 32)";
			}, 4000);
		}
	}
}
prize.prototype.animated = function(id, game, blinkNumber){
	self = this;
	var timeTracker = 0;
	var counter = 0;
	var divName = document.querySelectorAll(id);
	var divNameLength = divName.length-1;
	var backgroundColorOriginal = document.defaultView.getComputedStyle(divName[0], null).getPropertyValue("background-color");
	//var cancelAnimationT = 0;
		function animateStatus(time){
			var timeDelay = ((time - timeTracker) >= self.delayed) ? true : false;
				if(timeDelay){
					timeTracker = time;
					//var backgroundColorOriginal = document.defaultView.getComputedStyle(divName[0], null).getPropertyValue("background-color");
					if(game == "win"){
						var backgroundColor = document.defaultView.getComputedStyle(divName[0], null).getPropertyValue("background-color");
						if(backgroundColor=="rgb(17, 175, 242)") 
							divName[0].style.background = "rgb(17, 242, 32)";
						else
							divName[0].style.background = "rgb(17, 175, 242)";
						
						counter++;
						if(counter > blinkNumber){ 
							divName[0].style.background = backgroundColorOriginal;
							return;
						}
					}
					else{
						if (divNameLength == 14){
							divName[divNameLength].style.background = "rgb(242,144,17)";
						}
						else{
							var skip = (divNameLength == 4 ||divNameLength == 9)? true : false;
							if(skip){
								divName[divNameLength+1].style.background = "rgb(242,144,17)";
								divName[divNameLength].style.background = "rgb(242,144,17)";
							}
							else{
								divName[divNameLength+1].style.background = "rgb(17, 175, 242)";
								divName[divNameLength].style.background = "rgb(242,144,17)";
							}
						}
						if(!divNameLength){ 
							//cancelAnimationFrame(cancelAnimationT);
							return;
						}
						divNameLength--;
					}
					
				}
			
				requestAnimationFrame(animateStatus);
	}
	
	requestAnimationFrame(animateStatus);
}


display = function(){
this.question = 0;
this.optionA = 0;
this.optionB = 0;
this.optionC = 0;
this.optionD = 0;
this.correct = 0;
this.questionNumber = 0;
this.noRandomRepeat = [];
this.classNameStrings = {
	".answer-a" : "a",
	".answer-b" : "b",
	".answer-c" : "c",
	".answer-d" : "d"
}
this.divNumbers = {
	"0": ".prize-one",
	"1": ".prize-two",
	"2": ".prize-three",
	"3": ".prize-four",
	"4": ".prize-five",
	"5": ".prize-six",
	"6": ".prize-seven",
	"7": ".prize-eight",
	"8": ".prize-nine",
	"9": ".prize-ten",
	"10": ".prize-eleven",
	"11": ".prize-twelve",
	"12": ".prize-thirteen",
	"13": ".prize-fourteen",
	"14": ".prize-fifteen"
}
this.getResponse = document.querySelector(".answer-wrap");
this.lifeLines = document.querySelector(".lifeLines");
this.lifeLinesPhone = document.querySelector(".phoneAFriend");
this.lifeLinesAudience = document.querySelector(".askTheAudience");
this.lifeLinesFifty = document.querySelector(".fifty-fifty");
this.lifeLinesWalkAway = document.querySelector(".walkAway");
this.lastColor = 0;
this.correctDiv = 0;
this.eliminateCorrect = [];
this.counter = 0;
this.counterAudience = 0;
this.counterFriend = 0;
this.guessOptions = ["A","B","C","D"];
}


display.prototype.getQuestion = function(questionLevel, questionNumber){
	this.question = millionaireQuestions[questionLevel][questionNumber].question;
	this.optionA = millionaireQuestions[questionLevel][questionNumber].A;
	this.optionB = millionaireQuestions[questionLevel][questionNumber].B;
	this.optionC = millionaireQuestions[questionLevel][questionNumber].C;
	this.optionD = millionaireQuestions[questionLevel][questionNumber].D;
	this.correct = millionaireQuestions[questionLevel][questionNumber].answer;
}

display.prototype.render = function(questionNumber){
	this.attach();
	var selectedQuestion = 0;
	var questionView = document.querySelector(".question-view");
	var questionA = document.querySelector(".answer-a");
	var questionB = document.querySelector(".answer-b");
	var questionC = document.querySelector(".answer-c");
	var questionD = document.querySelector(".answer-d");
	questionA.style.display = "block";
	questionB.style.display = "block";
	questionC.style.display = "block";
	questionD.style.display = "block";
	if (questionNumber <= 4){
		selectedQuestion = this.randomLevelQuestion(millionaireQuestions[0]);
		console.log(selectedQuestion);
		//console.log(this.noRandomRepeat);
		this.noRandomRepeat.push(selectedQuestion);
		if(!this.noRepeat(selectedQuestion))
			selectedQuestion = this.randomLevelQuestion(millionaireQuestions[0]);
		this.getQuestion(0,selectedQuestion);
		questionView.innerHTML = this.question;
		questionA.innerHTML = "A: " + this.optionA;
		questionB.innerHTML = "B: " + this.optionB;
		questionC.innerHTML = "C: " + this.optionC;
		questionD.innerHTML = "D: " + this.optionD;
	}
	
	else if(questionNumber >4 && questionNumber <=9){
		selectedQuestion = this.randomLevelQuestion(millionaireQuestions[1]);
		this.noRandomRepeat.push(selectedQuestion);
		if(!this.noRepeat(selectedQuestion))
			selectedQuestion = this.randomLevelQuestion(millionaireQuestions[1]);
		this.getQuestion(1,selectedQuestion);
		questionView.innerHTML = this.question;
		questionA.innerHTML = "A: " + this.optionA;
		questionB.innerHTML = "B: " + this.optionB;
		questionC.innerHTML = "C: " + this.optionC;
		questionD.innerHTML = "D: " + this.optionD;
	}
	
	else{
		selectedQuestion = this.randomLevelQuestion(millionaireQuestions[2]);
		this.noRandomRepeat.push(selectedQuestion);
		if(!this.noRepeat(selectedQuestion))
			selectedQuestion = this.randomLevelQuestion(millionaireQuestions[2]);
		this.getQuestion(2,selectedQuestion);
		questionView.innerHTML = this.question;
		questionA.innerHTML = "A: " + this.optionA;
		questionB.innerHTML = "B: " + this.optionB;
		questionC.innerHTML = "C: " + this.optionC;
		questionD.innerHTML = "D: " + this.optionD;
	}
}

display.prototype.attach = function(){
	var self = this;
	self.getResponse.onclick = self.handleEvents.bind(self);
	self.lifeLines.onclick = self.handleLifeLinesOnclick.bind(self);
	self.lifeLinesFifty.onmouseover = self.handleLifeLinesMouseover.bind(self);
	self.lifeLinesFifty.onmouseout = self.handleLifeLinesMouseout.bind(self);
	self.lifeLinesPhone.onmouseover = self.handleLifeLinesMouseover.bind(self);
	self.lifeLinesPhone.onmouseout = self.handleLifeLinesMouseout.bind(self);
	self.lifeLinesAudience.onmouseover = self.handleLifeLinesMouseover.bind(self);
	self.lifeLinesAudience.onmouseout = self.handleLifeLinesMouseout.bind(self);
	self.lifeLinesWalkAway.onmouseover = self.handleLifeLinesMouseover.bind(self);
	self.lifeLinesWalkAway.onmouseout = self.handleLifeLinesMouseout.bind(self);
}

display.prototype.handleEvents = function(e){
	var self = this;
	self.checkCorrect.call(self,e);
}

display.prototype.handleLifeLinesOnclick = function(e){
	var element = "." + e.target.parentNode.className.split(" ")[1] + " img";
	var element = document.querySelector(element);
	element.style.opacity = "0.2";
	if(e.target.parentNode.className.split(" ")[1] == "walkAway"){
		self = this;
		setTimeout(function(){
			self.gameOver(self.divNumbers[self.questionNumber]);
		},200);
	}
	
	else if(e.target.parentNode.className.split(" ")[1] == "fifty-fifty"){
		console.log(this.counter);
		if (!this.counter){
		for(var wrong in this.classNameStrings){
			if(!(this.classNameStrings[wrong] == this.correct.toLowerCase())){
				this.eliminateCorrect.push(wrong);
				console.log(this.classNameStrings[wrong],this.correct.toLowerCase());
			}
		}
		var pickAnInt = (Math.floor(Math.random()*10))%4;
		console.log(pickAnInt);
		this.eliminateCorrect.splice(pickAnInt,1);
		document.querySelector(this.eliminateCorrect[0]).style.display = "none";
		document.querySelector(this.eliminateCorrect[1]).style.display = "none";
		this.counter++;
		}
		
	}
	else if(e.target.parentNode.className.split(" ")[1] == "askTheAudience"){
		console.log(this.counterAudience);
		if (!this.counterAudience){
		var possibleAnswer = (Math.floor(Math.random()*10))%4;
		var printMessage = document.querySelector(".useOption");
		printMessage.textContent = "";
		printMessage.textContent = "I would not trust a stranger but the audience think the right answer is: " + this.guessOptions[possibleAnswer];
				setTimeout(function(){
			printMessage.textContent = "";
		},10000);
		this.counterAudience++;
		}
	}
	
	else{
		if (!this.counterFriend){
		var possibleAnswer = (Math.floor(Math.random()*10))%4;
		var printMessage = document.querySelector(".useOption");
		printMessage.textContent = "";
		printMessage.textContent = "Your friend reckons the correct answer is: " + this.guessOptions[possibleAnswer] ;
				setTimeout(function(){
			printMessage.textContent = "";
		},10000);
		this.counterFriend++;
		console.log(possibleAnswer, this.guessOptions);
		}
	}
	/*this.lifeLinesFifty.onmouseover = function(){return 0;}
	this.lifeLinesFifty.onmouseout = function(){return 0;}
	this.lifeLinesPhone.onmouseover = function(){return 0;}
	this.lifeLinesPhone.onmouseout = function(){return 0;}
	this.lifeLinesAudience.onmouseover = function(){return 0;}
	this.lifeLinesAudience.onmouseout = function(){return 0;}*/
}

display.prototype.handleLifeLinesMouseover = function(e){
	if(e.target.parentNode.className.split(" ")[1])
		var element = "." + e.target.parentNode.className.split(" ")[1] + " img";
	var element = document.querySelector(element);
	element.style.width = "45px";
	element.style.heigth = "35px";
}

display.prototype.handleLifeLinesMouseout = function(e){
	if(e.target.parentNode.className.split(" ")[1])
		var element = "." + e.target.parentNode.className.split(" ")[1] + " img";
	//console.log(element);
	var element = document.querySelector(element);
	element.style.width = "40px";
	element.style.heigth = "30px";
}

display.prototype.checkCorrect = function(e){
	var self = this;
	var prizeLevel = new prize(".wrapper", 300);
	if (e.which == 1){
		if(self.classNameStrings["." + e.target.className] == self.correct.toLowerCase()){
			this.getResponse.onclick = function(){
				return 0;
			}
			prizeLevel.animated("." + e.target.className, "win", 5);
			if(self.questionNumber == 14)
				self.gameOver(self.divNumbers[14]);
			self.questionNumber++;
			prizeLevel.progress(self.divNumbers[self.questionNumber],self.divNumbers[self.questionNumber-1],self.questionNumber);
			setTimeout(function(){
				self.render(self.questionNumber)
					
			},2000);
		}
		else{
			for(var correct in self.classNameStrings){
				if(self.classNameStrings[correct].toLowerCase() == self.correct.toLowerCase()){
					this.correctDiv = document.querySelector(correct);
					this.lastColor = document.defaultView.getComputedStyle(this.correctDiv, null).getPropertyValue("background-color");
					console.log(this.correctDiv);
					prizeLevel.lose(correct);
					setTimeout(function(){
						self.gameOver(self.divNumbers[self.questionNumber]);
					},2000);
				}
			}
		}
			//call another function to end the game properly.
	}
}

display.prototype.randomLevelQuestion = function(array){
	return Math.floor((Math.random()*200)%array.length);

}

display.prototype.gameOver = function(prize){
	self = this;
	var trophy = document.querySelector(".blankAvatar");
	var prize = document.querySelector(prize);
	var restartButton = document.querySelector(".restartButton");
	var message = document.querySelectorAll("li")[0];
	document.querySelector(".useOption").style.display = "none";
	trophy.style.background = "url(https://jorgeewa.github.io/who-wants-to-be-a-millionaire-game/Millionaire/pictures/trophy.gif) no-repeat 0 0";
	trophy.style.backgroundSize = "100% 100%";
	prize = prize.textContent;
	console.log(prize);
	this.removeEvents();
	message.innerHTML = "Game over!!! This game was tough but you just won: " + prize;
	restartButton.style.display = "block";
	restartButton.addEventListener("click", self.restart.bind(this));
}

display.prototype.removeEvents = function(){
	var getResponse = document.querySelector(".answer-wrap");
	//this.getResponse.removeEventListener("click", this.handleEvents);
	this.getResponse.onclick = function(){
		return 0;
	}
		this.lifeLines.onclick = function(){
		return 0;
	}
}

display.prototype.restart = function(){
	var trophy = document.querySelector(".blankAvatar");
	var message = document.querySelectorAll("li")[0];
	var restartButton = document.querySelector(".restartButton");
	document.querySelector(".useOption").style.display = "block";
	var lastDiv = this.correctDiv;
	var lastColor = this.lastColor;
	trophy.style.background = "url(https://jorgeewa.github.io/who-wants-to-be-a-millionaire-game/Millionaire/pictures/BlankAvatar_1.jpg) no-repeat 0 0";
	trophy.style.backgroundSize = "100% 100%";
	newDisplay = new display();
	newDisplay.render(0);
	prizeStart = new prize(".wrapper", 300);
	prizeStart.start(".prize-one");
	prizeStart.progress(".prize-one");
	message.innerHTML = "This would be a very tough game";
	restartButton.style.display = "none";
	if(lastColor)
		lastDiv.style.background = lastColor;
	var resetPic = document.querySelectorAll(".options img");
	for(i=0; i<resetPic.length; i++){
			resetPic[i].style.opacity = ".9"
	}
}

display.prototype.noRepeat = function(selectedQuestion){
	this.noRandomRepeat.forEach(function(arrayElement){
		if (arrayElement == selectedQuestion)
			return 0;
	});
	return 1;
}

newDisplay = new display();
newDisplay.render(0);
prizeStart = new prize(".wrapper", 300);
prizeStart.start(".prize-one");
prizeStart.progress(".prize-one");
