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
        var sql = "INSERT INTO ssp_players (fname, lname, jersey, games, points) VALUES (?,?,?,?,?)";
        var inserts = [req.body.fname, req.body.lname, req.body.jersey, req.body.games,req.body.points];
        db.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.status(500).end();
            }else{
                
                sql = "INSERT INTO ssp_players_positions (player_id, position_id) " +
                "VALUES ((SELECT p.id FROM ssp_players p WHERE p.fname = ? AND p.lname = ? ORDER BY p.id DESC LIMIT 1), " +
                "(SELECT pos.id FROM ssp_positions pos WHERE pos.name = ?))";
                req.body.positions.forEach((element) => {
                    inserts = [req.body.fname, req.body.lname, element];
                    db.pool.query(sql, inserts, (error, results, fields) => {
                        if(error){
                            console.log(error)
                        }
                        console.log("== Query done!")
                    });
                });
                res.status(200).end();
            }
        });
    });
    
    return router;
};