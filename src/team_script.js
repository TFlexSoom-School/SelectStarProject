/*
 * Gary Luong
 * Tristan Hilbert
 *
 * 5/19/2019
 *
 * AJAX script for Teams page of Sports Stats Plus
 * 
 */


/* Function Definitions */


function search(){
    function appendResults(strHtml){
        var container = document.getElementById("search-results");
        container.innerHTML = strHtml;
    }

    var inputs = document.querySelectorAll("#team-search input")
    var text = "";
    for(var i = 0; i < inputs.length; i ++){
        if(inputs[i].getAttribute("name") == "searchbar"){
            text = inputs[i].value;
            break;
        }
    }
    if(text != "" && text != "Search Teams"){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                appendResults(xhttp.responseText);
            }
        }
        xhttp.open("GET", "/read/team-"+ text, true);
        xhttp.send();
    }else{
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                appendResults(xhttp.responseText);
            }
        }
        xhttp.open("GET", "/read/team", true);
        xhttp.send();
    }
}


function insertTeam(){

    var inputs = document.querySelectorAll("#team-insert input")
    var formInput = {};
    for(var i = 0; i < inputs.length; i ++){
        formInput[inputs[i].getAttribute("name")] = inputs[i].value;
    }



   inputObject = {};

   inputObject.name = formInput["team-name"]; 
   inputObject.location = formInput["team-loc"];
   inputObject.color = formInput["team-color"];
   inputObject.coach = formInput["coach-name"];


    
    /* Send http request */
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            window.location.replace("/teams.html");
        }
    }
    xhttp.open("POST", "/create/team", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(inputObject));
}

function updateCoach(id){
    var inputs = document.querySelectorAll("#team-up-coach input");
    var element = inputs[0];
    var name = null;
    for(var i = 0; i < inputs.length; i ++){
        element = inputs[i];
        if(element.getAttribute("name") === "coach-name"){
            name = element.value;
            break;
        }
    }

    console.log(name);
    if(name != null && name != "..." && name != ""){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                window.location.replace("/teams.html");
            }else if(xhttp.readyState == 4){
                element.value = "ERROR!";
            }
        }
        xhttp.open("POST", "/update/team-coach", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify({"id": id, "name": name}));
    }else{
        element.value = "ERROR!";
    }
}

function removeTeam(id){
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/delete/team-" + id.toString(), true);
    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200){
            window.location.replace("/teams.html");
        }
    }
    xhttp.send();
}

/* Script */

search();

document.getElementById("team-search").addEventListener('submit', (e) => {
    search();
    e.preventDefault();
}, false); 

document.getElementById("team-insert").addEventListener('submit', (e) => {
    insertTeam();
    e.preventDefault();
}, false); 

document.getElementById("team-up-coach").addEventListener('submit', (e) =>{
    insertTeam();
    e.preventDefault();
}, false);
