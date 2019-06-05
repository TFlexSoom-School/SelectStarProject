/*
 * Gary Luong
 * Tristan Hilbert
 *
 * 5/26/2019
 *
 * AJAX script for detail-players page of Sports Stats Plus
 * 
 */


/* Function Definitions */
function updatePosition(id){
    var inputs = document.querySelectorAll("#position-change input");
    var formInput = {};
    formInput.posName = inputs[0].value;
    formInput.id = id;
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            window.location.reload();
        }else if(xhttp.readyState == 4){
            inputs[0].value = "ERROR!";
        }
    }
    xhttp.open("POST", "/update/pos-up", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(formInput));
}

function updateTeam(id){
    var inputs = document.querySelectorAll("#team-change input");
    var formInput = {id: id};
    inputs.forEach((element) => {
        formInput[element.getAttribute("name")] = element.value;
    });

    var response = document.getElementById("pl-det-response");
    if(Object.values(formInput).indexOf("") != -1){
        formInput.None = true;
    }
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            window.location.reload();
        }else if(xhttp.readyState == 4 && xhttp.status == 409){
            response.innerText = "Can Not Have Empty Teams!"
        }else if(xhttp.readyState == 4){
            response.innerText = "ERROR!";
        }
    }
    xhttp.open("POST", "/update/pl-team-up", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(formInput));
}

function removePlayer(id){
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/delete/player-" + id.toString(), true);
    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200){
            window.location.replace("/players.html");
        }else if(xhttp.readyState == 4 && xhttp.status == 409){
            alert("Empty Teams Are Not Allowed! Delete the Team First!");
        }else if(xhttp.readyState == 4){
            alert("ERROR!");
            window.location.replace("/players.html");
        }
    }
    xhttp.send();
}

/* Script */
document.getElementById("position-change").addEventListener('submit', (e) => {
    document.getElementById("position-change-button").click();
    e.preventDefault();
}, false);