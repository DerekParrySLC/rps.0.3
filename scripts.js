// logic variables
var a = document.getElementById("a");
var b = document.getElementById("b");
var c = document.getElementById("c");

// prepare logic
var rules = {
	
	show: function() {
		c.innerHTML = m.rules();
	},
	
	hide: function() {
		c.innerHTML = m.howItWorks();	
	}

}

var game = {
	
	new: function() {
		a.innerHTML = m.score();
		b.innerHTML = m.choices();
	},
	
	userChoose: function(choice) {
		
		choices.user = choice;
		
		// determine computer's choice
		var choiceArray = [["rock"], ["paper"], ["scissors"]];
		var num = ~~(Math.random()*3);
		choices.comp = choices[choiceArray[num]];

		// determine computer's non-choice
		choices.notComp = choices.comp;
		while(choices.notComp == choices.comp) {
			choices.notComp = choices[choiceArray[~~(Math.random()*3)]]
		}

		//determine whether "points" should be singular
		if(choices.user.value == 1) {
			result.userPtOrPts = "point";
		} else {
			result.userPtOrPts = "points";
		}

		//change markup
		b.innerHTML = m.question();

		//tests
		console.log("User: " + choices.user.text);
		console.log("Comp: " + choices.comp.text);
		console.log("Non-Comp: " + choices.notComp.text);
	},
	result: function(num) {
		

		// Put these into templates and logic below
		
		result.userChange = choices.user.value * num;
		result.compChange = choices.comp.value * num;

		result.userPtOrPts = result.compPtOrPts = "points";

		if(num == 1 && (choices.user.text == "rock")) {
			result.userPtOrPts = "point";
			console.log("user pts conditional is working");
		}

		if(num == 1 && (choices.comp.text == "rock")) {
			result.compPtOrPts = "point";
			console.log("comp pts conditional is working");
		}

		if(choices.user.beats == choices.comp.text) {
			result.phrase = choices.user.phraseWin;
			result.user = "gain";
			result.comp = "loses";
			score.user += result.userChange;
			score.comp -= result.compChange;
			this.end("win!");
		} else if (choices.comp.beats == choices.user.text){			
			result.phrase = choices.comp.phraseLose;
			result.user = "lose";
			result.comp = "gains"
			score.user -= result.userChange;
			score.comp += result.compChange;			
			this.end("lose  : (");
		} else {
			b.innerHTML = m.tie();
		}
	},
	end: function(winLose) {
		if((score.user <= 0) || (score.comp <= 0)) {
			
			if(score.user > score.getTop()) {
				localStorage.setItem("topScore", score.user);
				a.innerHTML = m.newHighScore();
			} else {
				a.innerHTML = m.score();	
			}

			result.end = winLose;
			b.innerHTML = m.end();

		} else {
			a.innerHTML = m.score();
			b.innerHTML = m.change();
		}
	},
	reset: function(markupFunction) {
		score.user = score.comp = 5;

		if(markupFunction == m.choices()) {
			a.innerHTML = m.score();
		}

		b.innerHTML = markupFunction;
	},
}

//execute logic
b.innerHTML = m.rockPaperScissors();
c.innerHTML = m.howItWorks();


