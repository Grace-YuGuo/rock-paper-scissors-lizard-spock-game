//grabbing html elements by id
const startGameButtons = document.getElementsByClassName('start-game-buttons')[0]
const playAgainstFriend = document.getElementById('play-against-friend')
const playAgainstComputer = document.getElementById('play-against-computer')

const mainGameContainer = document.getElementsByClassName('main-game-container')[0]
const gameOptions = document.getElementById('game-options')
const optionTextAndSVG = document.querySelectorAll('.option-container p, .option-container path')
const allOptions = document.getElementsByClassName('option-container')
const availableChoices = ['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock']

const roundEndScreen = document.getElementById('round-end-screen')
const roundEndPlayer1 = document.getElementById('player-one-chose')
const roundEndOtherPlayer = document.getElementById('other-player-chose')
const nextRoundButton = document.getElementById('next-round')
const currentRoundElement = document.getElementById('currentRound')
const roundWinner = document.getElementById('announce-round-winner')

const playersTurn = document.getElementById('players-turn')

const gameEndScreen = '' //to be implemented

// roundEndScreen.style.display = 'none'
//global variables

let isGameRunning = false
let opponentIsComputer = undefined
let isPlayerOneTurn = undefined

roundEndScreen.style.display = 'none'

let playerOneChoice = ''
//this can be the second human player or the computer
let otherPlayerChoice = ''
//used to determine if a round is over and a winner is to be chosen
let bothPlayersChose = false

let playerOnePoints = 0
let otherPlayerPoints = 0

let currentRound = 0


playAgainstFriend.addEventListener('click', function (e) {
    console.log(`You clicked ${e.target.id}`)
    opponentIsComputer = false
    startGame()
})

playAgainstComputer.addEventListener('click', function (e) {
    console.log(`You clicked ${e.target.id}`)
    opponentIsComputer = true
    startGame()
})

function startGame() {
    isGameRunning = true
    startGameButtons.style.display = 'none'
    mainGameContainer.style.display = 'block'
    mainGameContainer.style.margin = '30px'
    console.log(isGameRunning)
    isPlayerOneTurn = true

    hookUpEventListeners()
}

/** Registers clicks on any part of the buttons */
function hookUpEventListeners() {
    //grabbing clicks on the images and paragraphs, then using closest to find the corresponding button
    optionTextAndSVG.forEach((option) => {
        option.addEventListener('click', function (e) {
            //prevents the event from bubbling up to the button itself, which would cause the click to be logged twice
            e.stopPropagation()
            playerChooseOption(option.closest('.option-container').id)
        })
    })

    //grabbing the buttons themselves
    for (let i = 0; i < allOptions.length; i++) {
        allOptions[i].addEventListener('click', function (e) {
            playerChooseOption(e.currentTarget.id)
        })
    }
}

/** saves player's choices, then lets them switch -- player one always goes first, computer or player two goes second for now*/
function playerChooseOption(clickedButton) {
    if (isPlayerOneTurn) {
        playerOneChoice = clickedButton
        console.log(`Player 1 chose ${playerOneChoice}`)
    } else {

        otherPlayerChoice = clickedButton
        console.log(`Player 2 chose ${otherPlayerChoice}`)
        //now both players chose (as player 1 goes first)
        bothPlayersChose = true
        //winnerThisRound returns a string containing the winner, or 'Draw'
        announceRoundWinner(winnerThisRound(playerOneChoice, otherPlayerChoice))

    }

    switchTurns()
}

function computerChooseOption() {
    let randomChoice = Math.floor(Math.random() * availableChoices.length)
    otherPlayerChoice = availableChoices[randomChoice]
    console.log(`Computer has chosen ${otherPlayerChoice}`)
    isPlayerOneTurn = true
    announceRoundWinner(winnerThisRound(playerOneChoice, otherPlayerChoice))
}

