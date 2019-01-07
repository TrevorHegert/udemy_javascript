/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

document.querySelector('.btn-roll').addEventListener('click', function () {

    //1. Random number
    dice = Math.floor(Math.random() * 6) + 1;

    //2. Display Result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    //3. Update the Round Score if rolled number is not a 1
    if (dice !== 1) {
        //Add roll to score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;

    } else {
        //End turn
        endTurn();
        //document.querySelector('.dice').style.display = 'none';
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    //Add roundScore to Global score
    scores[activePlayer] += roundScore;
    //Update UI 
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    //Check if Player has Won the Game
    if (scores[activePlayer] >= 20) {
        //Show Winning Message
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
        //End Game
        document.querySelector('.btn-roll').style.display = 'none';
        document.querySelector('.btn-hold').style.display = 'none';
    } else {
        //End Turn
        endTurn();
        document.querySelector('.dice').style.display = 'none';
    };
});

function endTurn() {
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
};

// var x = document.querySelector('#score-0').textContent;