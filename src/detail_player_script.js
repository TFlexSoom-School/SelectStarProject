/*
 * Gary Luong
 * Tristan Hilbert
 *
 * 5/26/2019
 *
 * AJAX script for detail-players page of Sports Stats Plus
 * 
 */


/* Function Definitions */
function updatePosition(id){
    var inputs = document.querySelectorAll("#position-change input");
    var formInput = {};
    formInput.posName = inputs[0].value;
    formInput.id = id;
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            window.location.reload();
        }else if(xhttp.readyState == 4){
            inputs[0].value = "ERROR!";
        }
    }
    xhttp.open("POST", "/update/pos-up", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(formInput));
}

/* Script */
document.getElementById("position-change").addEventListener('submit', (e) => {
    document.getElementById("position-change-button").click();
    e.preventDefault();
}, false);