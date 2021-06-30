# memory card game

### ✔[Live Demo](https://stoneshih225.github.io/memory-card-game/)
<br>

![memoryCardGame](https://media.giphy.com/media/1vqlN27fIVmf7KZHEr/giphy.gif)

### MY NOTE 📃

取得card, record, showRestart, playAgain, finalScore
```
const card = document.querySelectorAll(".memory-card"); //所有card
const record = document.querySelector(".record"); //計分
const showRestart = document.querySelector(".restart"); //重新開始
const playAgain = document.querySelector(".play-again"); //重新開始按鈕
const finalScore = document.querySelector(".final"); //最終分數

let hasFlippedCard = false; //追蹤翻牌
let lockBoard = false; //處理翻牌bug
let firstCard; //儲存第一張牌
let secondCard; //儲存第二張牌
let score = 0; //紀錄分數
let win = 0; //遊戲結束
```
<br>

監聽每張卡牌
```
card.forEach(function (card) {
   card.addEventListener("click", flipCard); 
});
```
<br>

監聽play again button
```
playAgain.addEventListener("click", restart);
```
<br>

載入後洗牌
```
window.onload = shuffle;
```
<br>

flipCard ()
```
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
```
<br>

shuffle ()
```
function shuffle () {
    //shuffle the cards
    card.forEach(function (card) {
        let randomNum = Math.floor(Math.random() * 12) //0 ~ 11
        card.style.order = randomNum; //flex
    });
}
```
<br>

removeFlip ()
```
function removeFlip () {
    //flip all the cards to back and addEventListener
    card.forEach(function (card) {
        card.classList.remove("flip");
        card.addEventListener("click", flipCard);
    });
}
```
<br>

restart ()
```
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
```

