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
            let id = r.toString().concat("-" +c.toString());
            if(buttonPositions[id] === true){
                y.innerHTML=`<button onclick= "handleEvent(id)" id=${id} class='button'/>`
            } else {
                //y.innerHTML="R" + r + "C" + c;
                y.innerHTML="<div class='default-position'/>";
            }
        }
    }
}

let snd = new Audio("asset/nmm_moves.mp3");
const body = document.querySelector('body')

let turn = 0;

document.addEventListener("DOMContentLoaded", function(event) {
    createTable(13, 13);
    buildPlayer();
});

function createPlayer(playerOne, playerTwo){
    // console.log(playerOne, playerTwo)
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
    .then(data => {
    console.log('Success:', data)
    ;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function updateClick(){
    fetch()
}


function handleEvent(id){
    // snd.play();
    if(turn === 1) {
        turn = 2;
    } else {
        turn = 1;
    }
    alert(turn);
}

let playerForm = document.createElement('form')
let submitPlayerInfo = document.createElement('input')
body.append(playerForm)

function buildPlayer(){
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
}

playerForm.addEventListener('submit', (e) => {
    e.preventDefault()
    turn = 1;
    // console.log(e.target[1].value)
    createPlayer(e.target[0].value, e.target[1].value)
})

