//row, column
const buttonPositions = {
                        "0-0": true,
                        "0-6": true,
                        "0-12": true,
                        "6-0": true,
                        "6-12": true,
                        "12-0": true,
                        "12-6": true,
                        "12-12": true,
                        "2-2": true,
                        "2-6": true,
                        "2-10": true,
                        "6-2": true,
                        "6-10": true,
                        "10-2": true,
                        "10-6": true,
                        "10-10": true,
                        "4-4": true,
                        "4-6": true,
                        "4-8": true,
                        "6-4": true,
                        "6-8": true,
                        "8-4": true,
                        "8-6": true,
                        "8-8": true,
                    };

function createTable(rn, cn){
    for(let r = 0; r< parseInt(rn, 10); r++){
        let x = document.getElementById('nmm').insertRow(r);
        for(let c = 0; c < parseInt(cn, 10); c++) {
            let y =  x.insertCell(c);
            let buttonId = r.toString().concat("-" +c.toString());
            if(buttonPositions[buttonId] === true){
                y.innerHTML=`<button onclick= "handleEvent(id)" id=${buttonId} class='button'/>`
            } else {
                //y.innerHTML="R" + r + "C" + c;
                y.innerHTML=`<div class='default-position' id=${buttonId}/>`;
            }
        }
    }
}


// let snd = new Audio("asset/nmm_moves.mp3");
const body = document.querySelector('body')

let turn = 1;
let gameId = '';
let playerOnePiecesCount = 1;
let playerTwoPiecesCount = 1;

document.addEventListener("DOMContentLoaded", function(event) {
    // createTable(13, 13);
    buildForm();
    fetchGames();
    
});

function fetchGames(){
    fetch('http://localhost:3000/games')
    .then(res => res.json())
    .then(games => games.slice(0,4).forEach(game =>  buildGames(game)))
}

