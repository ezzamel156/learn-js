/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var pigGame = {
    winScore: 50,
    scores: [0, 0],
    roundScore: 0,
    activePlayer: 0,
    dice: 0,
    rollDice: function() {
        this.dice = Math.ceil(Math.random() * 6);
        this.updateDice(this.dice);
        if(this.dice === 1) {
            this.clearRoundScore();
            this.swapActivePlayer();
            return;
        }
        this.addRoundScore(this.dice);
        if(this.roundScore + this.scores[this.activePlayer] >= this.winScore) {
            console.log(`WINNER ${this.activePlayer}`);
        }
    },
    updateDice: function(value) {
        document.querySelector('.dice').src = `dice-${value}.png`;
    },
    swapActivePlayer: function() {
        document.querySelector(`.player-${this.activePlayer}-panel`).classList.toggle('active');
        this.activePlayer = (this.activePlayer + 1) % 2;
        document.querySelector(`.player-${this.activePlayer}-panel`).classList.toggle('active');
    },
    clearRoundScore: function() {
        this.roundScore = 0;
        this.updateRoundScore(this.activePlayer);
    },
    addRoundScore: function(value) {
        this.roundScore += value;
        this.updateRoundScore(this.activePlayer);
    },
    updateRoundScore: function(player) {
        document.querySelector(`#current-${player}`).textContent = this.roundScore;
    },
    hold: function() {
        this.addPlayerScore(this.activePlayer, this.roundScore);
        this.clearRoundScore();
        this.swapActivePlayer();
    },
    addPlayerScore: function(player, value) {
        this.scores[player] += value;
        this.updateActivePlayerScore();
    },
    updateActivePlayerScore: function() {
        document.querySelector(`#score-${this.activePlayer}`).textContent = this.scores[this.activePlayer];
    },
    clearPlayerScores: function() {
        
    },
    newGame: function() {
        this.scores = [0, 0];
        this.activePlayer = 0;
        this.clearRoundScore();
    }
}

document.querySelector('.btn-roll').addEventListener('click', () => pigGame.rollDice());
document.querySelector('.btn-hold').addEventListener('click', () => pigGame.hold());

