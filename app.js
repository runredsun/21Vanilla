let scores = [0, 0];
let activePlayer = 0;
let roundScore = 0;
const newGameBtn = document.querySelector('.btn-new');
const btnHold = document.querySelector('.btn-hold');
const btnTake = document.querySelector('.btn-take');
const card = document.querySelector('.card');
const suits = ['D', 'C', 'H', 'S']
let score = document.getElementById('score-' + activePlayer);
let player1 = document.querySelector('.player-0-panel');
let player2 = document.querySelector('.player-1-panel');
let playerName;
let current;
let randomNumber;


// Event Listners
btnTake.addEventListener('click', takeCard)
btnHold.addEventListener('click', holdCard)
newGameBtn.addEventListener('click', newGame)
// Functions
function takeCard(e) {
    e.preventDefault();
    randomNumber = randomInteger(2, 11);
    current = document.querySelector('#current-' + activePlayer);
    let randomSuit = suits[Math.floor(Math.random() * suits.length)];
    card.style.display = 'block';
    card.src = 'cards/' + randomNumber + randomSuit + '.png';

    nextPlayer(21);


}

function holdCard() {
    playerName = document.querySelector('#name-' + activePlayer);
    if (roundScore != 0) {
        const score = document.getElementById('score-' + activePlayer);
        scores[activePlayer] += roundScore;
        score.innerText = scores[activePlayer];
        winner(scores[activePlayer]);
        nextPlayer(1);
    } else {
        alert(`${playerName.innerText}  take the card`);
    }
}

function randomInteger(min, max) {
    // random number from min to (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}


function nextPlayer(max) {
    if (activePlayer === 0 || activePlayer === 1) {
        roundScore += randomNumber;
        current.innerText = roundScore;
        if (roundScore > max && activePlayer === 1) {
            activePlayer = 0;
            player2.classList.remove('active');
            player1.classList.add('active');
            current.innerText = 0;
            roundScore = 0;
            card.style.display = 'none';
        } else if (roundScore > max && activePlayer === 0) {
            activePlayer = 1;
            current.innerText = 0;
            roundScore = 0;
            player1.classList.remove('active');
            player2.classList.add('active');
            card.style.display = 'none';
        }
    }
}

function winner(active) {
    if (active >= 100) {
        alert(`${playerName.innerText} win!`)
        playerName.classList.toggle('winner');
        btnHold.style.pointerEvents = 'none';
        btnTake.style.pointerEvents = 'none';
    }
}

function newGame() {
    scores = [0, 0];
    activePlayer = 0;
    let playerScore = document.querySelectorAll('div.player-score')
    playerScore.forEach(score => {
        score.innerText = 0;
    })
    btnHold.style.pointerEvents = 'all';
    btnTake.style.pointerEvents = 'all';
    if (player2.classList.contains('active')) {
        player2.classList.remove('active');
        player1.classList.add('active');
    }
    playerName.classList.remove('winner');
}