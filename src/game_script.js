/*
 * Gary Luong
 * Tristan Hilbert
 *
 * 5/19/2019
 *
 * AJAX script for games page of Sports Stats Plus
 * 
 */


/* Function Definitions */


function search(){
    function appendResults(strHtml){
        var container = document.getElementById("search-results");
        container.innerHTML = strHtml;
    }

    var inputs = document.querySelectorAll("#ga-search input")
    var text = "";
    for(var i = 0; i < inputs.length; i ++){
        if(inputs[i].getAttribute("name") == "searchbar"){
            text = inputs[i].value;
            break;
        }
    }
    if(text != "" && text != "Search Games"){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                appendResults(xhttp.responseText);
            }
        }
        xhttp.open("GET", "/read/ga-"+ text, true);
        xhttp.send();
    }else{
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                appendResults(xhttp.responseText);
            }
        }
        xhttp.open("GET", "/read/ga", true);
        xhttp.send();
    }
}

function insertGame(){
    var inputs = document.querySelectorAll("#game-insert-form input");
    var object = {};
    const response = document.getElementById("game-insert-response")
    inputs.forEach((element) =>{
        var name = element.getAttribute("name");
        object[name] = element.value;
        if(element.value == "" && element.getAttribute("not-necessary")){
            object[name] = null;
        }
    });

    if(Object.values(object).indexOf("") != -1){
        response.innerText = "Bad Values!";
    }else{
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                window.location.replace("/games.html");
            }else if(xhttp.readyState == 4){
                response.innerText = "ERROR!";
            }
        }
        xhttp.open("POST", "/create/game", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(object));
    }
}

function removeGame(id){
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/delete/game-" + id.toString(), true);
    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200){
            window.location.replace("/games.html");
        }
    }
    xhttp.send();
}

/* Script */
//console.log("== LOADED PLAYER_SCRIPT!");
search();

document.getElementById("ga-search").addEventListener('submit', (e) => {
    search();
    e.preventDefault();
}, false);

document.getElementById("game-insert-form").addEventListener('submit', (e) =>{
    insertGame();
    e.preventDefault();
});