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

/* Script */
load();