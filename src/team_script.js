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

/* Script */
//console.log("== LOADED PLAYER_SCRIPT!");
search();

document.getElementById("team-search").addEventListener('submit', (e) => {
    search();
    e.preventDefault();
}, false); 