/*
 * Gary Luong
 * Tristan Hilbert
 *
 * 5/19/2019
 *
 * AJAX script for index page of Sports Stats Plus
 * 
 */


/* Function Definitions */


function refresh_mrg(){

    function print_mrg(MRG){
        //console.log(MRG);
        var container = document.getElementById("mrg-container");
        container.querySelectorAll("#mrg-list li span").forEach((element) => {
            var attr = element.getAttribute("fieldname");
            if(MRG[attr]){
                element.innerHTML = MRG[attr];
            }else{
                console.log(attr);
            }
        });
    }

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            print_mrg(JSON.parse(xhttp.responseText));
        }
    }
    xhttp.open("GET", "/read/mrg", true);
    xhttp.send();
}

function search(){
    function appendResults(strHtml){
        var container = document.getElementById("search-results");
        container.innerHTML = strHtml;
        rows = document.querySelectorAll("div.row");
        rows.forEach((element) => {
            element.removeChild(element.querySelectorAll("div.removal")[0]);
        });
    }

    var inputs = document.querySelectorAll("#gt-search input")
    var text = "";
    for(var i = 0; i < inputs.length; i ++){
        if(inputs[i].getAttribute("name") == "searchbar"){
            text = inputs[i].value;
            break;
        }
    }
    if(text != "" && text != "Search..."){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                appendResults(xhttp.responseText);
            }
        }
        xhttp.open("GET", "/read/gt-"+ text, true);
        xhttp.send();
    }else{
        console.log("== Empty Query was attempted");
    }
}

/* Script */
//console.log("== LOADED INDEX_SCRIPT!");
refresh_mrg();

document.getElementById("gt-search").addEventListener('submit', (e) => {
    search();
    e.preventDefault();
}, false); 