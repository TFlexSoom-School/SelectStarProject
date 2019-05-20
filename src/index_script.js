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
        console.log(MRG);
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

/* Script */
console.log("== LOADED INDEX_SCRIPT!");
refresh_mrg();  