const gird = document.querySelector('.grid')
//const startBtn = document.querySelector('#start')
const startBtn = document.getElementById('start')
const score = document.getElementById('score')
let squares =[]
let currentSnake =[2, 1, 0] //for creating snake in grid def array
let direction = 1
const width = 10   
let appleIndex = 0
let scores = 0
let timeInterval = 1000
const speed = 0.9
let timerId = 0

function createSquaresInGrid() {
    for (let i=0; i<width*width; i++){ 
        const square = document.createElement('div')
        //console.log(square)
        square.classList.add('square') //adding class in div element for styling
        gird.appendChild(square)
        //const s = 
        squares.push(square)
        //console.log(s)
    }
    //console.log(squares)
}

createSquaresInGrid()
currentSnake.forEach(index => squares[index].classList.add('snake'))

function moveSnake(){
    const tail = currentSnake.pop()
    //console.log(tail)
    //console.log(currentSnake)
    squares[tail].classList.remove('snake')
    //console.log(currentSnake[0])
    
    currentSnake.unshift(currentSnake[0]+ direction)
    squares[currentSnake[0]].classList.add('snake')

    if(squares[currentSnake[0]].classList.contains('apple')){
        squares[currentSnake[0]].classList.remove('apple')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        generateApples()
        scores++
        score.textContent = scores
        clearInterval(timerId)
        timeInterval *= speed
        timerId = setInterval(moveSnake, timeInterval)
    }


     if(
         (currentSnake[0]+ width >= width*width && direction === width) || 
         (currentSnake[0] % width === width-1 && direction === 1) || 
         (currentSnake[0] % width === 0 && direction === -1) || 
         (currentSnake[0]- width < 0 && direction === -width) || 
         (squares[currentSnake[0]+direction].classList.contains('snake'))
     ){
         console.log("Snake is dead")
         return clearInterval(timerId)
     }
    /*const head = currentSnake.unshift(currentSnake[0]+direction) 
    will always give value of length of array to the head that is why 
    its not working. if you want to def head wrote like:

    const head = currentSnake[0]+ direction
    currentSnake.unshift(head)
    squares[head].classList.add('snake')

    */
    //console.log(currentSnake[0])
    //console.log(head)
    //console.log("length"+v)
    //console.log(currentSnake)
}

function generateApples(){
    do{
        appleIndex = Math.floor(Math.random()*squares.length)
    } while(squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}

function startGame() {
    //remove the snake
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    //remove the apple
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)
    currentSnake = [2,1,0]
    scores = 0
    //re add new score to browser
    score.textContent = scores
    direction = 1
    timeInterval = 1000
    generateApples()
    //readd the class of snake to our new currentSnake
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerId = setInterval(moveSnake, timeInterval)
}
//moveSnake()
//console.log(currentSnake[0])
//moveSnake()
//clearInterval(timerId)

function control(e){  // e is short for event
        if (e.keyCode === 39) {
            console.log('right pressed')
            direction = 1
        } else if (e.keyCode === 38) {
            console.log('up pressed')
            direction = -width
        } else if (e.keyCode === 37) {
            console.log('left pressed')
            direction = -1
        } else if (e.keyCode === 40) {
            console.log('down pressed')
            direction = +width
        }
    }
document.addEventListener('keyup', control)
startBtn.addEventListener('click', startGame)