/*
 * Gary Luong
 * Tristan Hilbert
 *
 * 5/19/2019
 *
 * AJAX script for mascot page of Sports Stats Plus
 * 
 */


/* Function Definitions */


function load(){
    function createPos(strHtml){
        var container = document.getElementById("mascot-list");
        container.innerHTML = strHtml;
        /*console.log(strHtml);*/
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            createPos(xhttp.responseText);
        }
    }
    xhttp.open("GET", "/read/ma", true);
    xhttp.send();
}

function insertMascot(){
    var inputs = document.querySelectorAll("#mascot-insert input");
    var context = {};
    inputs.forEach((element) => {
        context[element.getAttribute("name")] = element.value;
    });

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/create/mascot", true);
    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200){
            window.location.replace("/mascots.html");
        }else if(xhttp.readyState == 4 && xhttp.status == 409 && xhttp.responseText == "TeamExists"){
            document.getElementById("insert-response").innerText = "That team has a mascot already."; 
        }else if(xhttp.readyState == 4){
            document.getElementById("insert-response").innerText = "Error!";
        }
    }
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(context));
}

function removeMascot(id){
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/delete/mascot-" + id.toString(), true);
    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200){
            window.location.replace("/mascots.html");
        }
    }
    xhttp.send();
}

/* Script */
load();

document.getElementById("mascot-insert").addEventListener('submit', (e) => {
    insertMascot();
    e.preventDefault();
}, false); 

/* TODO Remove buttons also need to load all entities */