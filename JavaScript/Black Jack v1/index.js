let sum = 0
let cardValues = [0,0,0,0,0]
let cardOpened = [false,false,false,false,false]
let sumEl = document.querySelector('#sum')
let gameOverEl = document.querySelector('#game-over')

function checkGameState() {
    sum = cardValues.reduce((sum,current)=>sum+current,0)
    sumEl.innerText = sum
    if (sum === 21) {
        calculateScore()
    }
    if (cardOpened.every(value => value === true) && sum <= 21) {
        calculateScore()
    }
    if (sum > 21) {
        msg = 'Game over!'
        console.log(msg)
        gameOverEl.innerText = msg
    }
}

function openCard(h2) {
    cardID = h2.dataset.card
    if (!cardOpened[cardID]) {
        cardValues[cardID] = Math.floor(Math.random()*10)+1
        cardOpened[cardID] = true
    }
    h2.innerText = cardValues[cardID]
    checkGameState()
}

function calculateScore() {
    let diff = 21 - sum
    let msg = 'You are '+diff+' value(s) close to 21!'
    console.log(msg)
    gameOverEl.innerText = msg
}