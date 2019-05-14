class Hangman {

    constructor ( word, remainingGuesses ) {

        this.word = word.toLowerCase().split( '' )
        this.remainingGuesses = remainingGuesses
        this.guessedLetters = []
        this.status = 'Playing'

    }

    getPuzzle () {

        let puzzle = ''
        this.word.forEach ( ( letter ) => {
            if ( this.guessedLetters.includes ( letter ) || letter === ' ' ) {
                puzzle = puzzle.concat ( letter )
            } else {
                puzzle = puzzle.concat ( '*' )
            }
        } )
        return puzzle

    }

    makeGuess ( guess ) {

        if ( this.status !== 'Playing' ) return 

        guess = guess.toLowerCase()
        const isUnique = !this.guessedLetters.includes ( guess )
        const isBadGuess = !this.word.includes ( guess )

        if ( isUnique ) this.guessedLetters.push ( guess )

        if ( isUnique && isBadGuess ) this.remainingGuesses--
        
        this.calculateStatus()

    }

    calculateStatus () {

        const isAllLettersGuessed = this.word.every ( ( letter ) => this.guessedLetters.includes ( letter ) || letter === ' ' )
        if ( this.remainingGuesses !== 0 && isAllLettersGuessed ) {
            this.status = 'Finished'
        } else if ( this.remainingGuesses !== 0 && !isAllLettersGuessed ) {
            this.status = 'Playing'
        } else {
            this.status = 'Failed'
        }

    }

    getStatusMessage () {

        let message = ''
        if ( this.status === 'Playing' ) {
            message = `Guesses left: ${this.remainingGuesses}`
        } else if ( this.status === 'Failed' ) {
            message = `Nice try! The word was "${this.word.join( '' )}"`
        } else {
            message = 'Great work! You guessed the word.'
        }

        return message
 
    }

}

export { Hangman as default }



