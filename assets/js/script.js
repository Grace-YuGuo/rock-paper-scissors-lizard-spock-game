const startGameButtons = document.getElementsByClassName('start-game-buttons')[0]
const playAgainstFriend = document.getElementById('play-against-friend')
const playAgainstComputer = document.getElementById('play-against-computer')

const mainGameContainer = document.getElementsByClassName('main-game-container')[0]
const optionTextAndSVG = document.querySelectorAll('.option-container p, .option-container path')
const allOptions = document.getElementsByClassName('option-container')
const availableChoices = ['rockOption', 'paperOption', 'scissorsOption', 'lizardOption', 'spockOption']

let isGameRunning = false
let opponentIsComputer = undefined
let isPlayerOneTurn = undefined

let playerOneChoice = ''
let otherPlayerChoice = ''

playAgainstFriend.addEventListener('click', function(e) {
    console.log(`You clicked ${e.target.id}`)
    opponentIsComputer = false
    startGame()
})

playAgainstComputer.addEventListener('click', function(e) {
    console.log(`You clicked ${e.target.id}`)
    opponentIsComputer = true
    startGame()
})

function startGame() {
    isGameRunning = true
    startGameButtons.style.display = 'none'
    mainGameContainer.style.display = 'block'
    console.log(isGameRunning)
    isPlayerOneTurn = true

    hookUpEventListeners()
}

function hookUpEventListeners() {
    //grabbing clicks on the images and paragraphs, then using closest to find the corresponding button
    optionTextAndSVG.forEach((option) => {
        option.addEventListener('click', function(e) {
            //prevents the event from bubbling up to the button itself, which would cause the click to be logged twice
            e.stopPropagation()  
            playerChooseOption(option.closest('.option-container').id)
        })
    })

    //grabbing the buttons themselves
    for (let i = 0; i < allOptions.length; i++) {
        allOptions[i].addEventListener('click', function(e) {
            playerChooseOption(e.currentTarget.id)
        })
    }
}

function playerChooseOption(clickedButton) {
    if (isPlayerOneTurn) {
        playerOneChoice = clickedButton
        console.log(`Player 1 chose ${playerOneChoice}`)
    } else {
        otherPlayerChoice = clickedButton
        console.log(`Player 2 chose ${otherPlayerChoice}`)
    }

    switchTurns()
}

function computerChooseOption() {
    let randomChoice = Math.floor(Math.random() * availableChoices.length)
    otherPlayerChoice = availableChoices[randomChoice]
    console.log(`Computer has chosen ${otherPlayerChoice}`)
    isPlayerOneTurn = true
    // Proceed to check the result of the game
}

function switchTurns() {
    if (isPlayerOneTurn && opponentIsComputer) {
        isPlayerOneTurn = false
        computerChooseOption()
    } else {
        isPlayerOneTurn = !isPlayerOneTurn
    }
}
