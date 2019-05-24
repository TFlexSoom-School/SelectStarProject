/*
 * Gary Luong
 * Tristan Hilbert
 *
 * 5/19/2019
 *
 * AJAX script for players page of Sports Stats Plus
 * 
 */


/* Function Definitions */

function search(){
    function appendResults(strHtml){
        var container = document.getElementById("search-results");
        container.innerHTML = strHtml;
    }

    var inputs = document.querySelectorAll("#pl-search input")
    var text = "";
    for(var i = 0; i < inputs.length; i ++){
        if(inputs[i].getAttribute("name") == "searchbar"){
            text = inputs[i].value;
            break;
        }
    }
    if(text != "" && text != "Search Player"){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                appendResults(xhttp.responseText);
            }
        }
        xhttp.open("GET", "/read/pl-"+ text, true);
        xhttp.send();
    }else{
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                appendResults(xhttp.responseText);
            }
        }
        xhttp.open("GET", "/read/pl", true);
        xhttp.send();
    }
}

function insertPlayer(){

    var inputs = document.querySelectorAll("#pl-insert input")
    var formInput = {};
    for(var i = 0; i < inputs.length; i ++){
        formInput[inputs[i].getAttribute("name")] = inputs[i].value;
    }

    /* TODO */
    /* Alert User to any required Fields */
    
    /* Format Response Object */
    inputObject = {};
    pName = formInput["player-name"]; /* or .player-name */
    inputObject.fname = pName.substring(0, pName.indexOf(" "));
    inputObject.lname = pName.substring(pName.indexOf(" ") + 1, pName.length);

    inputObject.jersey = formInput["player-jersey"];
    inputObject.games = formInput["player-games"];
    inputObject.points = formInput["player-points"];
    
    /* TODO */
    /* Add functionality for Positions */
    
    /* Send http request */
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            window.location.replace("/players.html");
        }
    }
    xhttp.open("POST", "/create/player", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(inputObject));
}

/* Script */
//console.log("== LOADED PLAYER_SCRIPT!");
search();

document.getElementById("pl-search").addEventListener('submit', (e) => {
    search();
    e.preventDefault();
}, false); 

document.getElementById("pl-insert").addEventListener('submit', (e) => {
    insertPlayer();
    e.preventDefault();
}, false); 