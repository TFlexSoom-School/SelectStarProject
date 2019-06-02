/*
 * Gary Luong
 * Tristan Hilbert
 *
 * 5/19/2019
 *
 * AJAX script for positions
 * 
 */


/* Function Definitions */


function load(){
    function createPos(strHtml){
        var container = document.getElementById("position-list");
        container.innerHTML = strHtml;
        /*console.log(strHtml);*/
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            createPos(xhttp.responseText);
        }
    }
    xhttp.open("GET", "/read/pos", true);
    xhttp.send();
}

function insertPosition(){
    var inputs = document.querySelectorAll("#position-insert input");
    var context = {};
    inputs.forEach((element) => {
        context[element.getAttribute("name")] = element.value;
    });

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/create/pos", true);
    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200){
            window.location.replace("/positions.html");
        }else if(xhttp.readyState == 4 && xhttp.status == 409 && xhttp.responseText == "PositionExists"){
            document.getElementById("insert-response").innerText = "That position exists already"; 
        }else if(xhttp.readyState == 4){
            document.getElementById("insert-response").innerText = "Error!";
        }
    }
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(context));
}

/* Script */
load();