function switchTurns() {
    if (isPlayerOneTurn && opponentIsComputer) {
        isPlayerOneTurn = false
        computerChooseOption()
    } else {
        isPlayerOneTurn = !isPlayerOneTurn
    } 

    if (!isPlayerOneTurn){
        playersTurn.innerHTML='PLAYER 2\'S TURN'
    }else if(roundEndScreen.style.display=='block'){
        playersTurn.innerHTML='ROUND RESULT'
    }else{
        playersTurn.innerHTML='PLAYER 1\'S TURN'
    }

}
/** checks winner for one round. returns 'player one', 'other player', or 'Draw'  */
function winnerThisRound(playerOneChoice, otherPlayerChoice) {
    console.log(`calling with ${playerOneChoice} and ${otherPlayerChoice}`)
    let result = ''
    //check for Draw first
    if (playerOneChoice === otherPlayerChoice) {
        result = 'Draw'
        console.log(result)
        return result
    }

    switch (playerOneChoice){
        case 'Rock':
            if(otherPlayerChoice === 'Paper' || otherPlayerChoice === 'Spock'){

              result = 'other player'
                otherPlayerPoints++
            } else {
                result = 'Player One'
                playerOnePoints++
            }
            break;

        case 'Paper':
            if(otherPlayerChoice === 'Scissors' || otherPlayerChoice === 'Lizard'){

                result = 'other player'
                otherPlayerPoints++
            } else {
                result = 'Player One'
                playerOnePoints++
            }
            break;
        case 'scissorsOption':
            if (otherPlayerChoice === 'rockOption' || otherPlayerChoice === 'spockOption') {
                result = 'other player'
                otherPlayerPoints++
            } else {
                result = 'Player One'
                playerOnePoints++
            }
            break;


            case 'Scissors':
                if(otherPlayerChoice === 'Rock' || otherPlayerChoice === 'Spock'){
                    result = 'other player'
                    otherPlayerPoints++
                }
                else {
                    result = 'Player One'
                    playerOnePoints++
                }
            break;
            case 'Lizard':
                if(otherPlayerChoice === 'Paper' || otherPlayerChoice === 'Spock'){
                    result = 'other player'
                    otherPlayerPoints++
                }
                else {
                    result = 'Player One'
                    playerOnePoints++
                }
            break;
            case 'Spock':
                if(otherPlayerChoice === 'Paper' || otherPlayerChoice === 'Lizard'){
                    result = 'other player'
                    otherPlayerPoints++
                }
                else {
                    result = 'Player One'
                    playerOnePoints++
                }
                break;
            
            default:
                //something must have gone wrong, count as Draw
                result = 'Draw'

            break;
    }

    console.log(result)
    //this round is now over
    bothPlayersChose = false
    //if the other player won, we check if we play a human or a computer
    if (result === 'other player' && opponentIsComputer) {
        result = 'Computer'
    } else if (result === 'other player' && !opponentIsComputer) {
        result = 'Player 2'
    }

    return result

}

/** once one round is over, this will temporarily hide the buttons 
 * and announce the current turns winner before offering to proceed to next round */

function announceRoundWinner(result) {
    console.log('announceRoundWinner called')

    gameOptions.style.display = 'none'
    roundEndPlayer1.innerHTML = `PLAYER 1 CHOSE ${playerOneChoice}`
    roundEndOtherPlayer.innerHTML = `${opponentIsComputer? `COMPUTER CHOSE ${otherPlayerChoice}` : `PLAYER 2 CHOSE ${otherPlayerChoice}`}`
    currentPlayerOneScore.innerHTML = playerOnePoints
    currentPlayerTwoScore.innerHTML = otherPlayerPoints
    roundWinner.innerHTML = result
    roundEndScreen.style.display = 'block'

    

    nextRoundButton.addEventListener('click', function () {
        roundEndScreen.style.display = 'none'
        gameOptions.style.display = 'flex'

        //show that we are now in the next round
        currentRound++
        console.log(currentRound)
        currentRoundElement.innerHTML = currentRound
        isPlayerOneTurn=false
        switchTurns()
    })

}