/*
 * Gary Luong
 * Tristan Hilbert
 *
 * 5/3/2019
 *
 * Module representing functionality
 * for all possible create functionality.
 *
 */


module.exports = (db) => {
    var express = require("express");
    var router = express.Router();
    
    /*
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
    */
    
    router.post('/player', function(req, res){
        console.log(req.body);
        var sql = "INSERT INTO ssp_players (fname, lname, jersey, games, points) VALUES (?,?,?,?,?)";
        var inserts = [req.body.fname, req.body.lname, req.body.jersey, req.body.games,req.body.points];
        db.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.status(500).end();
            }else{
                res.status(200).end();
            }
        });
    });

    router.post('/team', function(req, res){
        console.log(req.body);
        var sql = "INSERT INTO ssp_teams (name, location, color, coach) VALUES (?,?,?,?)";
        var inserts = [req.body.name, req.body.location, req.body.color, req.body.coach];
        db.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.status(500).end();
            }else{
                res.status(200).end();
            }
        });

    });





    
    return router;
};