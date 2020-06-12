/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
class Player{
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.roundScore = 0;
        this.nameEl = document.querySelector(`#name-${name}`);
        this.scoreEl = document.querySelector(`#score-${name}`);
        this.roundScoreEl = document.querySelector(`#current-${name}`);
        this.panelEl = document.querySelector(`.player-${name}-panel`);
        
    }
    addScore() {
        this.score += this.roundScore;
        this.scoreEl.textContent = this.score;
    }
    resetScore() {
        this.score = 0;
        this.scoreEl.textContent = this.score;
    }
    addRoundScore(value) {
        this.roundScore += value;
        this.roundScoreEl.textContent = this.roundScore;
    }
    resetRoundScore() {
        this.roundScore = 0;
        this.roundScoreEl.textContent = this.roundScore;
    }
    reset() {
        this.resetScore();
        this.resetRoundScore();
        this.panelEl.classList.remove('active');
        this.panelEl.classList.remove('winner');
        this.nameEl.textContent = 'Player ' + (parseInt(this.name) + 1)
    }
    getScore() {
        return this.score;
    }
    winner() {
        this.panelEl.classList.remove('active');
        this.panelEl.classList.add('winner');
        this.nameEl.textContent = 'WINNER'
    }
}

var dice = {
    el: document.querySelector('.dice'),
    value: 0,
    roll: function () {
        this.value = Math.ceil(Math.random() * 6);
        this.el.src = `dice-${this.value}.png`;
        this.show();
        return this.value;
    },
    getValue: function() {
        return this.value;
    },
    reset: function() {
        this.value = 0;
        this.hide();
    },
    hide: function() {
        this.el.style.display = 'none'
    },
    show: function() {
        this.el.style.display = 'block';
    }
}

var player1 = new Player('0');
var player2 = new Player('1');

var pigGame = {
    isPlayable: true,
    winScore: 20,
    players: [player1, player2],
    activePlayer: 0,
    dice: dice,
    init: function() {
        this.isPlayable = true;
        this.activePlayer = 0,
        // reset dice
        this.dice.reset();

        // reset player scores
        this.players.forEach(player => {
            player.reset();
        });
        this.players[this.activePlayer].panelEl.classList.add('active');
    },
    hold: function() {
        if(! this.isPlayable ) 
            return;

        this.players[this.activePlayer].addScore();

        if(this.players[this.activePlayer].getScore() >= this.winScore) {
            this.players[this.activePlayer].winner();
            this.dice.reset();
            this.isPlayable = false;
            return;
        }
        this.dice.reset();
        this.players[this.activePlayer].resetRoundScore();
        this.swapActivePlayer();
    },
    roll: function() {
        if(! this.isPlayable ) 
            return;
        // roll dice and get dice value
        let diceValue = this.dice.roll();

        if (diceValue === 1) {
            this.players[this.activePlayer].resetRoundScore();
            // this.dice.reset();
            this.swapActivePlayer();
            return;
        }
        
        this.players[this.activePlayer].addRoundScore(diceValue);
    },
    swapActivePlayer: function() {
        this.players.forEach(player => {
            player.panelEl.classList.toggle('active');
        });
        this.activePlayer === 0 ? this.activePlayer = 1 : this.activePlayer = 0;
    }
}



pigGame.init();

document.querySelector('.btn-roll').addEventListener('click', () => pigGame.roll());
document.querySelector('.btn-hold').addEventListener('click', () => pigGame.hold());
document.querySelector('.btn-new').addEventListener('click', () => pigGame.init());

