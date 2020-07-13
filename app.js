/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


//declaring our Global variables for our game;
    var scores, activePlayer, roundScore, gamePlaying, totalWinning;


//function to initialize our game
function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;


//hiding the dice image when the page first loads using css display property to none
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';


//setting the DOM values to zero, here is for the score and current player
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

    totalWinning = prompt("Enter Total Winning value");
}

//for starting a new game
document.querySelector('.btn-new').addEventListener('click', init);









//calling the initialize function
init();

var diceLast;
var dice1Last;

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying){
            //1. is to get a random number.
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice1 = Math.floor(Math.random() * 6) + 1;
        //2. is to display the dice image when we click on the roll dice button
            var diceDOM = document.querySelector('.dice');
                diceDOM.style.display = 'block';

            var diceDOM1 = document.querySelector('.dice1');
                diceDOM1.style.display = 'block';

        //next is to randomly change the dice img src with the dice variable which is for the random number to display the img dice randomly
                diceDOM.src = 'dice-' + dice + '.png';
                diceDOM1.src = 'dice-' + dice1 + '.png';

        //3. Update the round score IF the rollod number was NOT a 1

            if(diceLast === 6 && dice1Last === 6) {

                scores[activePlayer] = 0;
                document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

                nextPrayer();

            }else if(dice !== 1 && dice1 !== 1) {

                roundScore += (dice + dice1);
                //displaying the roundScore to the DOM 
                document.querySelector('#current-'+ activePlayer).innerHTML = roundScore;

            }else {
                nextPrayer();
            }
        
            diceLast = dice;
            dice1Last = dice1;
    }
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying){
            //adding our dice score to the Global score; 
            scores[activePlayer] += roundScore;

            //Updating the Global score to the DOM
            document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

            var inputScore; 

            if(totalWinning) {
                inputScore = totalWinning;

            }else {

                inputScore = 10;
            }
       
         //check if player won the game;
        if(scores[activePlayer] >= inputScore) {

            document.getElementById('name-'+ activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice1').style.display = 'none';

            document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
            document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');

            //disabling our game when a player wins
            gamePlaying = false;

        }else {
            nextPrayer();
        }
    }
});




function nextPrayer() {
    //checking if the active player is the current before the players gots 1 from the dice then switch to the second player using if statement
    if(activePlayer === 0){

        activePlayer = 1;

    }else {

        activePlayer = 0;
    }

    //return the roundscore to appear zero for a fresh starting.
    roundScore = 0;

    //setting the current score back to zero when the current player dice is == 1
    document.getElementById('current-0').innerHTML = '0';
    document.getElementById('current-1').innerHTML = '0';


    //switching the active css style when the current player is active(current player);
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //hiding back the dice img when the current player score is == 1 using css display properties to none

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';
}

