//  defining variables 
function Player(name, symbol){

}

const players = [
    {
        name : "player1",
        symbol : "X",
        wins: 0
    },
    {
        name : "player2",
        symbol : "O",
        wins: 0
    }
]
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let gameSetUp = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]

let currentPlayer = players[0]

// let turnNumber = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
let turnCounter = 0
let gameTurnRecord = null
let turns = []
let win = false
let draw = false

//  functions
// -----------------------------------------------------------------------------------------------------------------------------------

// creating the html squares


    for (let index = 0; index < 9; index++) {
        document.getElementById("game").innerHTML += 
        `<div class="square" id="sqr${index}" onclick = 'playerMove(${index})'>
        <span></span>
         <img src="" alt=""> </div>`
    
         console.log("new box added")
    }





// check if the square has already been filled

function checkSquare (index) {
    // let answer
    // if (!gameSetUp[index]) {
    //     // the square is available
    //     answer = true
    // }
    // else {
    //     // the square isnt available
    //     answer = false
    // }
    // return answer

    return gameSetUp[index] ? false : true
}

// ------------------------------------------------------------------------------------------------------------------------------------
// function for picking a square and adding the players symbol

function playerMove (index) {
    // debugger
    if (checkSquare(index)) {
        turnCounter++
        // change the value of that square to the symble of current player
        startTime()
        gameSetUp[index] = currentPlayer["symbol"]
        turns.push(index)
        // turnCounter[index] = turnCounter
        document.getElementById(`sqr${index}`).innerText = currentPlayer["symbol"] 
        console.log("value added")
        console.log(gameSetUp)
        
        if (checkForWin(index)) {
            setTimeout(() => {alert(currentPlayer.name + " won"), checkForRecord()}, 300 )

            if (currentPlayer == players[0])
             {players[0].wins++}
            else {players[1].wins++}

            document.querySelector("#p1 span").innerText = `wins: ${players[0].wins}`
            document.querySelector("#p2 span").innerText = `wins: ${players[1].wins}`

            setTimeout(() => resetGame(), 750)
            
            
        }
        else if(checkForDraw()) {
            setTimeout(() => {alert("Its a tie!")}, 300 )
            setTimeout(() => resetGame(), 750)
            
            
        }
        else {
            nextPlayer()
        }
        
    }
    else {
        // tell the player to pick another square
        // then repeat playerMove function
        alert("That square has already been taken. Select an empty square")
    }
}

// ------------------------------------------------------------------------------------------------------------------------------------
//  function nextPlay
function nextPlayer () {
    currentPlayer= currentPlayer == players[0]? players[1] :  players[0]
}



// ------------------------------------------------------------------------------------------------------------------------------------
// function that checks if you've won

function checkForWin (index) {
    let relevant = winConditions.filter(Arr => Arr.includes(index))
    //[ [3, 4, 5], [1, 4, 7], [0, 4, 8], [2, 4, 6] ]
    for (i of relevant) {
       
        if (gameSetUp[i[0]] == currentPlayer.symbol && 
            gameSetUp[i[1]] == currentPlayer.symbol && 
            gameSetUp[i[2]] == currentPlayer.symbol) {
                win = true
        }
    }
    return win
}


// ----------------------------------------------------------------------------------------------------
// function for reseting game
function resetGame () {
    for (i in gameSetUp) {
        gameSetUp[i] = undefined
    }
    for (let index = 0; index < 9; index++) {
        document.getElementsByClassName("square")[index].innerText = ""
    }
    
    clearInterval(intervalID)
    currentPlayer = players[0]
    turnCounter = 0 
    win = false
    draw = false

}


// ------------------------------------------------------------------------------------------------------
// function detect a draw

function checkForDraw () {
    return (gameSetUp.includes(undefined) || gameSetUp.includes(null)) ? false : true
}

//-------------------------------------------------------------------------------------------------------
// function take back last move

function reverseMove () {
    let x = turns.pop()
    gameSetUp[x] = undefined
    document.getElementById(`sqr${x}`).innerText = ""
    
    nextPlayer()
    turnCounter--
}


// -----------------------------------------------------------------------------------------------------
 function checkForRecord () {
     if (gameTurnRecord == null) {
         alert(`No quickest game on record. You just set the quickest game to ${turnCounter} turns`)
         gameTurnRecord = turnCounter
     }
     else if (turnCounter < gameTurnRecord) {
         alert(`thats a new quickest game! You finished the game in ${turnCounter} turns, 
         thats ${gameTurnRecord-turnCounter} turns faster than the previous record (which was ${gameTurnRecord} turns)`)
         gameTurnRecord = turnCounter
     }
     else {
         alert(`This game was ${turnCounter} turns. 
         The quickest game so far has been ${gameTurnRecord}`)
     }
 } 

 // function for a pop up showing the amount of turns in the quickest game

 function showRecord() {
     document.querySelector(".popup span").innerHTML = `The current record for the quickest game is ${gameTurnRecord}`
     var popup = document.getElementById("myPopup");
     popup.classList.toggle("show");
     // open popup.html as a popup on the page
 }



 //------------------------------------------------------------------------------------------------------
 //funtion for saving a game


 function save () {
    localStorage.gameSetUp = JSON.stringify(gameSetUp)
    localStorage.turnCounter = JSON.stringify(turnCounter)

 }


 //--------------------------------------------------------------------------------------------------------
// function for loading saved game
function loadGame () {
    
    if (!localStorage.gameSetUp) {
    
       alert("no saved game on record")
    }
    
    else {
        
       gameSetUp = JSON.parse(localStorage.gameSetUp)
       
    
       // turnCounter = localStorage.turnCounter
       // turnCounter = JSON.parse(turnCounter)
       
       for (let index = 0; index < 9; index++) {
           document.getElementById(`sqr${index}`).innerText = (gameSetUp[index] !== null)? gameSetUp[index] : ""
       }
    }
}

// -------------------------------------------------------------------------------------------------------
// function for making a timer

let time = 0
let clock = document.getElementById("count")
let intervalID 

function countUp () {
    
    if (!win && !draw) {
        clock.innerHTML = `${time}`
        time++
        console.log(time)  
    }
}

function timeMoving() {
    intervalID = setInterval(function(){ countUp(); }, 1000)
}




// ------------------------------------------------------------------------------------------------------
// function for starting counter after first move
function startTime () {
    if (gameSetUp.includes("X") || gameSetUp.includes("O")) {    
       
    }
    else { 
        console.log("time started")
        time = 0
        clock.innerText = ""
        timeMoving()
    } }