import Hangman from './hangman'
import getPuzzle from './requests'

let game1
const render = () => {
  game1.puzzle
  const arrayPuzzle = document.querySelector('p').innerHTML.split('')
  document.querySelector('p').innerHTML=''
  for (let el of arrayPuzzle) {
    const span = document.createElement('span')
    span.textContent = el
    document.querySelector('p').appendChild(span)
  }
}

document.querySelector('#guess').addEventListener('input', (e) => {
    const guess = e.target.value
    game1.setGuesses(guess)
    render()
})

const startGame = async () => {
  const puzzle = await getPuzzle(2)
  const chances = Math.round(puzzle.length/2)
  game1 = new Hangman(puzzle, [], chances)
  render()
  document.querySelector('#guess').disabled = false
}

document.querySelector('#reset').addEventListener('click', startGame)
startGame()

const input = document.querySelector('input')
input.addEventListener("keyup", e => {
  const position = e.target.selectionStart
  input.value = input.value.substring(0, position-1) + input.value.substring(position+1)
})