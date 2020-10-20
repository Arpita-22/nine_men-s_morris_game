let snd = new Audio("asset/nmm_moves.mp3");
const body = document.querySelector('body')

document.addEventListener("DOMContentLoaded", function(event) {
    createTable(13, 13);

    buildPlayer()

    // createPlayer()
});

function createPlayer(){
    fetch('http://localhost:3000/games', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
    })
    .catch((error) => {
    console.error('Error:', error);
    });
    }


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

function handleEvent(id){
    // snd.play();
    alert(id);
}
  function buildPlayer(){
    let form = document.createElement('form')
    let submit1 = document.createElement('input')
    let submit2 = document.createElement('input')


    let label1 = document.createElement('label')
    let label2 = document.createElement('label')
    let input1 = document.createElement('input')
    let input2 = document.createElement('input')

    input1.type = "text"
    input2.type = "text"
    label1.for = "name"
    label1.textContent = "player1"
    label2.for = "name"
    label2.textContent = "player2"
    submit1.type = 'submit'
    submit2.type = 'submit'

     form.append(label1, input1,submit1, label2, input2, submit2)
     body.append(form)

    form.addEventListener('submit', (e) => {
        e.preventDefault
        console.log(e)

    })
}


