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
});

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

// function deletePlayer(){
//     fetch(`http://localhost:3000/players/`,{
//         method: 'DELETE'
//     })
//     .then(res => res.json())
//     .then(() => {console.log()
//     })
// }

// let mill = [
//     []
// ]

function handleEvent(buttonId){
    // snd.play();
    let btn =  document.getElementById(`${buttonId}`)
    updateClick(buttonId)
    if (turn === 1){
        if(playerOnePiecesCount > 9){
            if(!btn.style.backgroundColor) {
                alert("You cannot add any more!");     
           } else if (btn.style.backgroundColor == 'green'){
                alert("You cannot choose the other players piece!");     
           } else {
                playerOnePiecesCount--;
                btn.style.backgroundColor = ""
                alert("You have chosen the piece to remove");     
           }
           return;
        }
        btn.style.backgroundColor = "yellow"
        playerOnePiecesCount++
    }
    else{
        if(playerTwoPiecesCount > 9){
            if(!btn.style.backgroundColor) {
                alert("You cannot add any more!");     
            } else if (btn.style.backgroundColor === 'yellow'){
                alert("You cannot choose the other players piece!");     
            } else {
                playerTwoPiecesCount--;
                btn.style.backgroundColor = ""
                alert("You have chosen the piece to remove");     
            }
            return;
         }
        btn.style.backgroundColor = "green"
        playerTwoPiecesCount++;
    }
    
    if(turn === 1) {
        turn = 2;
    } else {
        turn = 1;
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
    // let playerForm = document.createElement('form')
    // let submitPlayerInfo = document.createElement('input')
    // body.append(playerForm)
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



// playerForm.addEventListener('submit', (e) => {
//     e.preventDefault()
//     turn = 1;
//     createPlayer(e.target[0].value, e.target[1].value)
// })

function buildPlayer(game){
    let ul = document.createElement('ul')
    let player1 = document.createElement('li')
    let player2 = document.createElement('li')

    player1.textContent = game.player_one.name
    player2.textContent = game.player_two.name

    ul.append(player1, player2)
    body.append(ul)
}
