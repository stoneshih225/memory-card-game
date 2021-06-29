const card = document.querySelectorAll(".memory-card"); //get all cards
const record = document.querySelector(".record");
const showRestart = document.querySelector(".restart");
const playAgain = document.querySelector(".play-again");
const finalScore = document.querySelector(".final");

let hasFlippedCard = false; //track flip
let lockBoard = false; 
let firstCard;
let secondCard;
let score = 0;
let win = 0;

function flipCard () {
    if (lockBoard) {return;} //handle click the other two cards
    if (firstCard === this) {return;} //handle double click

    this.classList.add("flip");

    if (!hasFlippedCard) {
        //the first time to click
        hasFlippedCard = true;
        firstCard = this;
    } else {
        //the second time to click
        hasFlippedCard = false;
        secondCard = this;

        //check if the cards are match
        if (firstCard.dataset.name === secondCard.dataset.name) {
            //match
            score += 10;
            win += 2;
            firstCard.removeEventListener("click", flipCard);
            secondCard.removeEventListener("click", flipCard);
            record.innerHTML = `<p>${score} POINTS</p>`;

            //game win
            if (win === 12) {
                showRestart.style.display = "flex";
                finalScore.innerHTML= "You got " + score + " points !";
            }
        } else {
            //not match
            lockBoard = true;
            setTimeout(function () {
                firstCard.classList.remove("flip");
                secondCard.classList.remove("flip");
                lockBoard = false;
            }, 1500);
            
            if (score > 0) {
                score -= 2;
            }
            record.innerHTML = `<p>${score} POINTS</p>`;
        }
    }
}

function restart () {
    //restart
    shuffle();
    removeFlip();
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = "";
    secondCard = "";
    score = 0;
    win = 0;
    showRestart.style.display = "none";
}

function removeFlip () {
    //flip all the cards to back and addEventListener
    card.forEach(function (card) {
        card.classList.remove("flip");
        card.addEventListener("click", flipCard);
    });
}

function shuffle () {
    //shuffle the cards
    card.forEach(function (card) {
        let randomNum = Math.floor(Math.random() * 12) //0 ~ 11
        card.style.order = randomNum;
    });
}

card.forEach(function (card) {
   card.addEventListener("click", flipCard); 
});

playAgain.addEventListener("click", restart);
window.onload = shuffle;