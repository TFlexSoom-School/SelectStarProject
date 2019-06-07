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
    var select = document.querySelectorAll("#team-insert select")[0];
    var formInput = {};
    var val;
    for(var i = 0; i < inputs.length; i ++){
        val = inputs[i].value;
        formInput[inputs[i].getAttribute("name")] = val;
        if(val == "" || val == null || val == "Error!"){
            document.getElementById("team-insert-error").innerText = "Bad Values!";
            return;
        }
    }



   inputObject = {};

   inputObject.name = formInput["team-name"]; 
   inputObject.location = formInput["team-loc"];
   inputObject.color = formInput["team-color"];
   inputObject.coach = formInput["coach-name"];
   inputObject.player = select.value;

   if(inputObject.color[0] == "#"){
       inputObject.color = inputObject.color.substring(1, inputObject.color.length);
   }


    
    /* Send http request */
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            window.location.replace("/teams.html");
        }else if(xhttp.readyState == 4){
            document.getElementById("team-insert-error").innerText = "Error... That team may already exist!";
        }
    }
    xhttp.open("POST", "/create/team", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(inputObject));
}

function updateCoach(id){
    var inputs = document.querySelectorAll("#team-up-coach input");
    var error = document.getElementById("error-instruction");
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
    if(name != null && name != "..." && name != "" && name != "ERROR!"){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                window.location.replace("/teams.html");
            }else if(xhttp.readyState == 4){
                error.innerText = "Server Error. Try Again!";
            }
        }
        xhttp.open("POST", "/update/team-coach", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify({"id": id, "name": name}));
    }else{
        error.innerText = "Try a different Value for name. Then click on another Coach's Name.";
    }
}

function removeTeam(id){
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/delete/team-" + id.toString(), true);
    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200){
            window.location.replace("/teams.html");
        }else if(xhttp.readyState == 4){
            alert("Error!");
        }
    }
    xhttp.send();
}

function populateSelector(){
    function populate(players){
        var selectInput = document.getElementById("free-agent-selector");
        var nodeTemp = {};
        players.forEach((element) => {
            nodeTemp = document.createElement("option");
            nodeTemp.setAttribute("value", element.id);
            nodeTemp.appendChild(document.createTextNode(element.playerDetails));
            selectInput.appendChild(nodeTemp);
        });
    }

    function declineService(){
        var insertFormContainer = document.getElementById("team-insert-container");
        var insertForm = document.getElementById("team-insert");
        insertFormContainer.removeChild(insertForm);
        var heading = document.querySelectorAll(".team-forms h3")[0];
        heading.innerText = "No Free Agent Players. Go add players with Teams to insert teams! Otherwise Refresh Page!";
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "/read/pl-free-agents", true);
    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200){
            var text = xhttp.responseText;
            if(text == null || text == ""){
                declineService();
            }
            var pl = JSON.parse(text);
            if(pl.players.length == 0){
                declineService();
            }else{
                populate(pl.players);
            }
        }else if(xhttp.readyState == 4){
            declineService();
        }
    }
    xhttp.send();

}

/* Script */

search();
populateSelector();

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
