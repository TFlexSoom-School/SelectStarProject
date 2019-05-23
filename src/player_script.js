/*
 * Gary Luong
 * Tristan Hilbert
 *
 * 5/19/2019
 *
 * AJAX script for players page of Sports Stats Plus
 * 
 */


/* Function Definitions */

/*
function search(){
    function appendResults(strHtml){
        var container = document.getElementById("search-results");
        container.innerHTML = strHtml;
    }

    var inputs = document.querySelectorAll("#pl-search input")
    var text = "";
    for(var i = 0; i < inputs.length; i ++){
        if(inputs[i].getAttribute("name") == "searchbar"){
            text = inputs[i].value;
            break;
        }
    }
    if(text != "" && text != "Search Player"){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                appendResults(xhttp.responseText);
            }
        }
        xhttp.open("GET", "/read/pl-"+ text, true);
        xhttp.send();
    }else{
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = () => {
            if(xhttp.readyState == 4 && xhttp.status == 200) {
                appendResults(xhttp.responseText);
            }
        }
        xhttp.open("GET", "/read/pl", true);
        xhttp.send();
    }
}
/* Script */

/*

document.getElementById("pl-search").addEventListener('submit', (e) => {
    search();
    e.preventDefault();
}, false); 

 */

module.exports = function(){
    var express = require('express');
    var router = express.Router();

function getPlayers(res, mysql, context, complete){
    mysql.pool.query("SELECT ssp_players.fname, ssp_players.lname, ssp_players.jersey, ssp_players.games, ssp_players.points FROM ssp_players", function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.players = results;
        complete();
    });
}

router.post('/', function(req, res){
    console.log(req.body.players)
    console.log(req.body)
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO ssp_players (fname, lname, jersey, games, points) VALUES (?,?,?,?,?)";
    var inserts = [req.body.fname, req.body.lname, req.body.jersey, req.body.games,req.body.points];
    sql = mysql.pool.query(sql,inserts,function(error, results, fields){
        if(error){
            console.log(JSON.stringify(error))
            res.write(JSON.stringify(error));
            res.end();
        }else{
            res.redirect('/players');
        }
    });
});




}

