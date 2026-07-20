let deckSec = document.querySelector('#deck')
let drawBtn = document.querySelector('#btn-draw')
let confirmBtn = document.querySelector('#btn-confirm')
let resetBtn = document.querySelector('#btn-reset')
let popupSec = document.querySelector('#popup')
let sumEl = document.querySelector('#sum-board')
let statEl = document.querySelector('#player-stat')

let drawnNumbers = []
let playerStat = {
    'name':'milkywayweaver',
    'balance':100
}
statEl.textContent = `${playerStat.name}: \$${playerStat.balance}`

function drawCard() {
    let drawnNumber = Math.floor(Math.random()*13+1)
    console.log('Drawn number = '+drawnNumber)
    if (drawnNumber === 1) {
        return 11
    }
    else if (drawnNumber > 10) {
        return 10
    }
    else {
        return drawnNumber
    }
}

function checkGameState(confirmation) {
    let sum = drawnNumbers.reduce((prev,current)=>prev+current,0)
    sumEl.textContent = `Sum: ${sum}`
    console.log(sum)
    
    msg = null
    if (sum > 21) {
        msg = `You lost! The current sum (${sum}) exceeded 21!`
        reward = -sum
    }
    else if (sum === 21) {
        msg = 'You won!'
        reward = 21
    }
    else if (sum < 21 && confirmation) {
        let diff = 21 - sum
        msg = `You are ${diff} away from 21!`
        reward = -diff
    }
    console.log(msg)
    if (msg !== null) {
        popupSec.children[1].textContent = msg
        popupSec.style.visibility = 'visible'

        playerStat.balance += reward
        if (playerStat.balance <= 0) {
            console.log('Out of balance! Please refresh the page.')
        }
    }
}

drawBtn.addEventListener('click',function() {
    let drawnNumber = drawCard()
    drawnNumbers.push(drawnNumber)

    let card = document.createElement('h2')
    card.textContent = drawnNumber
    deckSec.insertBefore(card,deckSec.lastElementChild)

    checkGameState(false)
})

confirmBtn.addEventListener('click',function() {
    console.log('Confirm button clicked!')
    checkGameState(true)
})

resetBtn.addEventListener('click',function() {
    popupSec.style.visibility = 'hidden'
    drawnNumbers = []
    console.log(`There are ${deckSec.children.length} elements in deck!`)
    for (let i = 0; deckSec.children.length-1; i++) {
        deckSec.children[0].remove()
    }
    checkGameState()
    statEl.textContent = `${playerStat.name}: \$${playerStat.balance}`
})