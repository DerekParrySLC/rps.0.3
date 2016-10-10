// PRE-MARKUP
// set top score to zero in local storage if it is not already defined
if(localStorage.getItem("topScore") == null) {
	localStorage.setItem("topScore", 0);
}

// create and populate score object. JSON.parse to return a number
var score = {};
score.user = score.comp = 5;
score.getTop = function() {
	return JSON.parse(localStorage.getItem("topScore")); //localStorage only returns strings, so we use the JSON.parse method to return a number
}

// create and populate choices object. JSON.parse to return a number
var choices = {};
choices.choice = function(text, beats, value, phraseWin, phraseLose){
	this.text = text;
	this.beats = beats;
	this.value = value;
	this.phraseWin = phraseWin;
	this.phraseLose = phraseLose;
}
choices.rock = new choices.choice("rock", "scissors", 1, "is crushed by", "crushes");
choices.paper = new choices.choice("paper", "rock", 2, "is covered by", "covers");
choices.scissors = new choices.choice("scissors", "paper", 3, "is cut by", "cuts");
// choices.user is added in script.js, line [*]
// choices.comp is added in scripts.js, line [*]
// choices.notComp is added in scripts.js, line [*]

// create result object; result.properties will be created in scripts.js
var result = {};
// result.userPtOrPts is added in scripts.js, line [*]
// result.compPtOrPts is added in scripts.js, line [*]
// result.wager is added in scripts.js, line [*] 
// result.phrase is added in scripts.js, line [*]
// result.user is added in scripts.js, line [*]
// result.comp is added in scripts.js, line [*]
// result.userChange is added in scripts.js, line [*]
// result.compChange is added in scripts.js, line [*]

// MARKUP
var m = {
	// first page markup
	topScore: function() {
		return`
			Top Score: ${score.getTop()}
		`
	},
	rockPaperScissors: function() {
		
		if(score.getTop() !== 0) {
			a.innerHTML = m.topScore();
		}

		return`
			<h1>Rock Paper Scissors</h1>
			<button onclick = "game.new()">New Game</button>			
		`
	},
	howItWorks: function() {
		return`
			<br>
			<code onclick="rules.show()">How it works</code>
		`
	},
	rules: function() {
		return`
			<br>
			Rock wagers 1 point<br>
			Paper wagers 2 points<br>
			Scissors wagers 3 points<br>
				<br>
			Stay above zero points<br>
				<br>
			<code class="underline" onclick="rules.hide()">Hide rules</code>
		`
	},
	//second page markup
	score: function() {
		return`
			${m.topScore()}<br><br>
			You: ${score.user}<br>
			Computer: ${score.comp}<br>
		`
	},
	choices: function() {
		return`
			<br>
			<button onclick="game.userChoose(choices.rock)">Rock</button>
			<button onclick="game.userChoose(choices.paper)">Paper</button>
			<button onclick="game.userChoose(choices.scissors)">Scissors</button>
		`
	},
	// third page markup
	question: function() {
		return`
			<br>
			You chose ${choices.user.text}, wagering ${choices.user.value} ${result.userPtOrPts}.<br>
			The computer did not choose ${choices.notComp.text}.<br>
				<br>
			Would you like to multiply the stakes of the bet?<br>
				<br>
			<button onclick="game.result(1)">Stay</button>
			<button onclick="game.result(2)">x2</button>
			<button onclick="game.result(3)">x3</button>
		`
	},
	change: function() {
		return`
			<br>
			The Computer chose ${choices.comp.text}, which ${result.phrase} your ${choices.user.text}.<br>
			You ${result.user} ${result.userChange} ${result.userPtOrPts} and 
			the Computer ${result.comp} ${result.compChange} ${result.compPtOrPts}.<br>
				<br>
			<button onclick="game.new()">Again</button>
		`
	},
	tie: function() {
		return `
			<br>It's a tie! You and the Computer both chose ${choices.user.text}.
			<br>No change in points.<br>
					<br>
			<button onclick='game.new()'>Again</button>
		`
	},
	end: function() {
		return`
			<br>
			<h2>You ${result.end}</h2>
			<p>Play again?</p>
				<br>
			<button onclick="game.reset(m.choices())">Yes</button>
			<button onclick="game.reset(m.rockPaperScissors())">No</button>
		` 
	},
	newHighScore: function() {
		return`
			<b>**new top score!!**</b>
				<br>
			${m.score()}
		`
	},
}