function createPlayer(playerOne, playerTwo){
    fetch('http://localhost:3000/games', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            playerOneName: playerOne, 
            playerTwoName: playerTwo
        }),
    })
    .then(response => response.json())
    .then(game => {
        document.querySelector("#game-list-id").innerHTML = ''
        playerForm.innerHTML = ' '
        updatePlayer(game)
        createTable(13, 13);
        gameId = game.id;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function updateClick(buttonId){
    fetch(`http://localhost:3000/games/${gameId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({turn: turn}),
    })
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function updatePlayer(game){
    console.log(game.player_one.name)
    fetch(`http://localhost:3000/games/${game.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            playerOneId: game.player_one.id,
            playerTwoId: game.player_two.id
        }),
    })
    .then(response => response.json())
    .then(game => {
        buildPlayer(game)
    console.log('Success:', game);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function deleteGame(game){
    fetch(`http://localhost:3000/games/${game.id}`,{
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => {
        document.getElementById("game-id").remove()
        body.innerHTML = ' '
        buildForm()
    })
}

let mill = [
    ["0-0","0-6","0-12"],
    ["0-0", "6-0","12-0"],
    ["12-0","12-6","12-12"],
    ["0-12","6-12","12-12"],
    ["2-2","2-6","2-10"],
    ["2-2","6-2","10-2"],
    ["2-10","6-10","10-10"],
    ["10-2","10-6","10-10"],
    ["4-4","4-6","4-8"],
    ["4-4","6-4","8-4"],
    ["4-8","6-8","8-8"],
    ["8-4","8-6","8-8"]
]

let positionPlayerOne = []
let  positionPlayerTwo = []


function handleEvent(buttonId){
    // snd.play();
    let btn =  document.getElementById(`${buttonId}`)
    updateClick(buttonId)
    if (turn === 1){
        if(playerOnePiecesCount > 9){
            if(!btn.style.backgroundColor) {
                calculateMillPlayer1()
                alert("You cannot add any more!");     
            } else if (btn.style.backgroundColor == 'green'){
                alert("You cannot choose the other players piece!");     
            } else {
                calculateMillPlayer1()
                playerOnePiecesCount--;
                btn.style.backgroundColor = ""
                alert("You have chosen the piece to remove");     
            }
            return;
        }
        btn.style.backgroundColor = "yellow"
        positionPlayerOne.push(buttonId)
        playerOnePiecesCount++
    }
    else{
        if(playerTwoPiecesCount > 9){
            if(!btn.style.backgroundColor) {
                calculateMillPlayer2()
                alert("You cannot add any more!");     
            } else if (btn.style.backgroundColor === 'yellow'){
                alert("You cannot choose the other players piece!");     
            } else {
                calculateMillPlayer2()
                playerTwoPiecesCount--;
                btn.style.backgroundColor = ""
                alert("You have chosen the piece to remove");     
            }
            return;
         }
        btn.style.backgroundColor = "green"
        positionPlayerTwo.push(buttonId)
        playerTwoPiecesCount++;
    }
    
    if(turn === 1) {
        turn = 2;
    } else {
        turn = 1;
    }
   
}

function calculateMillPlayer2(){
    for(let i = 0; i < mill.length; i++){
        let arr = []
        for(let j = 0 ; j< positionPlayerTwo.length; j++){
            if (mill[i][0] === positionPlayerTwo[j] || mill[i][1] === positionPlayerTwo[j] || mill[i][2] === positionPlayerTwo[j]){
                arr.push(positionPlayerTwo[j])
            }
        }
        if (arr.length === 3){
            console.log(arr)
            alert (`Player Two You have  mill`)
            return;
        } 
    } 
}

function calculateMillPlayer1(){
    for(let i = 0; i < mill.length; i++){
        let arr = []
        for(let j = 0 ; j< positionPlayerOne.length; j++){
            if (mill[i][0] === positionPlayerOne[j] || mill[i][1] === positionPlayerOne[j] || mill[i][2] === positionPlayerOne[j]){
                arr.push(positionPlayerOne[j])
            }
        }
        if (arr.length === 3){
            console.log(arr)
            alert (`Player One You have  mill`)
            return
        } 
    } 
}



// function adjacentValidPositions(position){ 
//     let pos = position.split("-");
//     let x = parseInt(pos[0]);
//     let y = parseInt(pos[1]);

//     let validPositions = []
    

//     for (let i = 0; i < 12; i++){
//         let element = document.getElementById(position)
//         if (element.nodeName === "BUTTON"){
//             function handleEvent(position)
//         }

//     }

//     //x traverse
    
//     //y traverse

//     //diagonal
    
// }

let playerForm = document.createElement('form')
let submitPlayerInfo = document.createElement('input')
body.append(playerForm)

function buildForm(){
    let labelPlayerOne = document.createElement('label')
    let labelPlayerTwo = document.createElement('label')
    
    let inputPlayerOne = document.createElement('input')
    inputPlayerOne.type = "text"
    inputPlayerOne.id = "playerOne"
    labelPlayerOne.for = "player1"
    labelPlayerOne.textContent = "player1".toUpperCase()
    
    let inputPlayerTwo = document.createElement('input')
    inputPlayerTwo.type = "text"
    labelPlayerTwo.for = "player2"
    labelPlayerTwo.textContent = "player2".toUpperCase()
    
    submitPlayerInfo.type = 'submit'
    
    playerForm.append(labelPlayerOne, inputPlayerOne, labelPlayerTwo, inputPlayerTwo, submitPlayerInfo)

    playerForm.addEventListener('submit', (e) => {
        e.preventDefault()
        turn = 1;
        createPlayer(e.target[0].value, e.target[1].value)
    })
    
}


function buildPlayer(game){
    let playerList = document.createElement('ul')
    let player1 = document.createElement('li')
    let player2 = document.createElement('li')
    let currentGameId = document.createElement('li')
    let gameButton = document.createElement('button')

    gameButton.textContent = "X"
    gameButton.style.Color = "red"
    gameButton.id = "game-id"
    player1.textContent = game.player_one.name
    player2.textContent = game.player_two.name
    currentGameId = `Game_id: ${game.id}`

    playerList.append(player1, player2, currentGameId, gameButton)
    body.append(playerList)
    gameButton.addEventListener('click', (e) => deleteGame(game) )
}

    let gameList = document.createElement('ul')

 function buildGames(game){
    let gamePlayed = document.createElement('li')

    gamePlayed.textContent = `game id: ${game.id} player_one: ${game.player_one.name} player_two: ${game.player_two.name}`
    gameList.id = "game-list-id"
    gameList.append(gamePlayed)
    body.append(gameList)

}
