/*
 * Gary Luong
 * Tristan Hilbert
 *
 * 5/26/2019
 *
 * Module representing all Update Functionality
 *
 */


module.exports = (db) => {
    var express = require("express");
    var router = express.Router();

    function deletePos(id, pid, res){
        db.pool.query(
            "DELETE FROM ssp_players_positions " + 
            "WHERE ssp_players_positions.player_id = ? " +
            "AND ssp_players_positions.position_id = ?",
            [id, pid],
            (error, results, fields) => {
                if(error){
                    console.log(error);
                    res.status(500).end();
                }else{
                    res.status(200).end();
                }
            });
    }

    function addPos(id, pid, res){
        db.pool.query(
            "INSERT ssp_players_positions (player_id, position_id) " +
            "VALUES (?,?)",
            [id, pid],
            (error, results, fields) => {
                if(error){
                    console.log(error);
                    res.status(500).end();
                }else{
                    res.status(200).end();
                }
            });
    }

    function updatePos(id, posName, res){
        function branch(pid){
            db.pool.query(
                "SELECT ppos.player_id FROM ssp_players_positions ppos " +
                "WHERE ppos.player_id = ? AND ppos.position_id = ? LIMIT 1",
                [id, pid],
                (error, results, fields) => {
                    if(error){
                        console.log(error);
                        res.status(500).end();
                    }else{
                        if(results.length){
                            deletePos(id, pid, res);
                        }else{
                            addPos(id, pid, res);
                        }
                    }
                });
        }
        db.pool.query(
            "SELECT pos.id FROM ssp_positions pos WHERE pos.name = ?",
            [posName],
            (error, results, fields) => {
                if(error){
                    console.log(error);
                    res.status(500).end();
                }else{
                    if(results.length){
                        var pid = results[0].id;
                        branch(pid);
                    }else{
                        res.status(500).end();
                    }
                }
            });
    }

    router.post("/pos-up", (req, res) => {
        var id = req.body.id;
        var posName = req.body.posName;
        updatePos(id, posName, res);
    });
    
    return router;
};