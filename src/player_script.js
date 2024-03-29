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

    var inputs = document.querySelectorAll("#pl-insert input");
    var select = document.querySelectorAll("#pl-insert select")[0];
    console.log(inputs);
    var formInput = {};
    var val;
    var name;
    for(var i = 0; i < inputs.length; i ++){
        val = inputs[i].value;
        name = inputs[i].getAttribute("name");
        formInput[name] = val;
        if(name != "player-team" && (val == "" || val == null || val == "Error!")){
            document.getElementById("player-insert-error").innerText = "Bad Values!";
            return;
        }
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
    inputObject.team = select.value;

    if(inputObject.team === ""){
        inputObject.team = null;
    }

    /* Add functionality for Positions */
    inputObject.positions = formInput["player-positions"].split(", ").filter((element) => element != "..." && element != "");
    
    /* Send http request */
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            window.location.replace("/players.html");
        }else if(xhttp.readyState == 4){
            alert("error!");
        }
    }
    xhttp.open("POST", "/create/player", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(inputObject));
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

function populateSelector(){
    function populate(players){
        var selectInput = document.getElementById("player-team-selector");
        var nodeTemp = {};
        players.forEach((element) => {
            nodeTemp = document.createElement("option");
            nodeTemp.setAttribute("value", element.id);
            nodeTemp.appendChild(document.createTextNode(element.teamDetails));
            selectInput.appendChild(nodeTemp);
        });
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/read/teamText", true);
    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200){
            var text = xhttp.responseText;
            if(text != null || text != ""){
                var t= JSON.parse(text);
                if(t.teams.length != 0){
                    populate(t.teams);
                }
            }
        }
    }
    xhttp.send();

}

/* Script */
//console.log("== LOADED PLAYER_SCRIPT!");
search();
populateSelector();

document.getElementById("pl-search").addEventListener('submit', (e) => {
    search();
    e.preventDefault();
}, false); 

document.getElementById("pl-insert").addEventListener('submit', (e) => {
    insertPlayer();
    e.preventDefault();
}, false); 