'use strict'

class Hangman {
    constructor(word,guesses,guessesRemaining, status) {
        this.word = word.toLowerCase().split('')
        this.guesses = []
        this.guessesRemaining = guessesRemaining
        this.status= 'playing'
    }

    setStatus() {
        let wordWithNoWhitespaces = this.word
        wordWithNoWhitespaces = wordWithNoWhitespaces.filter(function(str) {
            return /\S/.test(str);
        });
        const finished = wordWithNoWhitespaces.every((letter) => {
            return this.guesses.includes(letter)
        })

        if (this.guessesRemaining <= 0) {
            this.status = 'failed'
        } else if(finished) {
            this.status = 'finished'
        } else {
            this.status = 'Keep playing'
        }
    }

    setMessage(puzzle) {
        let guessedFinal
        let guessed = ''    
        this.guesses.forEach((guess, index) => {
            if(index < (this.guesses.length -2)) {
                guessed += `"${guess}", `
            } 
        })
        document.querySelector('#result').innerHTML = ''
        if(this.guesses.length === 0) {
            generateDOM(`${puzzle}`)
            generateDOM(`No guesses?`)
            return generateDOM(`Remaining guesses: ${this.guessesRemaining}`)
        } 
        if(this.guesses.length === 1) {
            guessedFinal = `"${this.guesses[0]}"`
        } else {
            guessedFinal = `${guessed}"${this.guesses[this.guesses.length -2]}" and "${this.guesses[this.guesses.length -1]}"`
        }
        generateDOM(`${puzzle}`)
        generateDOM(`Already guessed:  ${guessedFinal}`)
        if(this.status === 'finished') {
            document.querySelector('#guess').disabled = true
            return generateDOM(` Just ${this.status}! Great work! You guessed the word.`)
        } else if (this.status === 'failed') {
            document.querySelector('#guess').disabled = true
            return generateDOM(` ${this.status} :( There is left no other guesses. Nice try, the word is "${this.word.join('')}"`)
        }
        return generateDOM(` ${this.status}--> Remaining guesses: ${this.guessesRemaining}`)
    }

    setGuesses(guess) {
        const  patt=/[A-z]/g;
        let unique = !this.guesses.includes(guess)
        let badGuess = !this.word.includes(guess.toLowerCase())
        let beLetter = patt.test(guess)
       
        if(unique && beLetter){
            // this.guesses.push(guess)
            this.guesses = [...this.guesses, guess]
        }

        if(unique && badGuess && beLetter || this.guessesRemaining===0) {
            --this.guessesRemaining
        }
        this.setStatus()
        return this.guesses
    }

    get puzzle() {
        let puzzle=''
        this.word.forEach((wordLetter) => {
            if(this.guesses.includes(wordLetter) || wordLetter === ' ') {
            puzzle += wordLetter
            }  else {
                puzzle += '*'
            } 
        })
        return this.setMessage(puzzle) 
    }

}

const generateDOM = function(content) {
    const paragr = document.createElement('p')
    paragr.textContent = content
    document.getElementById('result').appendChild(paragr)
}

export {Hangman as default}