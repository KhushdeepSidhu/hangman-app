import Hangman from './hangman'
import getPuzzle from './requests'

let game

const puzzleEl = document.querySelector ( '#puzzle' )
const guessesEl = document.querySelector ( '#guesses' )
const statusEl = document.querySelector ( '#status' )

window.addEventListener ( 'keypress', ( event ) => {
    const guess = String.fromCharCode ( event.charCode )
    game.makeGuess ( guess )
    render ()
} )

const render = () => {

    puzzleEl.innerHTML = ''
    guessesEl.textContent = game.getStatusMessage()

    const puzzle = game.getPuzzle ()
    let letterEl
    for ( let i = 0; i < puzzle.length; i++ ) {
        letterEl = document.createElement ( 'span' )
        letterEl.textContent = puzzle [ i ]
        puzzleEl.appendChild ( letterEl )
    }

}

const startGame = async () => {

    const puzzle = await getPuzzle ( '2' )
    game = new Hangman ( puzzle, 5 )
    render ()

}

startGame ()

document.querySelector ( '#reset' ).addEventListener ( 'click', startGame )